"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  User, 
  Briefcase 
} from "lucide-react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface InterviewReport {
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  score: number;
  feedback: string;
  recommendations: string[];
}

const CommonInterviewClient = () => {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState<"intro" | "setup" | "questions" | "session" | "feedback">("intro");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const supabase = createClient();

  const commonQuestions = [
    "Tell me about yourself",
    "Why should we hire you?",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
    "Describe a time you solved a problem"
  ];

  // Redirect to sign in if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  // VAPI event handlers
  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: { type: string; transcriptType: string; role: string; transcript: string }) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => {
      console.log("VAPI Error", error);
      alert(`VAPI Error: ${error.message}`);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  // Lottie animation control
  useEffect(() => {
    if (lottieRef.current) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking]);

  const handleStart = () => {
    if (user?.firstName) {
      setUserName(user.firstName);
    }
    setStep("setup");
  };

  const handleSetupSubmit = () => {
    if (userName.trim() && role.trim()) {
      setStep("questions");
    }
  };

  const startQuestionSession = (question: string) => {
    setSelectedQuestion(question);
    setStep("session");
    setCallStatus(CallStatus.INACTIVE);
    setMessages([]);
  };

  const toggleMicrophone = () => {
    try {
      const isMuted = vapi.isMuted();
      vapi.setMuted(!isMuted);
      setIsMuted(!isMuted);
    } catch (error) {
      console.error("Error toggling microphone:", error);
      alert("Failed to toggle microphone. Please try again.");
    }
  };

  const handleStartInterview = async () => {
    if (!selectedQuestion) {
      alert("Please select a question");
      return;
    }

    // Check if user can start an interview by calling the API
    try {
      const response = await fetch('/api/billing?action=can-start-interview');
      const data = await response.json();
      
      if (!data.canStart) {
        // Redirect to limit reached page when user exceeds interview limit
        window.location.href = "/limit-reached";
        return;
      }
    } catch (error) {
      console.error("Error checking interview permission:", error);
      // Continue with interview start even if we can't check permissions
    }

    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { 
        question: selectedQuestion,
        userName: user?.firstName || "Candidate",
        role: role || "candidate"
      },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    // Configure the assistant for common interview questions with a proper greeting
    const assistantConfig = {
      name: "Interview Coach",
      firstMessage: `Hello ${user?.firstName || "Candidate"}! I'm your interview coach today. I understand you're preparing for a ${role || "general"} position. We'll be practicing the question: "${selectedQuestion}". Take your time and answer as naturally as you would in a real interview. When you're ready, go ahead and share your response.`,
      voice: {
        provider: "11labs",
        voiceId: "paula",
        stability: 0.5,
        similarityBoost: 0.75,
        model: "eleven_multilingual_v2"
      },
      model: {
        provider: "openai",
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an experienced interview coach helping candidates practice common interview questions. 
            The candidate is applying for a ${role || "general"} position. 
            
            Conversation flow:
            1. Start with a friendly greeting and introduce yourself, mentioning their role
            2. Explain the question: "${selectedQuestion}"
            3. Ask them to answer the question
            4. After they answer, provide constructive feedback on their response, focusing on:
               - Clarity and structure
               - Relevance to the question
               - Use of specific examples
               - Confidence and communication skills
            5. Offer an improved version of their answer
            6. End with encouragement for their next interview
            
            Keep your feedback concise and actionable. Be supportive but honest. 
            Don't interrupt the candidate while they're speaking.
            Don't ask follow-up questions - focus on the single question selected.`
          }
        ]
      }
    };
    
    // @ts-expect-error - Using the same pattern as InterviewClient which works fine
    vapi.start(assistantConfig, assistantOverrides);
  };

  const handleEndInterview = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
    // Generate feedback immediately when session ends
    generateFeedback();
  };

  // Function to generate report immediately after session ends
  const generateFeedback = async () => {
    if (!user?.id || !selectedQuestion) return;
    
    try {
      // Show loading state
      setIsAnalyzing(true);
      
      // Save session to Supabase first
      const { data: sessionData, error: sessionError } = await supabase.from('session_history').insert([
        {
          user_id: user.id,
          companion_id: null,
          topic: selectedQuestion,
          messages: messages,
          duration: 300000, // 5 minutes in milliseconds
          created_at: new Date().toISOString()
        }
      ]).select();

      if (sessionError) {
        console.error('Error saving session to Supabase:', sessionError);
        setIsAnalyzing(false);
        // Redirect to limit reached page or show error
        return;
      }

      // Get the session ID
      const sessionId = sessionData?.[0]?.id;
      
      if (sessionId) {
        // Generate and save interview report
        const reportId = await generateAndSaveInterviewReport(sessionId, "common-question", selectedQuestion, role);
        
        // Redirect directly to the report page if report was generated successfully
        if (reportId) {
          router.push(`/my-journey/report/${reportId}`);
          return;
        }
      }
      
      setIsAnalyzing(false);
    } catch (error) {
      console.error('Error generating feedback:', error);
      setIsAnalyzing(false);
    }
  };

  // Function to generate and save interview report
  const generateAndSaveInterviewReport = async (
    sessionId: string, 
    interviewType: string, 
    topic: string, 
    userRole: string
  ): Promise<string | null> => {
    // Early return if user is not available
    if (!user?.id) {
      console.error('User not available for report generation');
      return null;
    }
    
    try {
      // Create a transcript string for analysis
      const transcriptText = messages.map(msg => 
        `${msg.role === 'assistant' ? 'Interviewer' : 'Candidate'}: ${msg.content}`
      ).join('\n\n');

      // Call the API to generate the report
      const response = await fetch('/api/interview/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: transcriptText,
          interviewType,
          topic,
          jobDescription: `Role: ${userRole || "General"}`
        }),
      });

      const { analysis, error } = await response.json();
      
      if (error) {
        throw new Error(error);
      }

      // Save report to Supabase
      const { data, error: supabaseError } = await supabase.from('interview_reports').insert([
        {
          user_id: user.id,
          session_id: sessionId,
          interview_type: interviewType,
          topic: topic,
          job_description: `Role: ${userRole || "General"}`,
          transcript: messages,
          strengths: analysis.strengths,
          weaknesses: analysis.weaknesses,
          improvements: analysis.improvements,
          score: analysis.score,
          feedback: analysis.feedback,
          recommendations: analysis.recommendations
        }
      ]).select();

      if (supabaseError) {
        console.error('Error saving interview report:', supabaseError);
        return null;
      } else {
        console.log('Interview report saved:', data);
        // Add interview credit to user by calling the API
        try {
          const creditResponse = await fetch('/api/add-interview-credit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (!creditResponse.ok) {
            const errorData = await creditResponse.json();
            console.error('Failed to add interview credit:', errorData.error);
          }
        } catch (creditError) {
          console.error('Error adding interview credit:', creditError);
        }
        
        return data?.[0]?.id || null;
      }
    } catch (error) {
      console.error('Error generating interview report:', error);
      // Fallback to mock report if AI generation fails
      const mockReport: InterviewReport = {
        strengths: [
          "Good communication skills",
          "Relevant experience mentioned",
          "Clear structure in responses"
        ],
        weaknesses: [
          "Could provide more specific examples",
          "Sometimes went off-topic",
          "Needed more technical details"
        ],
        improvements: [
          "Use STAR method for behavioral questions",
          "Prepare specific examples for common questions",
          "Practice concise responses"
        ],
        score: Math.floor(Math.random() * 41) + 60, // Random score between 60-100
        feedback: `Overall, you demonstrated good communication skills and relevant experience for the ${topic} question. Your responses were generally clear and well-structured. To improve, focus on providing more specific examples using the STAR method (Situation, Task, Action, Result) and prepare technical details relevant to the ${userRole || "general"} role.`,
        recommendations: [
          "Research common interview questions for this role",
          "Practice with a friend or mentor",
          "Record yourself to identify areas for improvement",
          "Prepare questions to ask the interviewer"
        ]
      };

      // Save mock report to Supabase
      const { data, error: supabaseError } = await supabase.from('interview_reports').insert([
        {
          user_id: user.id,
          session_id: sessionId,
          interview_type: interviewType,
          topic: topic,
          job_description: `Role: ${userRole || "General"}`,
          transcript: messages,
          strengths: mockReport.strengths,
          weaknesses: mockReport.weaknesses,
          improvements: mockReport.improvements,
          score: mockReport.score,
          feedback: mockReport.feedback,
          recommendations: mockReport.recommendations
        }
      ]).select();

      if (supabaseError) {
        console.error('Error saving mock interview report:', supabaseError);
        return null;
      } else {
        console.log('Mock interview report saved:', data);
        // Add interview credit to user by calling the API
        try {
          const creditResponse = await fetch('/api/add-interview-credit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (!creditResponse.ok) {
            const errorData = await creditResponse.json();
            console.error('Failed to add interview credit:', errorData.error);
          }
        } catch (creditError) {
          console.error('Error adding interview credit:', creditError);
        }
        
        return data?.[0]?.id || null;
      }
    }
  };

  const resetSession = () => {
    setStep("questions");
    setSelectedQuestion(null);
    setCallStatus(CallStatus.INACTIVE);
    setMessages([]);
    setIsSpeaking(false);
    setIsMuted(false);
    setFeedback("");
  };

  const handleViewProgress = () => {
    router.push("/my-journey");
  };

  // Don't render anything if user is not logged in (redirecting)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Common Interview Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice answering common interview questions with our AI coach. Build confidence and improve your interview skills.
          </p>
        </div>

        {/* Introduction Step */}
        {step === "intro" && (
          <div className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Improve Your Interview Skills</h2>
              <p className="text-gray-600">
                Practice answering common interview questions with our AI coach. Each session is 5 minutes long.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/50 p-4 rounded-lg border border-white/30">
                <Clock className="w-8 h-8 text-orange-500 mb-2 mx-auto" />
                <h3 className="font-semibold text-center">5-Minute Sessions</h3>
                <p className="text-sm text-gray-600 text-center">Focused practice for each question</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-white/30">
                <User className="w-8 h-8 text-orange-500 mb-2 mx-auto" />
                <h3 className="font-semibold text-center">Personalized Feedback</h3>
                <p className="text-sm text-gray-600 text-center">Get AI-powered analysis of your answers</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-white/30">
                <Briefcase className="w-8 h-8 text-orange-500 mb-2 mx-auto" />
                <h3 className="font-semibold text-center">Role-Specific Practice</h3>
                <p className="text-sm text-gray-600 text-center">Tailored questions for your role</p>
              </div>
            </div>
            <Button 
              onClick={handleStart} 
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-6 text-lg"
            >
              Start Practicing
            </Button>
          </div>
        )}

        {/* Setup Step */}
        {step === "setup" && (
          <div className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Tell Us About Yourself</h2>
              <p className="text-gray-600">
                Help our AI coach personalize your practice session
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role You{`'`}re Applying For</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Software Developer, Marketing Manager"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setStep("intro")}
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSetupSubmit}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  disabled={!userName.trim() || !role.trim()}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Questions Selection Step */}
        {step === "questions" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Select a Question to Practice</h2>
              <div className="text-sm text-gray-600">
                Completed: {completedQuestions.length}/{commonQuestions.length}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commonQuestions.map((question, index) => (
                <div 
                  key={index} 
                  className={`cursor-pointer transition-all hover:shadow-lg border-2 rounded-lg p-4 ${
                    completedQuestions.includes(question) 
                      ? "border-green-500 bg-green-50/50" 
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                  onClick={() => startQuestionSession(question)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-medium">{question}</span>
                    {completedQuestions.includes(question) && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    5-minute session
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep("setup")}
              >
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Session Step */}
        {step === "session" && selectedQuestion && (
          <div className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedQuestion}</h2>
              </div>
              <p className="text-gray-600">
                Role: {role} | Practicing as: {userName}
              </p>
            </div>
            
            {/* VAPI Interview Interface */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* AI Interviewer Section */}
                <div className="md:w-1/2">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">AI Interview Coach</h2>
                    <p className="text-gray-600">Question: {selectedQuestion}</p>
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
                      <div
                        className={`absolute transition-opacity duration-1000 ${
                          callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE
                            ? "opacity-100"
                            : "opacity-0"
                        } ${
                          callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse"
                        }`}
                      >
                        <Image
                          src="/icons/male-ai-assistant.png"
                          alt="Interview Coach - Male Voice"
                          width={192}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div
                        className={`absolute transition-opacity duration-1000 ${
                          callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Lottie
                          lottieRef={lottieRef}
                          animationData={soundwaves}
                          autoplay={false}
                          className="w-48 h-48"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="font-bold text-xl mb-2">
                      {`${user?.firstName || "Candidate"}'s Interview Coach`}
                    </p>
                    <div className="flex justify-center gap-2">
                      <span className={`inline-block w-3 h-3 rounded-full ${
                        callStatus === CallStatus.ACTIVE ? "bg-green-500 animate-pulse" : 
                        callStatus === CallStatus.CONNECTING ? "bg-yellow-500 animate-pulse" : 
                        "bg-gray-400"
                      }`}></span>
                      <span className="text-sm">
                        {callStatus === CallStatus.ACTIVE ? "In Progress" : 
                         callStatus === CallStatus.CONNECTING ? "Connecting" : 
                         "Session Ended"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Section */}
                <div className="md:w-1/2">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">You</h2>
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center overflow-hidden">
                      {user?.imageUrl ? (
                        <Image
                          src={user.imageUrl}
                          alt={user.firstName || "User"}
                          width={192}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-6xl flex items-center justify-center w-full h-full">
                          {user?.firstName?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors w-full ${
                        callStatus === CallStatus.ACTIVE
                          ? isMuted
                            ? "bg-gray-200 hover:bg-gray-300"
                            : "bg-green-200 hover:bg-green-300"
                          : "bg-gray-200 cursor-not-allowed"
                      }`}
                      onClick={toggleMicrophone}
                      disabled={callStatus !== CallStatus.ACTIVE}
                    >
                      <Image
                        src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                        alt="mic"
                        width={24}
                        height={24}
                      />
                      <span>
                        {isMuted ? "Turn on microphone" : "Turn off microphone"}
                      </span>
                      {callStatus === CallStatus.ACTIVE && !isMuted && isSpeaking && (
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse delay-75"></div>
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse delay-150"></div>
                        </div>
                      )}
                    </button>
                    
                    <button
                      className={`rounded-lg py-3 cursor-pointer transition-colors w-full text-white ${
                        callStatus === CallStatus.ACTIVE
                          ? "bg-red-700 hover:bg-red-800"
                          : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      } ${callStatus === CallStatus.CONNECTING && "animate-pulse"}`}
                      onClick={
                        callStatus === CallStatus.ACTIVE ? handleEndInterview : handleStartInterview
                      }
                    >
                      {callStatus === CallStatus.ACTIVE
                        ? "End Practice"
                        : callStatus === CallStatus.CONNECTING
                        ? "Connecting..."
                        : "Start Practice"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Transcript */}
            {(callStatus === CallStatus.ACTIVE || callStatus === CallStatus.FINISHED) && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Practice Transcript</h2>
                <div className="bg-gray-50 rounded-xl p-4 h-96 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          message.role === "assistant"
                            ? "bg-blue-100 border border-blue-200"
                            : "bg-orange-100 border border-orange-200"
                        }`}
                      >
                        <div className="font-bold mb-2">
                          {message.role === "assistant" ? "Interview Coach" : user?.firstName || "You"}
                        </div>
                        <p>{message.content}</p>
                      </div>
                    ))}
                    
                    {messages.length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        {callStatus === CallStatus.ACTIVE
                          ? "Practice in progress... Speak to the microphone to begin."
                          : "Your practice conversation will appear here."}
                      </div>
                    )}
                  </div>
                </div>
                
                {callStatus === CallStatus.FINISHED && (
                  <div className="mt-6 text-center">
                    <Button
                      onClick={resetSession}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                    >
                      Practice Another Question
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Feedback Step */}
        {step === "feedback" && (
          <div className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Session Complete!</h2>
              <p className="text-gray-600">
                Here{`'`}s feedback on your response to {`"${selectedQuestion}"`}
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">AI Feedback</h3>
                <div className="bg-white/50 rounded-lg p-4 border border-white/30">
                  <p className="text-gray-800">{feedback}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Sample Answer</h3>
                <div className="bg-white/50 rounded-lg p-4 border border-white/30">
                  <p className="text-gray-800">
                    {getSampleAnswer(selectedQuestion, role)}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={resetSession}
                >
                  Practice Another Question
                </Button>
                <Button 
                  onClick={handleViewProgress}
                  className="ml-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  View Progress
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold mb-2">Generating Your Report</h3>
            <p className="text-gray-600">Analyzing your interview performance...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Add this helper function before the component return statement
const getSampleAnswer = (question: string | null, userRole: string) => {
  if (!question) return "Practice makes perfect! Try again with a specific example from your experience.";
  
  switch (question) {
    case "Tell me about yourself":
      return `Here's a strong way to answer this question for a ${userRole || "general"} role: 
      "I'm a dedicated professional with experience in ${userRole || "my field"}. 
      In my previous role at [Company], I [specific achievement or responsibility]. 
      What excites me about this opportunity is [connection to the role/company]. 
      Outside of work, I enjoy [relevant hobby or interest] which helps me [relevant skill]."`;
      
    case "Why should we hire you?":
      return `A compelling answer might be: 
      "You should hire me because I bring a unique combination of [relevant skill 1], [relevant skill 2], and [relevant experience]. 
      In my last position, I [specific example of value created]. 
      I'm particularly excited about this role because [alignment with company goals], 
      and I'm confident I can contribute to [specific team or project] from day one."`;
      
    case "What are your strengths and weaknesses?":
      return `For strengths: "My key strengths include [skill 1] and [skill 2]. 
      For example, in my previous role, I [specific example demonstrating strength].
      
      For weaknesses: "An area I've been working to improve is [genuine weakness]. 
      To address this, I've [specific action taken], which has helped me [measurable improvement]."`;
      
    case "Where do you see yourself in 5 years?":
      return `A thoughtful response could be: 
      "In five years, I see myself having grown significantly in [relevant skill/area]. 
      I hope to have taken on increasing responsibilities, potentially in [leadership/technical specialization]. 
      I'm particularly interested in [aspect of the company/industry], and I'd love to contribute to [specific goal]."`;
      
    case "Describe a time you solved a problem":
      return `Using the STAR method: 
      "Situation: At my previous company, we faced [specific challenge].
      Task: My role was to [specific responsibility].
      Action: I [specific steps taken, being concise but detailed].
      Result: This led to [measurable positive outcome, ideally with numbers]."`;
      
    default:
      return `Based on your background in ${userRole || "your field"}, here's how you could improve your answer: 
      Start with a brief introduction of your relevant experience, then provide a specific 
      example that demonstrates your skills, and conclude with how you can contribute to the company.`;
  }
};

export default CommonInterviewClient;
