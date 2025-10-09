import React from "react";
import ChapterCard from "@/components/ChapterCard";
import { cbseChapters } from "@/lib/cbse-chapters";
import Link from "next/link";

const Class9ScienceChapters = () => {
  // Filter chapters for Class 9 Science
  const class9ScienceChapters = cbseChapters.filter(
    chapter => chapter.class === "CBSE 9" && 
    (chapter.subject.includes("Chemistry") || 
     chapter.subject.includes("Biology") || 
     chapter.subject.includes("Physics") || 
     chapter.subject.includes("Environmental"))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Classes
          </Link>
          <h1 className="text-3xl font-bold mt-2">CBSE Class 9 Science</h1>
          <p className="text-gray-600">Select a chapter to begin your learning journey</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
          {class9ScienceChapters.length} Chapters
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {class9ScienceChapters.map((chapter, index) => (
          <ChapterCard
            key={`${chapter.class}-${chapter.subject}-${chapter.chapter_number}`}
            id={`${chapter.chapter_number}`}
            title={chapter.chapter_name}
            subject={chapter.subject}
            class="9"
            topicCount={5} // This would be dynamic in a real app
            masteryPercentage={Math.floor(Math.random() * 100)} // This would be dynamic in a real app
          />
        ))}
      </div>

      {/* Progress Summary */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">Chapters Completed</h3>
            <p className="text-3xl font-bold text-blue-600">3/14</p>
            <p className="text-sm text-gray-600">21% of curriculum</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">Average Mastery</h3>
            <p className="text-3xl font-bold text-green-600">65%</p>
            <p className="text-sm text-gray-600">Across all chapters</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">Weekly Goal</h3>
            <p className="text-3xl font-bold text-purple-600">2/3</p>
            <p className="text-sm text-gray-600">Chapters this week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class9ScienceChapters;