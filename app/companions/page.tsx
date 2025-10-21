import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getUserCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

// Helper function to convert search params to string
const getSearchParamAsString = (param: string | string[] | undefined): string => {
  if (!param) return "";
  return Array.isArray(param) ? param[0] : param;
};

const CompanionsLibrary = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  // Get the current user ID
  const { userId } = await auth();
  
  // Await searchParams
  const awaitedSearchParams = await searchParams;
  
  if (!userId) {
    return (
      <div className="bg-[#F8F9FB] min-h-screen">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="text-center py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              My AI Tutors
            </h1>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Please Sign In</h2>
              <p className="text-[#64748B] mb-8">You need to be signed in to view your AI Tutors.</p>
              <Link href="/sign-in">
                <button className="bg-gradient-to-r from-[#FF6B35] to-[#FF914D] text-white px-6 py-3 rounded-lg font-semibold text-base md:text-lg hover:from-[#FF844B] hover:to-[#FFB088] transition-all shadow-lg">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Extract search parameters and ensure they are strings
  const subject = getSearchParamAsString(awaitedSearchParams.subject);
  const topic = getSearchParamAsString(awaitedSearchParams.topic);

  try {
    const companions = await getUserCompanions(userId);

    // Filter companions based on subject and topic if provided
    const filteredCompanions = companions.filter(companion => {
      const matchesSubject = subject ? 
        companion.subject && typeof companion.subject === 'string' && 
        companion.subject.toLowerCase().includes(subject.toLowerCase()) : true;
        
      const matchesTopic = topic ? (
        (companion.topic && typeof companion.topic === 'string' && companion.topic.toLowerCase().includes(topic.toLowerCase())) || 
        (companion.name && typeof companion.name === 'string' && companion.name.toLowerCase().includes(topic.toLowerCase()))
      ) : true;
      
      return matchesSubject && matchesTopic;
    });

    // Check if companions array is empty
    if (!filteredCompanions || filteredCompanions.length === 0) {
      return (
        <div className="bg-[#F8F9FB] min-h-screen">
          <div className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="text-center py-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                My AI Tutors
              </h1>
              <p className="text-xl text-[#475569] mb-8">
                Create your personalized AI tutors to help you master any subject
              </p>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-4">No AI Tutors Yet</h2>
                <p className="text-[#64748B] mb-8">
                  You haven&apos;t created any AI Tutors yet. Start building your personalized learning experience by creating your first AI Tutor.
                </p>
                <Link href="/companions/new">
                  <button className="bg-gradient-to-r from-[#FF6B35] to-[#FF914D] text-white px-6 py-3 rounded-lg font-semibold text-base md:text-lg hover:from-[#FF844B] hover:to-[#FFB088] transition-all shadow-lg">
                    Create Your First AI Tutor
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-[#F8F9FB] min-h-screen">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-4">
                My AI Tutors
              </h1>
              <p className="text-xl text-[#475569] max-w-2xl mx-auto">
                Your personalized collection of AI tutors
              </p>
            </div>

            {/* Search, Filter, and Create Button */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center max-w-3xl mx-auto">
              <div className="flex gap-4 w-full md:w-auto">
                <div className="flex-1">
                  <SearchInput />
                </div>
                <div className="w-48">
                  <SubjectFilter />
                </div>
              </div>
              <Link href="/companions/new">
                <button className="bg-gradient-to-r from-[#FF6B35] to-[#FF914D] text-white px-6 py-3 rounded-lg font-semibold text-base md:text-lg hover:from-[#FF844B] hover:to-[#FFB088] transition-all shadow-lg whitespace-nowrap">
                  Create AI Tutor
                </button>
              </Link>
            </div>
          </div>

          {/* Companions Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8">
            {filteredCompanions.map((companion) => (
              <CompanionCard
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
              />
            ))}
          </section>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching AI Tutors:", error);
    return (
      <div className="bg-[#F8F9FB] min-h-screen">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="text-center py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              My AI Tutors
            </h1>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Unable to Load AI Tutors</h2>
              <p className="text-[#64748B] mb-8">We encountered an issue while loading your AI Tutors. This could be due to a network problem or server issue. Please try again later.</p>
              <Link href="/companions/new">
                <button className="bg-gradient-to-r from-[#FF6B35] to-[#FF914D] text-white px-6 py-3 rounded-lg font-semibold text-base md:text-lg hover:from-[#FF844B] hover:to-[#FFB088] transition-all shadow-lg">
                  Create Your First AI Tutor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CompanionsLibrary;