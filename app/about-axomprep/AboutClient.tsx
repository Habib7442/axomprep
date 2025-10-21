"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutClient = () => {
  const values = [
    {
      title: "Innovation",
      description: "We constantly push boundaries to deliver cutting-edge learning solutions.",
      icon: "🚀",
    },
    {
      title: "Accessibility",
      description: "Quality education should be accessible to everyone, everywhere.",
      icon: "🌍",
    },
    {
      title: "Personalization",
      description: "Every learner is unique, and our platform adapts to individual needs.",
      icon: "🎯",
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every aspect of our platform and services.",
      icon: "⭐",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-50 to-red-50 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Master English with <span className="text-orange-500">AI-Powered</span> Interview Practice
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                At AxomPrep, we help learners master English communication skills through realistic 
                AI-powered interview practice. Our platform boosts confidence and fluency for academic 
                and professional success.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/interview" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Practice Interviews Now
                </Link>
                <Link 
                  href="/companions" 
                  className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all"
                >
                  Meet Our AI Tutors
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <Image 
                    src="/images/logo.png" 
                    alt="AxomPrep Logo" 
                    width={200} 
                    height={200} 
                    className="rounded-full"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🎙️</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🤖</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Purpose</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We&apos;re on a mission to transform how people learn and prepare for their future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To empower learners worldwide to master English communication through realistic 
                AI-powered interview practice, building confidence and fluency for academic and 
                professional success.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">👁️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To become the world&apos;s most trusted platform for English language learning through 
                conversational AI, helping learners of all backgrounds confidently navigate interviews 
                and professional communication.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at AxomPrep
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MVP Focus Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Focused on What Matters Most
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              As we launch our MVP, we&apos;re focused exclusively on delivering the best 
              English interview practice experience. Our AI-powered platform simulates real 
              interview scenarios to help you build confidence and fluency.
            </p>
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Why Interview Practice?</h3>
              <p className="text-white/90 mb-6">
                Interviews are critical moments where English proficiency can make or break opportunities. 
                Our platform provides realistic practice with conversational AI that gives instant feedback 
                on your language skills, pronunciation, and communication style.
              </p>
              <Link 
                href="/interview" 
                className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition-all"
              >
                Start Practicing Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-24 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Master English Interviews?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of learners who are already building confidence with AxomPrep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/interview" 
              className="bg-white text-orange-500 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition-all"
            >
              Practice Interviews Now
            </Link>
            <Link 
              href="/subscription" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutClient;