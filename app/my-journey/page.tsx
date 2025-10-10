"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DetailedReportCard } from "@/components/DetailedReportCard";

interface MockTestQuestion {
  id: string;
  created_at: string;
  chapter_id: string;
  chapter_name: string;
  subject: string;
  class: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
  user_answers?: Record<string, string>; // Add user answers
  test_score: number;
  time_taken: number;
  total_questions: number;
  correct_answers: number;
  is_retake?: boolean; // Add retake flag
}

interface SavedFlashcard {
  id: string;
  created_at: string;
  chapter_id: string;
  chapter_name: string;
  subject: string;
  front_text: string;
  back_text: string;
}

export default function MyJourneyPage() {
  const [testHistory, setTestHistory] = useState<MockTestQuestion[]>([]);
  const [savedFlashcards, setSavedFlashcards] = useState<SavedFlashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<MockTestQuestion | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"tests" | "flashcards">("tests");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch test history
        const testResponse = await fetch("/api/my-journey");
        const testData = await testResponse.json();

        if (!testResponse.ok) {
          throw new Error(testData.error || "Failed to fetch test history");
        }

        setTestHistory(testData.data);

        // Fetch saved flashcards
        const flashcardResponse = await fetch("/api/my-journey/flashcards");
        const flashcardData = await flashcardResponse.json();

        if (!flashcardResponse.ok) {
          throw new Error(
            flashcardData.error || "Failed to fetch saved flashcards",
          );
        }

        setSavedFlashcards(flashcardData.data);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded mb-4">{error}</div>
      </div>
    );
  }

  if (selectedTest) {
    return (
      <div>
        <Button
          onClick={() => setSelectedTest(null)}
          className="mb-6"
          variant="outline"
        >
          ← Back to Test History
        </Button>
        <DetailedReportCard
          subject={selectedTest.subject}
          chapter={selectedTest.chapter_name}
          score={selectedTest.test_score}
          totalQuestions={selectedTest.total_questions}
          correctAnswers={selectedTest.correct_answers}
          timeTaken={selectedTest.time_taken}
          questions={selectedTest.questions}
          userAnswers={selectedTest.user_answers}
          isRetake={selectedTest.is_retake || false}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        My Learning Journey with Converso
      </h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === "tests" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("tests")}
        >
          Test History
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === "flashcards" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("flashcards")}
        >
          Saved Flashcards
        </button>
      </div>

      {activeTab === "tests" ? (
        testHistory.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-medium mb-4">No test history yet</h2>
            <p className="text-gray-600 mb-6">
              Take a mock test to see your progress here.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Take a Mock Test
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-medium">Test History</h2>
              <p className="text-gray-600">
                Review your past tests and track your progress
              </p>
            </div>

            <div className="divide-y">
              {testHistory.map((test) => (
                <div key={test.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">
                        {test.chapter_name}
                      </h3>
                      <p className="text-gray-600">
                        {test.subject} • Class {test.class}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Taken on {formatDate(test.created_at)}
                        {test.is_retake && (
                          <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            Retake
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {test.test_score}%
                      </div>
                      <p className="text-sm text-gray-600">
                        {test.correct_answers}/{test.total_questions} correct
                      </p>
                      <p className="text-sm text-gray-600">
                        Time: {formatTime(test.time_taken)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={() => setSelectedTest(test)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      View Detailed Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : savedFlashcards.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-medium mb-4">No saved flashcards yet</h2>
          <p className="text-gray-600 mb-6">
            Create and save flashcards to review them here.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create Flashcards
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-medium">Saved Flashcards</h2>
            <p className="text-gray-600">
              Review your saved flashcards across all chapters
            </p>
          </div>

          <div className="divide-y">
            {savedFlashcards.map((flashcard) => (
              <div key={flashcard.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">
                      {flashcard.chapter_name}
                    </h3>
                    <p className="text-gray-600">{flashcard.subject}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Saved on {formatDate(flashcard.created_at)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">{flashcard.front_text}</p>
                  <p className="mt-2 text-gray-600">{flashcard.back_text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
