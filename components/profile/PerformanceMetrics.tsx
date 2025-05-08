'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BookOpen, CheckCircle, XCircle, TrendingUp, Award, Clock } from 'lucide-react'

interface PerformanceMetricsProps {
  totalTests: number
  passedTests: number
  averageScore: number
  highestScore: number
  passRate: number
  averageTime: number
}

export default function PerformanceMetrics({
  totalTests,
  passedTests,
  averageScore,
  highestScore,
  passRate,
  averageTime
}: PerformanceMetricsProps) {
  // Format time in minutes and seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-6">
        <div className="bg-amber-50 p-3 sm:p-4 rounded-lg border border-amber-200">
          <div className="flex items-start">
            <div className="bg-amber-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-4">
              <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-amber-800" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-amber-800 font-medium">Total Tests</p>
              <p className="text-lg sm:text-2xl font-bold text-amber-900">{totalTests}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
          <div className="flex items-start">
            <div className="bg-green-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-4">
              <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-800" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-green-800 font-medium">Tests Passed</p>
              <p className="text-lg sm:text-2xl font-bold text-green-900">{passedTests}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-4">
              <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-blue-800" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-blue-800 font-medium">Average Score</p>
              <p className="text-lg sm:text-2xl font-bold text-blue-900">{averageScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
          <div className="flex items-start">
            <div className="bg-purple-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-4">
              <Award className="h-4 w-4 sm:h-6 sm:w-6 text-purple-800" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-purple-800 font-medium">Highest Score</p>
              <p className="text-lg sm:text-2xl font-bold text-purple-900">{highestScore}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <h3 className="text-base sm:text-lg font-medium text-amber-800 mb-2 sm:mb-3">Pass Rate</h3>
        <div className="bg-gray-100 rounded-full h-3 sm:h-4 mb-1 sm:mb-2">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-700 h-3 sm:h-4 rounded-full"
            style={{ width: `${passRate}%` }}
          ></div>
        </div>
        <p className="text-xs sm:text-sm text-gray-600">{passRate}% of tests passed</p>
      </div>

      <div className="mt-4 sm:mt-6">
        <h3 className="text-base sm:text-lg font-medium text-amber-800 mb-2 sm:mb-3">Average Time per Test</h3>
        <div className="flex items-center">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-800 mr-2" />
          <span className="text-base sm:text-lg font-medium">{formatTime(averageTime)}</span>
        </div>
      </div>
    </div>
  )
}
