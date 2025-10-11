"use client";

import React, { useState } from "react";
import Link from "next/link";
import CTA from "@/components/CTA";

const HomePage = () => {
  const [topic, setTopic] = useState("");
  
  const handleStartInterview = () => {
    if (topic.trim()) {
      // Redirect to a new interview page with the topic
      window.location.href = `/interview?topic=${encodeURIComponent(topic)}`;
    }
  };

  const features = [
    {
      icon: "🎙️",
      title: "AI Voice Interview Practice",
      description:
        "Realistic mock interviews with conversational AI that simulates actual interview scenarios",
      highlight: "Speak Confidently",
    },
    {
      icon: "🧠",
      title: "Smart Interview Prep",
      description:
        "Personalized interview questions and feedback based on your chosen topic and industry",
      highlight: "Prepare Smarter",
    },
    {
      icon: "📊",
      title: "Performance Analytics",
      description:
        "Detailed analysis of your interview performance with actionable insights for improvement",
      highlight: "Improve Faster",
    },
  ];

  const interviewTopics = [
    "Software Engineering",
    "Product Management",
    "Data Science",
    "Marketing",
    "Finance",
    "Human Resources",
    "Sales",
    "Customer Service"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ✨ Your Personalized AI Tutor
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Master Interviews, Speak Fluently,
            <br />
            and Build Interview Confidence
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            RehearsAI is your AI-powered interview coach that helps you practice real interview scenarios, 
            improve your English speaking skills, and build confidence for any job interview.
          </p>
        </div>

        {/* Interview Practice Section */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
              Start Your Interview Practice
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Choose a topic or enter your own to begin a realistic mock interview
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter interview topic (e.g., React Developer, Marketing Manager, Data Analyst)"
                className="flex-grow px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
              />
              <button
                onClick={handleStartInterview}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg whitespace-nowrap"
              >
                Start Interview
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">Popular Interview Topics:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {interviewTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setTopic(topic)}
                    className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full hover:bg-orange-200 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Create Your Own AI Tutor Section */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Create Your Own AI Tutor
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Build a personalized AI tutor for any subject or skill you want to master
          </p>
          <div className="flex justify-center">
            <div className="w-full flex justify-center">
              <CTA />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Why Choose RehearsAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of interview preparation with our AI-powered platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl border-2 border-gray-100 hover:border-orange-300 bg-white hover:bg-gradient-to-br hover:from-orange-50 hover:to-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="text-6xl mb-6 group-hover:animate-pulse">
                  {feature.icon}
                </div>
                <div className="mb-3">
                  <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                    {feature.highlight}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who have improved their interview skills with 
            RehearsAI&apos;s AI-powered interview coach
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/interview">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                Start Practicing Now 🎯
              </button>
            </Link>
            <Link href="/companions">
              <button className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-white/10">
                Browse AI Tutors 🤖
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;