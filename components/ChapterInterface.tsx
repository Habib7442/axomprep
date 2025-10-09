"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { TopicExplanation } from "@/components/TopicExplanation";
import { PracticeQuestions } from "@/components/PracticeQuestions";
import { AIFlashcards } from "@/components/AIFlashcards";
import { MockTest } from "@/components/MockTest";
import { saveChapterScore, updateStudentProgress } from "@/lib/actions/chapter.actions";
import { stripMarkdown } from "@/utils/markdown-stripper";
import { vapi } from "@/lib/vapi.sdk";
import { configureAssistant } from "@/lib/utils";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import Image from "next/image";
import { CreateAssistantDTO, AssistantOverrides } from "@vapi-ai/web/dist/api";

// Add these type definitions
enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface TranscriptMessage {
  type: "transcript";
  role: "user" | "system" | "assistant";
  transcriptType: "partial" | "final";
  transcript: string;
}

interface FunctionCallMessage {
  type: "function-call";
  functionCall: {
    name: string;
    parameters: unknown;
  };
}

interface FunctionCallResultMessage {
  type: "function-call-result";
  functionCallResult: {
    forwardToClientEnabled?: boolean;
    result: unknown;
    [a: string]: unknown;
  };
}

type Message = TranscriptMessage | FunctionCallMessage | FunctionCallResultMessage;

interface Topic {
  id: string;
  title: string;
  description: string;
  mastery: number;
  lastPracticed: string;
  weightage: string;
}

interface WeakestTopic {
  id: string;
  title: string;
  description: string;
  mastery: number;
}

interface ChapterData {
  id: string;
  title: string;
  subject: string;
  class: string;
  objective: string;
  topics: Topic[];
  weakestTopics: WeakestTopic[];
  masteryPercentage: number;
  totalTime: number;
}

interface ChapterInterfaceProps {
  chapterData: ChapterData;
  userId: string;
}

export const ChapterInterface = ({ chapterData, userId }: ChapterInterfaceProps) => {
  const [activeTab, setActiveTab] = useState<"topics" | "mock" | "flashcards">("topics");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [loadingTopics, setLoadingTopics] = useState<Record<string, boolean>>({});
  // VAPI states
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Get color based on subject
  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      science: "#E5D0FF",
      maths: "#FFDA6E",
      english: "#BDE7FF",
      hindi: "#FFC8E4",
      socialscience: "#FFECC8",
      sanskrit: "#C8FFDF",
    };
    return colors[subject.toLowerCase()] || "#E5D0FF";
  };

  // VAPI effects
  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log("Error", error);

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

  useEffect(() => {
    // Clean up loading states when component unmounts
    return () => {
      setLoadingTopics({});
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const toggleTopic = (topicId: string) => {
    // If we're expanding a topic that hasn't been loaded yet, mark it as loading
    if (expandedTopic !== topicId) {
      // In a real implementation, you might want to check if the content has already been loaded
      // For now, we'll show loading for all expansions
      setLoadingTopics(prev => ({ ...prev, [topicId]: true }));
      // Set a timeout to simulate loading, in a real app this would be when the content is actually loaded
      setTimeout(() => {
        setLoadingTopics(prev => ({ ...prev, [topicId]: false }));
      }, 500);
    }
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  const handleCall = async (topic: string) => {
    setCurrentTopic(topic);
    setCallStatus(CallStatus.CONNECTING);
    setMessages([]);

    // Create properly typed assistant overrides
    const assistantOverrides = {
      variableValues: { 
        subject: chapterData.subject, 
        topic: topic === "Chapter Overview" 
          ? `${chapterData.title} - Chapter Overview` 
          : `${chapterData.title} - ${topic}`,
        style: "casual" 
      },
      clientMessages: "transcript" as const,
      serverMessages: undefined,
    };

    vapi.start(configureAssistant("female", "casual"), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const handleSubtopicVoiceTutor = async (subtopic: string) => {
    setCurrentTopic(subtopic);
    setCallStatus(CallStatus.CONNECTING);
    setMessages([]);

    // Create properly typed assistant overrides for subtopic tutoring
    const assistantOverrides = {
      variableValues: { 
        subject: chapterData.subject, 
        topic: `${chapterData.title} - ${subtopic}`,
        style: "casual"
      },
      clientMessages: "transcript" as const,
      serverMessages: undefined,
    };

    vapi.start(configureAssistant("female", "casual"), assistantOverrides);
  };

  return (
    <div className="chapter-interface">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button className="text-blue-600 hover:text-blue-800 mb-2">
            ← Back to Subjects
          </button>
          <div className="flex items-center gap-2">
            <span className="bg-gray-200 px-2 py-1 rounded text-sm">
              Class {chapterData.class}
            </span>
            <span 
              className="px-2 py-1 rounded text-sm text-white"
              style={{ backgroundColor: getSubjectColor(chapterData.subject) }}
            >
              {chapterData.subject}
            </span>
          </div>
          <h1 className="text-3xl font-bold mt-2">{chapterData.title}</h1>
        </div>
        <div className="text-center">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 36 36" className="w-20 h-20">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="3"
                strokeDasharray={`${chapterData.masteryPercentage}, 100`}
              />
              <text x="18" y="20.5" textAnchor="middle" fill="#4CAF50" fontSize="8" fontWeight="bold">
                {chapterData.masteryPercentage}%
              </text>
            </svg>
          </div>
          <p className="text-sm mt-1">Chapter Mastery</p>
        </div>
      </div>

      {/* Hero Area */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <p className="text-lg mb-4">{chapterData.objective}</p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          onClick={() => handleCall("Chapter Overview")}
        >
          Practice Chapter with Voice Tutor
        </Button>
      </div>

      {/* VAPI Voice Tutor Section - Only show when active */}
      {(callStatus === CallStatus.ACTIVE || callStatus === CallStatus.CONNECTING || callStatus === CallStatus.FINISHED) && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {currentTopic ? `Voice Tutor: ${chapterData.title} - ${currentTopic}` : `Voice Tutor: ${chapterData.title}`}
            </h2>
            <button 
              onClick={handleDisconnect}
              className="text-red-500 hover:text-red-700"
            >
              Close
            </button>
          </div>
          
          <div className="flex gap-8 mb-6">
            <div className="companion-section">
              <div
                className="companion-avatar relative w-32 h-32 rounded-full flex items-center justify-center"
                style={{ backgroundColor: getSubjectColor(chapterData.subject) }}
              >
                <div
                  className={`absolute transition-opacity duration-1000 ${
                    callStatus === CallStatus.FINISHED ? "opacity-100" : "opacity-0"
                  } ${
                    callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse"
                  }`}
                >
                  <Image
                    src={`/icons/${chapterData.subject}.svg`}
                    alt={chapterData.subject}
                    width={80}
                    height={80}
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
                    className="w-32 h-32"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex gap-4 mb-4">
                <button
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                  onClick={toggleMicrophone}
                  disabled={callStatus !== CallStatus.ACTIVE}
                >
                  <Image
                    src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                    alt="mic"
                    width={24}
                    height={24}
                  />
                  <span>{isMuted ? "Unmute" : "Mute"}</span>
                </button>
                <button
                  className={`rounded-lg py-2 px-4 cursor-pointer transition-colors text-white ${
                    callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary"
                  } ${callStatus === CallStatus.CONNECTING && "animate-pulse"}`}
                  onClick={handleDisconnect}
                >
                  {callStatus === CallStatus.ACTIVE
                    ? "End Session"
                    : callStatus === CallStatus.CONNECTING
                    ? "Connecting..."
                    : "Start Session"}
                </button>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4 h-32 overflow-y-auto">
                {callStatus === CallStatus.CONNECTING && (
                  <p>Connecting to voice tutor for {currentTopic ? `${currentTopic}` : "chapter overview"}...</p>
                )}
                {callStatus === CallStatus.ACTIVE && (
                  <p>Session active. Speak to interact with your tutor about {currentTopic ? `${currentTopic}` : "this chapter"}.</p>
                )}
                {callStatus === CallStatus.FINISHED && (
                  <p>Session ended. Click &quot;Start Session&quot; to begin a new session.</p>
                )}
              </div>
            </div>
          </div>

          {/* Transcript */}
          <div className="bg-gray-50 rounded-lg p-4 h-40 overflow-y-auto">
            <h3 className="font-bold mb-2">Conversation Transcript</h3>
            <div className="space-y-2">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded ${
                    message.role === "assistant" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <strong>{message.role === "assistant" ? "Tutor" : "You"}:</strong> {message.content}
                </div>
              ))}
              {messages.length === 0 && (
                <p className="text-gray-500">Conversation will appear here...</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chapter Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Key Topics</h3>
          <ul className="space-y-2">
            {chapterData.topics.slice(0, 3).map((topic) => (
              <li key={topic.id} className="py-2 border-b border-gray-100 last:border-0">
                <span className="font-medium">{topic.title}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Chapter Mastery</h3>
          <div className="flex items-center justify-center h-24">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-16 h-16">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4CAF50"
                  strokeWidth="3"
                  strokeDasharray={`${chapterData.masteryPercentage}, 100`}
                />
                <text x="18" y="20.5" textAnchor="middle" fill="#4CAF50" fontSize="8" fontWeight="bold">
                  {chapterData.masteryPercentage}%
                </text>
              </svg>
            </div>
          </div>
          <p className="text-center text-sm mt-2">
            Last practiced: {chapterData.topics[0]?.lastPracticed || "Never"}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Weakest Topics</h3>
          <ul className="space-y-2">
            {chapterData.weakestTopics.slice(0, 3).map((topic) => (
              <li key={topic.id} className="py-2 border-b border-gray-100 last:border-0">
                <div className="flex justify-between">
                  <span className="font-medium">{topic.title}</span>
                  <span className="text-red-600">{topic.mastery}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === "topics" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("topics")}
        >
          Topics
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === "mock" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("mock")}
        >
          Mock Tests
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === "flashcards" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("flashcards")}
        >
          Flashcards
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "topics" && (
        <div className="bg-white rounded-lg shadow">
          {chapterData.topics.map((topic) => (
            <div 
              key={topic.id} 
              className="border-b last:border-b-0"
            >
              <div 
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleTopic(topic.id)}
              >
                <div>
                  <h3 className="font-medium">{topic.title}</h3>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  {/* Mastery and expansion controls only */}
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${topic.mastery}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{topic.mastery}%</span>
                  <button className="text-gray-500">
                    {loadingTopics[topic.id] ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                    ) : expandedTopic === topic.id ? (
                      "▲"
                    ) : (
                      "▼"
                    )}
                  </button>
                </div>
              </div>

              {loadingTopics[topic.id] || expandedTopic === topic.id ? (
                <div className="px-4 pb-4">
                  {loadingTopics[topic.id] ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <TopicExplanation 
                          subject={chapterData.subject} 
                          chapter={chapterData.title} 
                          topic={topic.title} 
                          loading={loadingTopics[topic.id]} // Pass loading state
                        />
                      </div>
                      <div className="mb-4">
                        <PracticeQuestions 
                          subject={chapterData.subject} 
                          chapter={chapterData.title} 
                          userId={userId}
                          subtopic={topic.title} // Pass the subtopic
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : null}

            </div>
          ))}
        </div>
      )}

      {activeTab === "mock" && (
        <div className="mb-8">
          <MockTest 
            chapterId={chapterData.id}
            chapterName={chapterData.title}
            subject={chapterData.subject} 
          />
        </div>
      )}

      {activeTab === "flashcards" && (
        <div className="mb-8">
          <AIFlashcards 
            subject={chapterData.subject} 
            chapter={chapterData.title} 
            chapterId={chapterData.id}
          />
        </div>
      )}
    </div>
  );
};