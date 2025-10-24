"use client";

import React, { useState, useEffect } from "react";
import { PlanFeatures, PlanType } from "@/lib/billing";
import Link from "next/link";
import { checkUserTrialStatus } from "@/lib/actions/companion.actions";

const UsageLimits = () => {
  const [plan, setPlan] = useState<PlanType>('free');
  const [features, setFeatures] = useState<PlanFeatures | null>(null);
  const [usage, setUsage] = useState<{ companions: number; interviews: number; stories: number }>({ companions: 0, interviews: 0, stories: 0 });
  const [loading, setLoading] = useState(true);
  const [trialInfo, setTrialInfo] = useState<{ hasTrial: boolean; isActive: boolean; daysRemaining?: number } | null>(null);

  useEffect(() => {
    const fetchUsageData = async () => {
      try {
        // Fetch all billing data from API
        const [planResponse, featuresResponse] = await Promise.all([
          fetch('/api/billing?action=plan'),
          fetch('/api/billing?action=features')
        ]);

        const planData = await planResponse.json();
        const featuresData = await featuresResponse.json();
        
        // For usage, we need to make separate calls since it's more complex
        const [companionsResponse, interviewsResponse] = await Promise.all([
          fetch('/api/billing?action=companions-count'),
          fetch('/api/billing?action=interviews-count')
          // Removed stories-count fetch since we're not displaying story usage
        ]);

        const companionsData = await companionsResponse.json();
        const interviewsData = await interviewsResponse.json();
        // Removed storiesData since we're not displaying story usage

        setPlan(planData.plan);
        setFeatures(featuresData.features);
        setUsage({
          companions: companionsData.count || 0,
          interviews: interviewsData.count || 0,
          // Set stories to 0 since we're not displaying story usage
          stories: 0
        });

        // Check trial status
        try {
          const trialData = await checkUserTrialStatus();
          setTrialInfo(trialData);
        } catch (trialError) {
          console.error("Error fetching trial info:", trialError);
        }
      } catch (error) {
        console.error("Error fetching usage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsageData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Get plan display name
  const getPlanDisplayName = () => {
    switch (plan) {
      case 'free': return 'Free';
      case 'basic': return 'Basic Core Learner';
      case 'pro': return 'Pro Companion';
      default: return 'Free';
    }
  };

  // Get plan color
  const getPlanColor = () => {
    switch (plan) {
      case 'free': return 'bg-gray-100 text-gray-800';
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'pro': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Your Usage</h2>
          <p className="text-gray-600">Track your plan limits and usage</p>
        </div>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${getPlanColor()}`}>
          {getPlanDisplayName()}
        </span>
      </div>

      {/* Trial Information */}
      {trialInfo?.hasTrial && trialInfo?.isActive && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-800 font-medium">
              {trialInfo.daysRemaining} days left in your free trial
            </span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            During your trial: 3 AI Tutors and 10 Interviews per month
          </p>
        </div>
      )}

      <div className="space-y-5">
        {/* Companions Usage */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">AI Tutors</span>
            <span className="text-sm text-gray-500">
              {usage.companions} / {features?.companionsLimit || 0}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#FF6B35] to-[#FF914D] h-2 rounded-full" 
              style={{ width: `${Math.min(100, (usage.companions / (features?.companionsLimit || 1)) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Interview Practice Usage */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Interviews (This Month)</span>
            <span className="text-sm text-gray-500">
              {usage.interviews} / {features?.interviewsPerMonth || 0}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#FF6B35] to-[#FF914D] h-2 rounded-full" 
              style={{ width: `${Math.min(100, (usage.interviews / (features?.interviewsPerMonth || 1)) * 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Removed Stories Usage section since we're not displaying story usage */}
      </div>

      {plan !== 'pro' && !trialInfo?.isActive && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/subscription" 
              className="flex-1 bg-gradient-to-r from-[#FF6B35] to-[#FF914D] hover:from-[#FF844B] hover:to-[#FFB088] text-white font-semibold py-2.5 px-4 rounded-lg shadow-lg transition-all duration-300 text-center text-sm"
            >
              Upgrade Plan
            </Link>
            <Link 
              href="/companions" 
              className="flex-1 bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-center text-sm"
            >
              View AI Tutors
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageLimits;