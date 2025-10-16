"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Define the trial info type
interface TrialInfo {
  hasTrial: boolean;
  isActive: boolean;
  daysRemaining?: number;
  trialStartDate?: string;
  trialEndDate?: string;
  message?: string;
}

const TrialTestPage = () => {
  const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    fetchTrialInfo();
  }, []);

  const fetchTrialInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/trial');
      const data = await response.json();
      setTrialInfo(data);
    } catch (error) {
      console.error("Error fetching trial info:", error);
    } finally {
      setLoading(false);
    }
  };

  const initializeTrial = async () => {
    try {
      setInitializing(true);
      const response = await fetch('/api/user/trial', { method: 'POST' });
      const data = await response.json();
      setTrialInfo(data);
      
      // Refresh the info after initialization
      setTimeout(fetchTrialInfo, 1000);
    } catch (error) {
      console.error("Error initializing trial:", error);
    } finally {
      setInitializing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trial Test Page</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Trial Status</h2>
          
          {trialInfo?.hasTrial ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-800 mb-2">Trial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className={`font-semibold ${trialInfo.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {trialInfo.isActive ? 'Active' : 'Expired'}
                    </p>
                  </div>
                  {trialInfo.daysRemaining !== undefined && (
                    <div>
                      <p className="text-sm text-gray-600">Days Remaining</p>
                      <p className="font-semibold text-gray-900">{trialInfo.daysRemaining}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(trialInfo.trialStartDate || '').toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">End Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(trialInfo.trialEndDate || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-bold text-yellow-800 mb-2">No Active Trial</h3>
              <p className="text-yellow-700">
                You don&apos;t currently have an active trial. Initialize one to get 7 days of unlimited access.
              </p>
            </div>
          )}

          <div className="mt-8">
            <button
              onClick={initializeTrial}
              disabled={initializing}
              className={`px-6 py-3 rounded-lg font-semibold text-white ${
                initializing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
            >
              {initializing ? 'Initializing...' : 'Initialize 7-Day Trial'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Test Interview Access</h2>
          <p className="text-gray-700 mb-6">
            Try starting an interview to see if your trial provides unlimited access.
          </p>
          <Link href="/interview">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
              Go to Interview Practice
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrialTestPage;