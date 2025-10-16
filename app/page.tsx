"use client";

import React, { useState } from "react";
import Link from "next/link";
import CTA from "@/components/CTA";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const HomePage = () => {
  const [topic, setTopic] = useState("");

  const { user } = useUser();

  console.log(user);

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
    <div className="bg-[#F8F9FB] min-h-screen w-full">
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
      <div className="bg-gradient-to-br from-[#EEF2FF] via-[#F8F9FB] to-[#FEF3C7] py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center border-2 border-teal-500 rounded-full p-1">
                <Image
                  src="/images/logo.png"
                  alt="AxomPrep Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-[#0F172A] tracking-tight max-w-5xl leading-tight">
              AxomPrep: Your Gateway to <br className="hidden md:block" />
              English Fluency and{" "}
              <span className="text-[#6366F1]">Career Success</span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-xl lg:text-2xl text-[#4B5563] mb-6 md:mb-8 max-w-3xl leading-relaxed font-normal">
              AxomPrep empowers Indian learners with AI-powered English learning
              and interview practice. Master conversational English and ace job
              interviews from home.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Start Your Interview Practice Section */}
        <div className="mb-16 md:mb-32">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-[#0F172A]">
              Start Your Interview Practice
            </h2>
            <p className="text-base md:text-xl text-[#475569] max-w-2xl mx-auto">
              Choose a topic or enter your own to begin a realistic mock
              interview
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-12 border border-[#E2E8F0]">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter interview topic (e.g., React Developer, Marketing Manager)"
                className="flex-grow px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border border-[#E2E8F0] rounded-lg focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 focus:outline-none transition-all bg-white text-[#0F172A] placeholder-[#94A3B8]"
              />
              <button
                onClick={handleStartInterview}
                className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Start Interview
              </button>
            </div>

            <div>
              <p className="text-[#64748B] mb-3 md:mb-4 font-medium text-sm md:text-base">
                Popular Interview Topics:
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {interviewTopics.map((topicItem, index) => (
                  <button
                    key={index}
                    onClick={() => setTopic(topicItem)}
                    className="px-3 py-2 md:px-5 md:py-2.5 bg-[#F1F5F9] text-[#475569] rounded-lg hover:bg-[#E2E8F0] hover:text-[#0F172A] transition-colors font-medium text-xs md:text-sm"
                  >
                    {topicItem}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Create Your Own AI Tutor Section */}
        <div className="mb-16 md:mb-32">
          <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white shadow-2xl">
            <div className="mb-4 md:mb-6">
              <span className="inline-block bg-[#FCD34D] text-[#78350F] px-3 py-1.5 rounded-full text-xs md:text-sm font-bold">
                Start Learning Your Way
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Build and Personalize Your AI Tutor
            </h2>
            <p className="text-base md:text-xl text-[#CBD5E1] max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
              Create a customized AI tutor that matches your learning style and
              preferences.
            </p>

            {/* Icon Grid */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-10 max-w-lg mx-auto">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="text-2xl md:text-3xl">🎓</span>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="text-2xl md:text-3xl">💻</span>
              </div>
              <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/30 transform scale-105">
                <span className="text-2xl md:text-4xl">🤖</span>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="text-2xl md:text-3xl">👥</span>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="text-2xl md:text-3xl">💬</span>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="text-2xl md:text-3xl">📝</span>
              </div>
            </div>

            <div className="flex justify-center">
              <CTA />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16 md:mb-32">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-[#0F172A]">
              Why Choose AxomPrep?
            </h2>
            <p className="text-base md:text-xl text-[#475569] max-w-2xl mx-auto">
              Experience the future of interview preparation with our AI-powered
              platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white text-center p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl border border-[#E2E8F0] hover:border-[#6366F1] hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl mb-4 md:mb-6">
                  {feature.icon}
                </div>
                <div className="mb-3 md:mb-4">
                  <span className="inline-block bg-[#EEF2FF] text-[#6366F1] px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-semibold">
                    {feature.highlight}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#0F172A]">
                  {feature.title}
                </h3>
                <p className="text-[#64748B] leading-relaxed text-base md:text-lg">
                  {feature.description}
                </p>
              </div>
            ))}

            {/* More Features Coming Soon Card */}
            <div className="group bg-white text-center p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl border border-[#E2E8F0] hover:border-[#6366F1] hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl mb-4 md:mb-6">🚀</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#0F172A]">
                More Features Coming Soon
              </h3>
              <p className="text-[#64748B] leading-relaxed text-base md:text-lg">
                We&apos;re constantly working to improve your experience with
                new features and enhancements.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-base md:text-xl mb-8 md:mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who have improved their interview
            skills with AxomPrep&apos;s AI-powered interview coach
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Link href="/interview">
              <button className="bg-white text-[#6366F1] hover:bg-[#F8F9FB] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                Start Practicing Now
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
              <button className="border-2 border-white text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all inline-flex items-center gap-2">
                Browse AI Tutors
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
  );
};

export default HomePage;
