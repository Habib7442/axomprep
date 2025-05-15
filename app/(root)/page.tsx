"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";
import { Wand2, BookOpen, Trophy, MessageSquare, GraduationCap, School, BookMarked } from "lucide-react";
import PlatformFeedbackForm from "@/components/feedback/PlatformFeedbackForm";
import PlatformFeedbackDisplay from "@/components/feedback/PlatformFeedbackDisplay";
import Image from "next/image";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // If user is logged in, redirect to dashboard
        router.push('/dashboard');
      } else {
        // If no user, show the homepage
        setLoading(false);
      }
    }

    checkAuth();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E1A2D] bg-[url('/images/hogwarts-bg.jpg')] bg-cover bg-center bg-blend-overlay flex items-center justify-center">
        <div className="text-amber-200 text-center">
          <div className="relative h-20 w-20 mx-auto mb-4">
            <div className="absolute inset-0 animate-ping opacity-25">
              <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L3 10H5V20H19V10H21L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 20V10H15V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="animate-pulse">
              <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L3 10H5V20H19V10H21L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 20V10H15V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <p className="font-serif italic">Sorting your house...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E1A2D] bg-[url('/images/hogwarts-bg.jpg')] bg-cover bg-center bg-blend-overlay text-amber-50 font-serif">
      <NavBar />

      {/* Hero Section - Hogwarts Great Hall Style */}
      <section className="py-20 px-4 text-center relative">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-6 flex flex-col items-center">
            <div className="flex items-center mb-2">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-teal-600 shadow-lg shadow-teal-900/50 bg-teal-700 flex items-center justify-center">
               <Image src="/logo.jpg" alt="AxomPrep Logo" width={112} height={112} className="object-cover" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl text-teal-300 font-bold mb-1">AxomPrep Coaching Center</h2>
              <p className="text-amber-300 text-lg font-serif mb-4">presents</p>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-amber-100 mb-6 drop-shadow-lg">
            Master Competitive Exams with{" "}
            <span className="text-amber-400 italic">Magical</span> Preparation
          </h1>
          <p className="text-xl text-amber-200 mb-10 max-w-3xl mx-auto drop-shadow">
            MockWizard transforms your SSC, Railways, Banking and ADRE exam preparation into a magical journey through
            enchanted mock tests, spellbook lessons, and house competitions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 rounded-full shadow-lg shadow-amber-900/30 transition-transform hover:scale-105"
              >
                Begin Your Journey
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-amber-600 text-black hover:text-amber-900 hover:border-amber-500 px-8 rounded-full shadow-lg shadow-amber-900/20"
              >
                Return to Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Hogwarts Houses Style */}
      <section className="py-16 px-4 bg-[#1A1A2E]/90 border-t-2 border-b-2 border-amber-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-100 text-center mb-12 italic">
            The MockWizard Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gryffindor-themed card */}
            <div className="bg-gradient-to-b from-[#740001]/80 to-[#740001]/60 rounded-lg p-6 text-center border border-[#D3A625] shadow-lg transform transition-transform hover:scale-105">
              <div className="bg-[#D3A625] rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Wand2 className="h-8 w-8 text-[#740001]" />
              </div>
              <h3 className="text-xl font-semibold text-[#D3A625] mb-3">
                Magical Mock Tests
              </h3>
              <p className="text-amber-100">
                Practice with enchanted mock tests designed specifically for SSC, RAILWAYS, BANKING, and ADRE exams.
              </p>
            </div>

            {/* Ravenclaw-themed card */}
            <div className="bg-gradient-to-b from-[#0E1A40]/80 to-[#0E1A40]/60 rounded-lg p-6 text-center border border-[#946B2D] shadow-lg transform transition-transform hover:scale-105">
              <div className="bg-[#946B2D] rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <BookOpen className="h-8 w-8 text-[#0E1A40]" />
              </div>
              <h3 className="text-xl font-semibold text-[#946B2D] mb-3">
                Spellbook Lessons
              </h3>
              <p className="text-amber-100">
                Master key exam concepts through our carefully crafted spellbook lessons with interactive practice.
              </p>
            </div>

            {/* Hufflepuff-themed card */}
            <div className="bg-gradient-to-b from-[#ECB939]/80 to-[#ECB939]/60 rounded-lg p-6 text-center border border-[#372E29] shadow-lg transform transition-transform hover:scale-105">
              <div className="bg-[#372E29] rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Trophy className="h-8 w-8 text-[#ECB939]" />
              </div>
              <h3 className="text-xl font-semibold text-[#372E29] mb-3">
                House Competitions
              </h3>
              <p className="text-amber-100">
                Compete with fellow wizards on the leaderboard and earn points for your Hogwarts house.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Parchment Style */}
      <section className="py-16 px-4 bg-[url('/images/parchment-texture.jpg')] bg-cover bg-center text-[#372E29]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-red-800 text-center mb-12 italic">
            Tales from Fellow Wizards
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PlatformFeedbackDisplay />
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#0E1A40]/80 rounded-lg p-4 border border-[#946B2D] shadow-lg mb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#946B2D] rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-md">
                    <MessageSquare className="h-5 w-5 text-[#0E1A40]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#946B2D] ml-3">
                    Share Your Experience
                  </h3>
                </div>
                <p className="text-amber-100 mb-4">
                  Your feedback helps us improve MockWizard and inspires future wizards on their exam preparation journey.
                </p>
              </div>

              <PlatformFeedbackForm />
            </div>
          </div>
        </div>
      </section>

      {/* About AxomPrep Section */}
      <section className="py-16 px-4 bg-teal-900/80 border-t-2 border-teal-700/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-teal-800/70 p-6 rounded-full border-4 border-teal-600/50 shadow-lg">
                <School className="h-24 w-24 text-teal-300" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-teal-100 mb-4">
                About AxomPrep Coaching Center
              </h2>
              <p className="text-teal-200 mb-4 text-lg">
                AxomPrep is a premier coaching center offering comprehensive preparation for Mathematics, General Science, and English for classes 8-10 in both English and Assamese medium.
              </p>
              <p className="text-teal-200 mb-6">
                With experienced faculty, personalized attention, and proven teaching methodologies, AxomPrep has helped thousands of students achieve academic excellence and succeed in competitive exams.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-teal-800/50 p-4 rounded-lg border border-teal-600/30">
                  <GraduationCap className="h-8 w-8 text-teal-300 mb-2" />
                  <h3 className="text-teal-100 font-bold mb-1">Expert Faculty</h3>
                  <p className="text-teal-200 text-sm">Experienced teachers with proven track records</p>
                </div>
                <div className="bg-teal-800/50 p-4 rounded-lg border border-teal-600/30">
                  <BookMarked className="h-8 w-8 text-teal-300 mb-2" />
                  <h3 className="text-teal-100 font-bold mb-1">Quality Materials</h3>
                  <p className="text-teal-200 text-sm">Comprehensive study materials and notes</p>
                </div>
                <div className="bg-teal-800/50 p-4 rounded-lg border border-teal-600/30">
                  <Trophy className="h-8 w-8 text-teal-300 mb-2" />
                  <h3 className="text-teal-100 font-bold mb-1">Proven Results</h3>
                  <p className="text-teal-200 text-sm">Consistent success in competitive exams</p>
                </div>
              </div>
              <Link href="/about-axomprep">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white border-2 border-teal-500">
                  Learn More About AxomPrep
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Great Hall Style */}
      <section className="py-20 px-4 bg-[#0E1A2D]/90 text-center border-t-2 border-amber-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-100 mb-6 italic">
            Your Acceptance Letter Awaits
          </h2>
          <p className="text-xl text-amber-200 mb-10">
            Join thousands of aspiring wizards who are conquering competitive exams and advancing their careers with MockWizard.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-10 py-6 rounded-full shadow-lg shadow-amber-900/30 transition-transform hover:scale-105"
            >
              Enroll at MockWizard
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
