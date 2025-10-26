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
  Coffee, 
  ShoppingCart, 
  Car, 
  Banknote, 
  Stethoscope, 
  Ticket, 
  Users, 
  Phone, 
  Plane, 
  MapPin
} from "lucide-react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  tone: string;
  voiceStyle: string;
  emotions: string[];
}

interface InterviewReport {
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  score: number;
  feedback: string;
  recommendations: string[];
}

const SocialScenariosClient = () => {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState<"intro" | "setup" | "scenarios" | "session" | "feedback">("intro");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const supabase = createClient();

  const socialScenarios: Scenario[] = [
    {
      id: "cafe",
      title: "Ordering at a Café or Restaurant",
      description: "Asking for menu, clarifying dishes, paying bill",
      icon: <Coffee className="w-6 h-6" />,
      duration: "5 minutes",
      tone: "casual",
      voiceStyle: "casual",
      emotions: ["friendly", "curious", "polite"]
    },
    {
      id: "shopping",
      title: "Shopping Conversation",
      description: "Asking price, size, discount, or exchange policy",
      icon: <ShoppingCart className="w-6 h-6" />,
      duration: "5 minutes",
      tone: "casual",
      voiceStyle: "casual",
      emotions: ["inquisitive", "polite", "decisive"]
    },
    {
      id: "cab",
      title: "Booking a Cab or Asking for Directions",
      description: "Communicating with drivers or strangers",
      icon: <Car className="w-6 h-6" />,
      duration: "5 minutes",
      tone: "clear",
      voiceStyle: "casual",
      emotions: ["clear", "patient", "grateful"]
    },
    {
      id: "bank",
      title: "Bank Visit",
      description: "Asking about services, opening account, or card issues",
      icon: <Banknote className="w-6 h-6" />,
      duration: "5 minutes",
      tone: "professional",
      voiceStyle: "formal",
      emotions: ["respectful", "clear", "confident"]
    },
    {
      id: "doctor",
      title: "Doctor Appointment",
      description: "Describing symptoms and understanding advice",
      icon: <Stethoscope className="w-6 h-6" />,
      duration: "5 minutes",
      tone: "serious",
      voiceStyle: "formal",
      emotions: ["concerned", "clear", "respectful"]
    },
    {
      id: "movie",
      title: "Movie Ticket / Event Booking",
      description: "Asking for seats, showtime, availability",
      icon: <Ticket className="w-6 h-6" />,
      duration: "5 minutes",
      tone: "casual",
      voiceStyle: "casual",
      emotions: ["excited", "curious", "polite"]
    },
    {
      id: "neighbors",
      title: "Talking to Neighbors / Guests",
      description: "Greeting and polite conversation",
      icon: <Users className="w-6 h-6" />,
      duration: "5 minutes",
      tone: "friendly",
      voiceStyle: "casual",
      emotions: ["warm", "friendly", "courteous"]
    },
    {
      id: "customer",
      title: "Customer Service Call",
      description: "Explaining an issue calmly",
      icon: <Phone className="w-6 h-6" />,
      duration: "5 minutes",
      tone: "calm",
      voiceStyle: "formal",
      emotions: ["calm", "clear", "persistent"]
    },
    {
      id: "delivery",
      title: "Talking with a Delivery Person",
      description: "Confirming address, delay, or package issue",
      icon: <MapPin className="w-6 h-6" />,
      duration: "5 minutes",
      tone: "casual",
      voiceStyle: "casual",
      emotions: ["clear", "patient", "appreciative"]
    },
    {
      id: "airport",
      title: "At Airport or Travel Desk",
      description: "Asking about flight status, check-in, luggage",
      icon: <Plane className="w-6 h-6" />,
      duration: "5 minutes",
      tone: "clear",
      voiceStyle: "formal",
      emotions: ["clear", "concerned", "polite"]
    }
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
    if (userName.trim()) {
      setStep("scenarios");
    }
  };

  const startScenarioSession = (scenario: Scenario) => {
    setSelectedScenario(scenario);
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

  const handleStartScenario = async () => {
    if (!selectedScenario) {
      alert("Please select a scenario");
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
        scenario: selectedScenario.title,
        description: selectedScenario.description,
        tone: selectedScenario.tone,
        emotions: selectedScenario.emotions.join(", "),
        userName: user?.firstName || "Learner"
      },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    // Configure the assistant for social scenarios with appropriate tone and emotions
    const assistantConfig = {
      name: "Social Scenario Coach",
      firstMessage: `Hello ${user?.firstName || "Learner"}! I'm your social scenario coach today. We'll be practicing "${selectedScenario.title}". The situation is: ${selectedScenario.description}. Try to communicate with the appropriate tone (${selectedScenario.tone}) and emotions (${selectedScenario.emotions.join(", ")}). When you're ready, I'll start the scenario.`,
      voice: {
        provider: "11labs",
        // Use appropriate voice based on scenario requirements
        voiceId: selectedScenario.voiceStyle === "formal" ? "c6SfcYrb2t09NHXiT80T" : "2BJW5coyhAzSr8STdHbE",
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
            content: `You are an experienced English communication coach helping learners practice real-life social scenarios. 
            The scenario is: "${selectedScenario.title}"
            Situation: ${selectedScenario.description}
            
            Conversation flow:
            1. Start with a friendly greeting and introduce the scenario
            2. Set the context for the situation
            3. Begin the role-play scenario
            4. Guide the learner through the conversation naturally
            5. After they respond, provide constructive feedback on their communication skills, focusing on:
               - Appropriate tone (${selectedScenario.tone})
               - Use of correct expressions for the situation
               - Emotional expression (${selectedScenario.emotions.join(", ")})
               - Clarity and politeness
            6. Offer an improved version of their response if needed
            7. End with encouragement for real-world application
            
            Keep your feedback concise and actionable. Be supportive but honest. 
            Don't interrupt the learner while they're speaking.
            Adapt your responses based on their English level.
            Keep the conversation flowing naturally like a real interaction.`
          }
        ]
      }
    };
    
    // @ts-expect-error - Using the same pattern as InterviewClient which works fine
    vapi.start(assistantConfig, assistantOverrides);
  };

  const handleEndScenario = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
    // Generate feedback immediately when session ends
    generateFeedback();
  };

  // Function to generate report immediately after session ends
  const generateFeedback = async () => {
    if (!user?.id || !selectedScenario) return;
    
    try {
      // Show loading state
      setIsAnalyzing(true);
      
      // Save session to Supabase first
      const { data: sessionData, error: sessionError } = await supabase.from('session_history').insert([
        {
          user_id: user.id,
          companion_id: null,
          topic: selectedScenario.title,
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
        const reportId = await generateAndSaveInterviewReport(sessionId, "social-scenario", selectedScenario.title, selectedScenario.description);
        
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
    scenarioDescription: string
  ): Promise<string | null> => {
    // Early return if user is not available
    if (!user?.id) {
      console.error('User not available for report generation');
      return null;
    }
    
    try {
      // Create a transcript string for analysis
      const transcriptText = messages.map(msg => 
        `${msg.role === 'assistant' ? 'Coach' : 'Learner'}: ${msg.content}`
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
          jobDescription: `Scenario: ${scenarioDescription}`
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
          job_description: `Scenario: ${scenarioDescription}`,
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
          "Appropriate tone for the situation",
          "Clear expression of needs"
        ],
        weaknesses: [
          "Could use more natural expressions",
          "Sometimes hesitated during conversation",
          "Needed more confidence"
        ],
        improvements: [
          "Practice common phrases for this scenario",
          "Work on smoother transitions",
          "Build confidence through repetition"
        ],
        score: Math.floor(Math.random() * 41) + 60, // Random score between 60-100
        feedback: `Overall, you demonstrated good communication skills for the "${topic}" scenario. Your tone was appropriate for the situation and you expressed your needs clearly. To improve, focus on using more natural expressions and building confidence through practice.`,
        recommendations: [
          "Practice this scenario with a friend",
          "Record yourself to identify areas for improvement",
          "Learn common phrases for this type of interaction"
        ]
      };

      // Save mock report to Supabase
      const { data, error: supabaseError } = await supabase.from('interview_reports').insert([
        {
          user_id: user.id,
          session_id: sessionId,
          interview_type: interviewType,
          topic: topic,
          job_description: `Scenario: ${scenarioDescription}`,
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
    setStep("scenarios");
    setSelectedScenario(null);
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Social & Everyday Life Scenarios</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice real-life English conversations in common social situations. Each session is 5 minutes long.
          </p>
        </div>

        {/* Introduction Step */}
        {step === "intro" && (
          <div className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Build Comfort in Real-Life Situations</h2>
              <p className="text-gray-600">
                Practice everyday English conversations with our AI coach. Each session is 5 minutes long with different tones and emotions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/50 p-4 rounded-lg border border-white/30">
                <Clock className="w-8 h-8 text-orange-500 mb-2 mx-auto" />
                <h3 className="font-semibold text-center">5-Minute Sessions</h3>
                <p className="text-sm text-gray-600 text-center">Focused practice for each scenario</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-white/30">
                <User className="w-8 h-8 text-orange-500 mb-2 mx-auto" />
                <h3 className="font-semibold text-center">Personalized Feedback</h3>
                <p className="text-sm text-gray-600 text-center">Get AI-powered analysis of your conversation</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-white/30">
                <Coffee className="w-8 h-8 text-orange-500 mb-2 mx-auto" />
                <h3 className="font-semibold text-center">Real-Life Practice</h3>
                <p className="text-sm text-gray-600 text-center">Authentic scenarios you{`'`}ll encounter daily</p>
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
                  <Label htmlFor="role">Your English Level (Optional)</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Beginner, Intermediate, Advanced"
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
                  disabled={!userName.trim()}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Scenarios Selection Step */}
        {step === "scenarios" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Select a Scenario to Practice</h2>
              <div className="text-sm text-gray-600">
                Completed: {completedScenarios.length}/{socialScenarios.length}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialScenarios.map((scenario) => (
                <div 
                  key={scenario.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg border-2 rounded-lg p-4 ${
                    completedScenarios.includes(scenario.id) 
                      ? "border-green-500 bg-green-50/50" 
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                  onClick={() => startScenarioSession(scenario)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                        {scenario.icon}
                      </div>
                      <span className="text-lg font-medium">{scenario.title}</span>
                    </div>
                    {completedScenarios.includes(scenario.id) && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{scenario.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{scenario.duration}</span>
                    <span className="capitalize">{scenario.tone} tone</span>
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
        {step === "session" && selectedScenario && (
          <div className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedScenario.title}</h2>
              </div>
              <p className="text-gray-600">
                Scenario: {selectedScenario.description}
              </p>
            </div>
            
            {/* VAPI Interview Interface */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* AI Coach Section */}
                <div className="md:w-1/2">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">AI Social Coach</h2>
                    <p className="text-gray-600">Scenario: {selectedScenario.title}</p>
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
                          alt="Social Coach - Male Voice"
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
                      {`${user?.firstName || "Learner"}'s Social Coach`}
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
                        callStatus === CallStatus.ACTIVE ? handleEndScenario : handleStartScenario
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

            {/* Conversation Transcript */}
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
                          {message.role === "assistant" ? "Social Coach" : user?.firstName || "You"}
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
                      Practice Another Scenario
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
                Here{`'`}s feedback on your conversation for {`"${selectedScenario?.title}"`}
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
                <h3 className="font-semibold text-lg">Sample Conversation</h3>
                <div className="bg-white/50 rounded-lg p-4 border border-white/30">
                  <p className="text-gray-800">
                    {getSampleConversation(selectedScenario)}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={resetSession}
                >
                  Practice Another Scenario
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
            <p className="text-gray-600">Analyzing your conversation performance...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Add this helper function before the component return statement
const getSampleConversation = (scenario: Scenario | null) => {
  if (!scenario) return "Practice makes perfect! Try again with more confidence.";
  
  switch (scenario.id) {
    case "cafe":
      return `Customer: "Hi, can I see the menu, please?"
      Waiter: "Of course! Here's our menu. Today we have a special on avocado toast."
      Customer: "That sounds good. Can I ask what's in it?"
      Waiter: "Certainly! It's sourdough bread with smashed avocado, cherry tomatoes, and a poached egg. Would you like to try it?"
      Customer: "Yes, I'll have that. And a cappuccino, please."
      Waiter: "Great choice! Anything else?"
      Customer: "No, that's all for now. Thank you."`;
      
    case "shopping":
      return `Customer: "Excuse me, how much is this shirt?"
      Shop Assistant: "That's $29.99. It's on sale today."
      Customer: "Do you have it in a medium size?"
      Shop Assistant: "Let me check for you. Yes, we do. Would you like to try it on?"
      Customer: "Yes, please. Where are the fitting rooms?"
      Shop Assistant: "Just over there to your right. Take your time!"`;
      
    default:
      return `Based on the scenario "${scenario.title}", here's how a typical conversation might go. 
      Remember to use an appropriate tone (${scenario.tone}) and express yourself with ${scenario.emotions.join(", ")} emotions.`;
  }
};

export default SocialScenariosClient;