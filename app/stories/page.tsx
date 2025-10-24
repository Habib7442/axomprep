"use client";

import React, { useState, useEffect } from "react";
import { stories } from "@/lib/utils/stories";
import { 
  BookOpen,
  AlertCircle,
  Info
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const StoriesPage = () => {
  const [completedSections, setCompletedSections] = useState<Record<number, string[]>>({});
  const [canStartStory, setCanStartStory] = useState<boolean | null>(null);
  const [usageChecked, setUsageChecked] = useState(false);
  const { user, isLoaded } = useUser();

  // Check if user can start a story
  useEffect(() => {
    const checkUsage = async () => {
      if (!user) return;
      
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
    };

    if (user && isLoaded) {
      checkUsage();
    }
  }, [user, isLoaded]);

  // Show usage limit message if user cannot start a story
  if (usageChecked && canStartStory === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">English Story Listening</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Improve your English listening skills with engaging stories.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto text-center">
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
              <Link href="/my-journey">
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  View Reports
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">English Story Listening</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Improve your English listening skills with engaging stories. Each story is 7 minutes long and includes vocabulary building and comprehension questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Link 
              key={story.id} 
              href={`/stories/${story.id}`}
              className="bg-white rounded-2xl shadow-lg cursor-pointer transition-all hover:shadow-xl border-2 hover:border-orange-300 p-6 block"
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
                <h3 className="text-xl font-bold">{story.title}</h3>
              </div>
              <div>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {story.content.substring(0, 150)}...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">5 min</span>
                  <div className="flex gap-1">
                    {completedSections[story.id]?.includes("story") && (
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    )}
                    {completedSections[story.id]?.includes("vocabulary") && (
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    )}
                    {completedSections[story.id]?.includes("questions") && (
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/my-journey" className="text-blue-600 hover:text-blue-800">
            ← Back to Learning Journey
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;