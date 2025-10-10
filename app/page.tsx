"use client";

import React from "react";
import Link from "next/link";

const HomePage = () => {
  const scrollToLearningPath = () => {
    const element = document.getElementById("learning-path");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const classes = [
    {
      name: "Class 9",
      description: "Foundation for board exams",
      icon: "📚",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      gradient: "from-blue-50 to-blue-100",
    },
    {
      name: "Class 10",
      description: "Board exam preparation",
      icon: "🎯",
      color: "bg-green-100 text-green-800 border-green-200",
      gradient: "from-green-50 to-green-100",
    },
    {
      name: "Class 11",
      description: "Higher secondary education",
      icon: "📈",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      gradient: "from-yellow-50 to-yellow-100",
    },
    {
      name: "Class 12",
      description: "Final board exams",
      icon: "🎓",
      color: "bg-red-100 text-red-800 border-red-200",
      gradient: "from-red-50 to-red-100",
    },
  ];

  const features = [
    {
      icon: "🎙️",
      title: "AI Voice Tutoring",
      description:
        "Interactive voice conversations with your AI tutor for better understanding and retention",
      highlight: "Speak Confidently",
    },
    {
      icon: "🧠",
      title: "Smart Learning",
      description:
        "AI-powered personalized learning paths that adapt to your pace and style",
      highlight: "Learn Smarter",
    },
    {
      icon: "🏆",
      title: "Performance Tracking",
      description:
        "Real-time progress monitoring and competitive leaderboards to keep you motivated",
      highlight: "Score Higher",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ✨ Your AI Study Companion
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Learn Smarter, Speak Confidently,
            <br />
            and Score Higher
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Converso is your AI-powered learning companion that helps you
            understand concepts, practice with voice, and track progress — all
            in one intelligent ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={scrollToLearningPath}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Journey 🚀
            </button>
            <button className="border-2 border-gray-300 hover:border-orange-500 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-orange-50">
              Watch Demo 🎥
            </button>
          </div>
        </div>

        {/* Class Selection */}
        <div id="learning-path" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Choose Your Learning Path
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Select your class to begin your personalized AI learning journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.map((classItem, index) => (
              <Link
                key={index}
                href={`/class${classItem.name.split(" ")[1]}`}
                className={`group block p-8 rounded-2xl border-2 hover:border-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-gradient-to-br ${classItem.gradient} ${classItem.color}`}
              >
                <div className="text-6xl mb-6 group-hover:animate-bounce">
                  {classItem.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{classItem.name}</h3>
                <p className="mb-6 opacity-80">{classItem.description}</p>
                <button className="w-full py-3 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-md group-hover:shadow-lg">
                  Select Class →
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Why Choose Converso?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of learning with our AI-powered study
              ecosystem designed for modern students
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
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who are already learning smarter with
            Converso's AI-powered study companion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToLearningPath}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started Free 🎯
            </button>
            <button className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-white/10">
              Learn More 📚
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              10,000+
            </div>
            <div className="text-gray-600">Active Students</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-gray-600">Improvement Rate</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">AI Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
