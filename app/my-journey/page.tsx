"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import UsageLimits from "@/components/UsageLimits";
import { useUser } from "@clerk/nextjs"; // Import useUser hook from Clerk

// Add interface for interview reports
interface InterviewReport {
  id: string;
  created_at: string;
  user_id: string;
  session_id: string;
  interview_type: string;
  topic: string;
  job_description: string | null;
  transcript: Array<{ role: string; content: string }>;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  score: number;
  feedback: string;
  recommendations: string[];
}

export default function MyJourneyPage() {
  const [interviewReports, setInterviewReports] = useState<InterviewReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const { user, isLoaded } = useUser(); // Get user and loading state from Clerk

  useEffect(() => {
    // Only fetch reports when Clerk user is loaded
    if (!isLoaded) return;
    
    // If user is not authenticated, redirect to sign-in page
    if (!user) {
      window.location.href = "/sign-in";
      return;
    }

    const fetchReports = async () => {
      try {
        setLoading(true);
        // console.log("Fetching reports for user ID:", user.id);

        // Fetch interview reports for the current user only
        const { data: interviewData, error: interviewError } = await supabase
          .from('interview_reports')
          .select('*')
          .eq('user_id', user.id) // Filter by current user ID from Clerk
          .order('created_at', { ascending: false });

        if (interviewError) {
          console.error("Error fetching interview reports:", interviewError);
          throw new Error(interviewError.message || "Failed to fetch interview reports");
        }

        // console.log("Fetched reports:", reportsData);
        setInterviewReports(interviewData || []);
      } catch (err) {
        // Only set error if it's not because there are no reports yet
        // (Supabase returns an empty array when there are no matching records, not an error)
        setError("Unable to load reports. Please check your connection and try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user, isLoaded, supabase]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  if (loading || !isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800 whitespace-nowrap">
              ← Back to Home
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-center">My Learning Journey</h1>
            <div></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-lg">Loading your reports...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800 whitespace-nowrap">
              ← Back to Home
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-center">My Learning Journey</h1>
            <div></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Unable to Load Reports</h2>
              <p className="text-[#64748B] mb-6">We encountered an issue while loading your reports. This could be due to a network problem or server issue. Please try again later.</p>
              <Link href="/interview">
                <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg">
                  Start Practice
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
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800 whitespace-nowrap">
            ← Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-center">My Learning Journey</h1>
          <div className="flex gap-4">
            <Link href="/interview" className="text-blue-600 hover:text-blue-800 whitespace-nowrap">
              Practice
            </Link>
            <Link href="/companions" className="text-blue-600 hover:text-blue-800 whitespace-nowrap">
              Tutors
            </Link>
            <Link href="/stories" className="text-blue-600 hover:text-blue-800 whitespace-nowrap">
              Stories
            </Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          {/* Usage Limits Component */}
          <div className="mb-8">
            <UsageLimits />
          </div>
          
          {/* Tab Navigation - Only showing Interview Reports now */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 font-medium border-b-2 border-blue-500 text-blue-600`}
            >
              Interview Reports ({interviewReports.length})
            </button>
          </div>
          
          {interviewReports.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">No Interview Reports Yet</h2>
              <p className="text-gray-600 mb-6">
                Complete an interview to generate your first detailed report with feedback and recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/interview">
                  <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg">
                    Start Interview Practice
                  </button>
                </Link>
                <Link href="/companions">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg">
                    Try AI Tutors
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {interviewReports.map((report) => (
                <div key={report.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div>
                        <h2 className="text-xl font-bold">
                          {report.interview_type === "resume-based" 
                            ? "Resume-Based Interview" 
                            : report.interview_type === "companion-based"
                            ? `AI Tutor: ${report.topic}`
                            : report.topic}
                        </h2>
                        <p className="text-gray-600">
                          {formatDate(report.created_at)} • Score: {report.score}/100
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {report.interview_type === "resume-based" 
                            ? "Resume-Based" 
                            : report.interview_type === "companion-based"
                            ? "AI Tutor"
                            : "Topic-Based"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Score Visualization */}
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Overall Score</span>
                        <span className="text-sm font-bold">{report.score}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full" 
                          style={{ width: `${report.score}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Key highlights */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <h3 className="font-bold text-green-800 text-sm">Strengths</h3>
                        <p className="text-green-600 text-sm mt-1">{report.strengths.length} identified</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <h3 className="font-bold text-orange-800 text-sm">Improvements</h3>
                        <p className="text-orange-600 text-sm mt-1">{report.improvements.length} suggestions</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h3 className="font-bold text-blue-800 text-sm">Recommendations</h3>
                        <p className="text-blue-600 text-sm mt-1">{report.recommendations.length} provided</p>
                      </div>
                    </div>
                    
                    {/* View Report Button */}
                    <div className="mt-6">
                      <Link href={`/my-journey/report/${report.id}`}>
                        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg">
                          View Detailed Report
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}