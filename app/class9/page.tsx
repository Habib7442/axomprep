import React from "react";
import Link from "next/link";

const Class9Subjects = () => {
  const subjects = [
    { 
      name: "Science", 
      description: "Physics, Chemistry, Biology", 
      icon: "🔬",
      color: "bg-blue-100 text-blue-800"
    },
    { 
      name: "Mathematics", 
      description: "Algebra, Geometry, Calculus", 
      icon: "🔢",
      color: "bg-green-100 text-green-800"
    },
    { 
      name: "English", 
      description: "Literature, Grammar, Writing", 
      icon: "📚",
      color: "bg-yellow-100 text-yellow-800"
    },
    { 
      name: "Hindi", 
      description: "Vyakaran, Patra, Nibandh", 
      icon: "📖",
      color: "bg-red-100 text-red-800"
    },
    { 
      name: "Social Science", 
      description: "History, Geography, Civics", 
      icon: "🌎",
      color: "bg-purple-100 text-purple-800"
    },
    { 
      name: "Sanskrit", 
      description: "Vyakaran, Anuvad, Rachana", 
      icon: "ॐ",
      color: "bg-indigo-100 text-indigo-800"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Classes
          </Link>
          <h1 className="text-3xl font-bold mt-2">CBSE Class 9 Subjects</h1>
          <p className="text-gray-600">Select a subject to begin your learning journey</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
          {subjects.length} Subjects
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <Link 
            key={index} 
            href={`/class9/${subject.name.toLowerCase().replace(/\s+/g, '-')}`}
            className={`block p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${subject.color}`}
          >
            <div className="text-4xl mb-4">{subject.icon}</div>
            <h2 className="text-2xl font-bold mb-2">{subject.name}</h2>
            <p className="mb-4">{subject.description}</p>
            <button className="text-blue-700 font-medium hover:text-blue-900">
              Explore Chapters →
            </button>
          </Link>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Your Overall Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">Subjects Enrolled</h3>
            <p className="text-3xl font-bold text-blue-600">6/6</p>
            <p className="text-sm text-gray-600">All subjects covered</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">Chapters Completed</h3>
            <p className="text-3xl font-bold text-green-600">12/54</p>
            <p className="text-sm text-gray-600">22% of curriculum</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">Weekly Goal</h3>
            <p className="text-3xl font-bold text-purple-600">3/5</p>
            <p className="text-sm text-gray-600">Chapters this week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class9Subjects;