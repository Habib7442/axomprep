"use client";

import React, { useState } from "react";
import Link from "next/link";
import CTA from "@/components/CTA";
import FeatureCard from "@/components/FeatureCard";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const HomePageClient = () => {
  const [topic, setTopic] = useState("");

  const { user } = useUser();


  const handleStartInterview = () => {
    if (topic.trim()) {
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
      icon: "🤖",
      title: "Personal AI Tutor",
      description:
        "Create your own AI tutor personalized to your learning style and preferences",
      highlight: "Learn Smarter",
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
    "Customer Service",
  ];

  return (
    <div className="min-h-screen">
      {/* Announcement Banner */}
      <div className="bg-[#1E293B] text-white py-2 text-center text-xs md:text-sm">
        <span className="opacity-90">
          🎉 Join professionals who have aced their interviews with AxomPrep.
        </span>{" "}
        <Link
          href="/companions"
          className="underline hover:opacity-80 transition-opacity"
        >
          Start your free practice today.
        </Link>
      </div>

      {/* Hero Section with gradient background */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center text-center">
            {/* Larger Logo */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center border-2 border-orange-500 rounded-full p-2">
                <Image
                  src="/images/logo.png"
                  alt="AxomPrep Logo"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-gray-900 tracking-tight max-w-5xl leading-tight">
              Master English with <br className="hidden md:block" />
              <span className="text-orange-500">AI-Powered</span> Interview Practice
            </h1>

            {/* Start Interview Card moved to Hero Section */}
            <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-12 border border-gray-100 mt-8">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter interview topic (e.g., React Developer, Marketing Manager)"
                  className="flex-grow px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all bg-white text-gray-900 placeholder-gray-400"
                />
                <button
                  onClick={handleStartInterview}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Start Interview
                </button>
              </div>

              <div>
                <p className="text-gray-600 mb-3 md:mb-4 font-medium text-sm md:text-base">
                  Popular Interview Topics:
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {interviewTopics.map((topicItem, index) => (
                    <button
                      key={index}
                      onClick={() => setTopic(topicItem)}
                      className="px-3 py-2 md:px-5 md:py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 hover:text-gray-900 transition-colors font-medium text-xs md:text-sm"
                    >
                      {topicItem}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Card Section with Glassmorphism Effect */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 shadow-xl mb-16 md:mb-32">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 bg-gradient-to-r from-[#FF6B35] to-[#FF914D] bg-clip-text text-transparent">
                Explore Our Features
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the powerful tools that will help you master English communication
              </p>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              <FeatureCard 
                href="/companions"
                icon="🤖"
                title="AI Tutors"
                description="Create personalized AI tutors tailored to your learning style and preferences."
              />
            
              <FeatureCard 
                href="/interview"
                icon="🎤"
                title="Interview Practice"
                description="Practice real-world interview scenarios with our advanced voice AI technology."
              />
            
              <FeatureCard 
                href="/common-interview"
                icon="💼"
                title="Common Interview"
                description="Master frequently asked interview questions with guided practice sessions."
              />
            
              <FeatureCard 
                href="/social-scenarios"
                icon="👥"
                title="Social Scenarios"
                description="Practice real-life English conversations in everyday social situations."
              />
            
              <FeatureCard 
                href="/stories"
                icon="📖"
                title="Stories"
                description="Improve your listening skills with engaging English stories and exercises."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Create Your Own AI Tutor Section - Improved design */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white backdrop-blur-md rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 border border-white/20 shadow-lg">
            <div className="text-center mb-6 md:mb-8">
              <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs md:text-sm font-bold mb-4">
                Start Learning Your Way
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
                Build and Personalize Your AI Tutor
              </h2>
              <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
                Create a customized AI tutor that matches your learning style and preferences.
              </p>
            </div>

            {/* Icon Grid */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-10 max-w-lg mx-auto">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/50 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <span className="text-2xl md:text-3xl">🎓</span>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/50 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <span className="text-2xl md:text-3xl">💻</span>
              </div>
              <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg border border-white/30 transform scale-105">
                <span className="text-2xl md:text-4xl">🤖</span>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/50 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <span className="text-2xl md:text-3xl">👥</span>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/50 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <span className="text-2xl md:text-3xl">💬</span>
              </div>
            </div>

            <div className="flex justify-center">
              <CTA />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 md:mb-16 text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-gray-900">
              Why Choose AxomPrep?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white text-center p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl border border-gray-100 hover:border-orange-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl mb-4 md:mb-6">
                  {feature.icon}
                </div>
                <div className="mb-3 md:mb-4">
                  <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-semibold">
                    {feature.highlight}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {feature.description}
                </p>
              </div>
            ))}

            {/* More Features Coming Soon Card */}
            <div className="group bg-white text-center p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl border border-gray-100 hover:border-orange-500 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl mb-4 md:mb-6">🚀</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">
                More Features Coming Soon
              </h3>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                We&apos;re constantly working to improve your experience with
                new features and enhancements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 bg-gradient-to-r from-[#FF6B35] to-[#FF914D] bg-clip-text text-transparent">
              Ready to Master English Interviews?
            </h2>
            <p className="text-base md:text-xl mb-8 md:mb-10 text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Join thousands of learners who are already building confidence with AxomPrep
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <Link href="/interview">
                <button className="bg-gradient-to-r from-[#FF6B35] to-[#FF914D] hover:from-[#FF844B] hover:to-[#FFB088] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                  Practice Interviews Now
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </Link>
              <Link href="/companions">
                <button className="border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FFF7F2] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all inline-flex items-center gap-2">
                  Meet Our AI Tutors
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageClient;