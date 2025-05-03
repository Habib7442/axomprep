'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Left side - Features */}
        <div className="text-white space-y-10 py-8 hidden md:block">
          <div className="flex items-center mb-8">
            <svg className="h-8 w-8 text-yellow-400 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 10h2v2h-2v-2zm0-6h2v4h-2v-4z" />
            </svg>
            <h1 className="text-2xl font-bold">MathQuest</h1>
          </div>

          <h2 className="text-3xl font-bold">Start your learning journey</h2>
          <p className="text-gray-400 text-sm">No credit card required</p>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-yellow-400 rounded-full p-2 mr-4">
                <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Learn at your own pace</h3>
                <p className="text-gray-400 text-sm">Interactive lessons designed for students in grades 8-12.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-yellow-400 rounded-full p-2 mr-4">
                <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Track your progress</h3>
                <p className="text-gray-400 text-sm">Earn XP and badges as you complete lessons and solve problems.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-yellow-400 rounded-full p-2 mr-4">
                <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Gamified learning</h3>
                <p className="text-gray-400 text-sm">Make learning math fun with interactive challenges and rewards.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="bg-gray-800 rounded-lg p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
