"use client";

import React, { useState, useEffect, useRef } from "react";
import { stories } from "@/lib/utils/stories";
import { vapi } from "@/lib/vapi.sdk";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Square, 
  Volume2,
  BookOpen,
  Brain,
  MessageCircle,
  Loader,
  ArrowLeft,
  FileText,
  AlertCircle,
  Clock
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@/lib/supabase/client";

const StoryDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  // Unwrap the params promise
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const router = useRouter();
  const { user } = useUser();
  const supabase = createClient();
  
  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setResolvedParams(unwrappedParams);
    };
    
    unwrapParams();
  }, [params]);
  
  // Use the resolved params
  const storyId = resolvedParams ? parseInt(resolvedParams.id) : null;
  const story = storyId ? stories.find(s => s.id === storyId) : null;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentSection, setCurrentSection] = useState<"story" | "vocabulary" | "questions">("story");
  const [completedSections, setCompletedSections] = useState<Record<number, string[]>>({});
  const [vocabularyAnswers, setVocabularyAnswers] = useState<Record<number, string>>({});
  const [phraseAnswers, setPhraseAnswers] = useState<Record<number, string>>({});
  const [questionAnswers, setQuestionAnswers] = useState<Record<number, string>>({});
  const [showVocabularyAnswers, setShowVocabularyAnswers] = useState(false);
  const [showPhraseAnswers, setShowPhraseAnswers] = useState(false);
  const [showQuestionAnswers, setShowQuestionAnswers] = useState(false);
  const [transcript, setTranscript] = useState<Array<{ role: string; content: string }>>([]);
  const [canStartStory, setCanStartStory] = useState<boolean | null>(null);
  const [usageChecked, setUsageChecked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(420); // 7 minutes in seconds
  const [storyCompleted, setStoryCompleted] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  // Add a flag to prevent duplicate report generation
  const reportGeneratedRef = useRef(false);

  // Check if user can start a story
  useEffect(() => {
    const checkUsage = async () => {
      if (!user) return;
      
      // Temporarily bypass usage checking for testing
      setCanStartStory(true);
      setUsageChecked(true);
      
      /* Original code for usage checking:
      try {
        const response = await fetch('/api/billing?action=can-start-story');
        const data = await response.json();
        setCanStartStory(data.canStartStory);
      } catch (error) {
        console.error('Error checking story usage:', error);
        setCanStartStory(true); // Allow if there's an error
      } finally {
        setUsageChecked(true);
      }
      */
    };

    if (user) {
      checkUsage();
    }
  }, [user]);

  // Timer effect
  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up, stop the story
            console.log('Timer expired, stopping story');
            handleStopStory();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, timeRemaining]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Redirect to stories page if story not found
    if (resolvedParams && !story) {
      router.push("/stories");
    }
    
    // Cleanup VAPI and timer when component unmounts
    return () => {
      if (vapi) {
        vapi.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [story, router, resolvedParams]);

  const handlePlayStory = () => {
    if (!story) return;

    if (isPlaying) {
      // Instead of pausing, we'll stop the story
      console.log('Stopping story from handlePlayStory');
      handleStopStory();
    } else {
      // Temporarily bypass usage checking for testing
      console.log('Bypassing usage checking for testing');
      
      setIsConnecting(true);
      setIsPlaying(true);
      setTranscript([]); // Reset transcript when starting a new session
      setTimeRemaining(420); // Reset timer to 7 minutes
      setStoryCompleted(false);
      // Reset the report generated flag when starting a new story
      reportGeneratedRef.current = false;
      startTimeRef.current = Date.now();
      
      /* Original code with usage checking:
      // Check if user can start a story
      if (canStartStory === false) {
        alert("You've reached your monthly story limit. Please upgrade your plan to continue.");
        return;
      }
      */
      
      // Configure VAPI for storytelling with a female voice
      const assistantConfig = {
        name: "Storyteller",
        firstMessage: `Hello! I'm your storyteller. Today I'll be reading you "${story.title}". This is a 7-minute story that will help improve your listening skills. Let's begin!\n\n${story.content}\n\nNow let me share the moral of this story: ${story.moral}\n\nThat's the end of the story. I hope you enjoyed it! Now let's move on to the vocabulary and comprehension questions.`,
        voice: {
          provider: "11labs",
          voiceId: "paula", // Female voice
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
              content: `You are a kind, gentle storyteller with a female voice. Your job is to read stories to help people improve their English listening skills. 
              Speak clearly and at a moderate pace. Make the story engaging but educational. 
              After reading the story, explain the vocabulary and phrases from the story. 
              Then ask comprehension questions one by one and wait for answers.
              End the story session with a clear message: "That's the end of the story. I hope you enjoyed it! Now let's move on to the vocabulary and comprehension questions."
              Be encouraging and supportive throughout the session. Keep the entire session within 6 minutes and 30 seconds to allow time for user interaction.`
            }
          ]
        }
      };
      
      // Set up event listeners for connection status
      const onCallStart = () => {
        setIsConnecting(false);
      };
      
      const onCallEnd = () => {
        console.log('VAPI call ended');
        setIsPlaying(false);
        setStoryCompleted(true);
      };
      
      // Set up event listener for messages to capture transcript
      const onMessage = (message: { type: string; transcriptType: string; role: string; transcript: string }) => {
        // Debug: Log all messages to see what's being received
        console.log('VAPI Message received:', message);
        
        // Handle transcript messages similar to interview section
        if (message.type === "transcript" && message.transcriptType === "final") {
          const newMessage = { role: message.role, content: message.transcript };
          console.log('Adding transcript message:', newMessage);
          setTranscript(prev => [...prev, newMessage]);
        }
      };
      
      vapi.on("call-start", onCallStart);
      vapi.on("call-end", onCallEnd);
      vapi.on("message", onMessage);
      
      const assistantOverrides = {
        clientMessages: ["transcript"],
        serverMessages: [],
      };
      
      // @ts-expect-error - Using the same pattern as other VAPI implementations
      vapi.start(assistantConfig, assistantOverrides);
      
      // Clean up event listeners
      return () => {
        vapi.off("call-start", onCallStart);
        vapi.off("call-end", onCallEnd);
        vapi.off("message", onMessage);
      };
    }
  };

  const handleStopStory = () => {
    // Prevent duplicate report generation
    if (reportGeneratedRef.current) {
      console.log('Report already generated, skipping duplicate generation');
      return;
    }
    
    // Also check if story is already completed
    if (storyCompleted) {
      console.log('Story already completed, skipping duplicate generation');
      return;
    }
    
    // Clear the timer to prevent any further calls
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Set the flag to prevent duplicate calls
    reportGeneratedRef.current = true;
    setStoryCompleted(true);
    
    vapi.stop();
    setIsPlaying(false);
    setIsConnecting(false);
    
    // Don't generate report - just show a simple message
    alert('Story completed!');
    
    // Redirect to stories page
    router.push('/stories');
  };

  const markSectionAsCompleted = (storyId: number, section: string) => {
    setCompletedSections(prev => ({
      ...prev,
      [storyId]: [...(prev[storyId] || []), section]
    }));
  };

  const handleVocabularyAnswerChange = (index: number, value: string) => {
    setVocabularyAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const handlePhraseAnswerChange = (index: number, value: string) => {
    setPhraseAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const handleQuestionAnswerChange = (index: number, value: string) => {
    setQuestionAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const checkVocabularyAnswers = () => {
    setShowVocabularyAnswers(true);
    markSectionAsCompleted(storyId || 0, "vocabulary");
  };

  const checkPhraseAnswers = () => {
    setShowPhraseAnswers(true);
    markSectionAsCompleted(storyId || 0, "phrases");
  };

  const checkQuestionAnswers = () => {
    setShowQuestionAnswers(true);
    markSectionAsCompleted(storyId || 0, "questions");
  };

  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg">Loading story...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Story not found</h1>
            <Link href="/stories" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              ← Back to Stories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show usage limit message if user cannot start a story
  if (usageChecked && canStartStory === false) {
    // Temporarily bypass usage limit for testing
    console.log('Usage limit would normally prevent story start, but bypassing for testing');
    
    // Return null to allow story to proceed even if usage limit would normally prevent it
    return null;
    
    /* Original code for usage limit message:
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <Link href="/stories" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Stories
            </Link>
            <h1 className="text-3xl font-bold text-center flex-1 px-4">{story.title}</h1>
            <div className="w-24"></div> 
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Story Limit Reached</h2>
            <p className="text-gray-600 mb-6">
              You&apos;ve reached your monthly story limit. Upgrade your plan to continue practicing with more stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/subscription">
                <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg">
                  Upgrade Plan
                </button>
              </Link>
              <Link href="/stories">
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  Back to Stories
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
    */
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/stories" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Stories
          </Link>
          <h1 className="text-3xl font-bold text-center flex-1 px-4">{story.title}</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        {/* Story Player */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold">Listen to the Story</h2>
          </div>
          <div className="space-y-6">
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                onClick={handlePlayStory}
                disabled={isConnecting || !usageChecked}
                className={`${isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white`}
              >
                {isConnecting ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : isPlaying ? (
                  <>
                    <Square className="w-5 h-5 mr-2" />
                    Stop Story
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Play Story
                  </>
                )}
              </Button>
              
              {isPlaying && (
                <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="font-mono text-orange-800">{formatTime(timeRemaining)}</span>
                </div>
              )}
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-2">How to use:</h3>
              <ul className="list-disc pl-5 space-y-1 text-orange-700">
                <li>Click &quot;Play Story&quot; to listen to the story</li>
                <li>Listen carefully and try to understand the meaning</li>
                <li>After the story, explore vocabulary and answer questions</li>
                <li className="font-medium">Story will automatically complete in 7 minutes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={currentSection === "story" ? "default" : "outline"}
            onClick={() => setCurrentSection("story")}
            className="flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Story
          </Button>
          <Button
            variant={currentSection === "vocabulary" ? "default" : "outline"}
            onClick={() => setCurrentSection("vocabulary")}
            className="flex items-center gap-2"
          >
            <Brain className="w-4 h-4" />
            Vocabulary & Phrases
          </Button>
          <Button
            variant={currentSection === "questions" ? "default" : "outline"}
            onClick={() => setCurrentSection("questions")}
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Comprehension Questions
          </Button>
        </div>

        {/* Story Content */}
        {currentSection === "story" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Story Text</h2>
            <div>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-gray-700">
                  {story.content}
                </p>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">Moral of the Story:</h3>
                <p className="text-blue-700">
                  {story.moral}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Vocabulary Section */}
        {currentSection === "vocabulary" && (
          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Important Vocabulary - Match the Following</h2>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {story.vocabulary.map((word, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-bold text-lg text-orange-600 mb-2">{word.word}</h3>
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Match the meaning:
                        </label>
                        <select
                          value={vocabularyAnswers[index] || ""}
                          onChange={(e) => handleVocabularyAnswerChange(index, e.target.value)}
                          className="w-full p-2 border rounded-lg"
                          disabled={showVocabularyAnswers}
                        >
                          <option value="">Select meaning</option>
                          <option value={word.meaning}>{word.meaning}</option>
                          {word.synonyms?.map((synonym, synIndex) => (
                            <option key={synIndex} value={synonym}>
                              {synonym}
                            </option>
                          ))}
                          {word.antonyms?.map((antonym, antIndex) => (
                            <option key={antIndex} value={antonym}>
                              {antonym}
                            </option>
                          ))}
                          <option value="incorrect1">To give up easily</option>
                          <option value="incorrect2">To succeed quickly</option>
                        </select>
                      </div>
                      
                      {showVocabularyAnswers && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg">
                          <p className="text-sm font-medium text-green-800">Correct Meaning:</p>
                          <p className="text-gray-700">{word.meaning}</p>
                          {word.synonyms && word.synonyms.length > 0 && (
                            <p className="text-sm mt-2">
                              <span className="font-medium">Synonyms:</span> {word.synonyms.join(", ")}
                            </p>
                          )}
                          {word.antonyms && word.antonyms.length > 0 && (
                            <p className="text-sm mt-1">
                              <span className="font-medium">Antonyms:</span> {word.antonyms.join(", ")}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  {!showVocabularyAnswers ? (
                    <Button 
                      onClick={checkVocabularyAnswers}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      Check Answers
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setShowVocabularyAnswers(false)}
                      variant="outline"
                    >
                      Hide Answers
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Useful Phrases - Match the Following</h2>
              <div>
                <div className="space-y-4">
                  {story.phrases.map((phrase, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-bold text-lg text-blue-600 mb-2">{phrase.phrase}</h3>
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Match the meaning:
                        </label>
                        <select
                          value={phraseAnswers[index] || ""}
                          onChange={(e) => handlePhraseAnswerChange(index, e.target.value)}
                          className="w-full p-2 border rounded-lg"
                          disabled={showPhraseAnswers}
                        >
                          <option value="">Select meaning</option>
                          <option value={phrase.meaning}>{phrase.meaning}</option>
                          <option value="incorrect1">To stop working</option>
                          <option value="incorrect2">To begin a journey</option>
                          <option value="incorrect3">To complete a task</option>
                          <option value={phrase.example}>{phrase.example}</option>
                        </select>
                      </div>
                      
                      {showPhraseAnswers && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg">
                          <p className="text-sm font-medium text-green-800">Correct Meaning:</p>
                          <p className="text-gray-700">{phrase.meaning}</p>
                          <p className="text-sm mt-2 italic bg-gray-50 p-2 rounded">
                            <span className="font-medium">Example:</span> {phrase.example}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  {!showPhraseAnswers ? (
                    <Button 
                      onClick={checkPhraseAnswers}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      Check Answers
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setShowPhraseAnswers(false)}
                      variant="outline"
                    >
                      Hide Answers
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Questions Section */}
        {currentSection === "questions" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Comprehension Questions - Match the Following</h2>
            <div>
              <div className="space-y-4">
                {story.questions.map((question, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-white">
                    <p className="font-medium mb-2">Q{index + 1}: {question}</p>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select the best answer:
                      </label>
                      <select
                        value={questionAnswers[index] || ""}
                        onChange={(e) => handleQuestionAnswerChange(index, e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        disabled={showQuestionAnswers}
                      >
                        <option value="">Select answer</option>
                        <option value="correct">To follow your dreams despite challenges</option>
                        <option value="incorrect1">To get a high-paying job immediately</option>
                        <option value="incorrect2">To avoid family pressure</option>
                        <option value="incorrect3">To become famous</option>
                      </select>
                    </div>
                    
                    {showQuestionAnswers && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-800">Correct Answer:</p>
                        <p className="text-gray-700">To follow your dreams despite challenges</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                {!showQuestionAnswers ? (
                  <Button 
                    onClick={checkQuestionAnswers}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    Check Answers
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setShowQuestionAnswers(false)}
                    variant="outline"
                  >
                    Hide Answers
                  </Button>
                )}
              </div>
              
              {/* Generate Report Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Button 
                  onClick={() => {
                    // Temporarily disable manual report generation for testing
                    alert('Report generation is temporarily disabled for testing.');
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <>
                    <FileText className="w-5 h-5 mr-2" />
                    Generate Detailed Report
                  </>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link href="/stories" className="text-blue-600 hover:text-blue-800">
            ← Back to Stories
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default StoryDetailPage;