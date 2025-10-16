"use client";

import React from "react";
import Link from "next/link";

const LimitReachedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <svg 
                className="h-10 w-10 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Usage Limit Reached</h2>
            <p className="mt-2 text-gray-600">
              You&apos;ve reached your monthly limit for your current plan.
            </p>
          </div>

          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-red-800">Current Plan Limits:</h3>
            <ul className="mt-2 space-y-1 text-red-700">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                3 AI Tutors
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                10 Interviews per month
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <p className="text-gray-600 text-center">
              Upgrade to a higher plan to continue enjoying our services without limits.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link 
              href="/subscription" 
              className="flex-1 bg-gradient-to-r from-[#FF6B35] to-[#FF914D] hover:from-[#FF844B] hover:to-[#FFB088] text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg text-center"
            >
              Upgrade Plan
            </Link>
            <Link 
              href="/my-journey" 
              className="flex-1 bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-center"
            >
              View Usage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitReachedPage;