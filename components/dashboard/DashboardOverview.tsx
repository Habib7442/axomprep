'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

interface DashboardOverviewProps {
  user: any
  userProgress: {
    xp: number
    level: number
    completedLessons: number
    totalLessons: number
    completedProblems: number
    totalProblems: number
    badges: any[]
  }
}

export default function DashboardOverview({ user, userProgress }: DashboardOverviewProps) {
  // Determine user's Hogwarts house (in a real app, this would come from the user profile)
  const userHouse = user?.user_metadata?.house || 'slytherin';

  // House-specific colors and styles
  const houseColors = {
    gryffindor: {
      primary: 'bg-[#740001]',
      secondary: 'bg-[#D3A625]',
      text: 'text-[#D3A625]',
      border: 'border-[#D3A625]',
      hover: 'hover:bg-[#9E0001]',
      accent: 'from-[#740001] to-[#AE0001]'
    },
    slytherin: {
      primary: 'bg-[#1A472A]',
      secondary: 'bg-[#5D5D5D]',
      text: 'text-[#AAAAAA]',
      border: 'border-[#AAAAAA]',
      hover: 'hover:bg-[#2A573A]',
      accent: 'from-[#1A472A] to-[#2A573A]'
    },
    ravenclaw: {
      primary: 'bg-[#0E1A40]',
      secondary: 'bg-[#946B2D]',
      text: 'text-[#946B2D]',
      border: 'border-[#946B2D]',
      hover: 'hover:bg-[#1E2A50]',
      accent: 'from-[#0E1A40] to-[#1E2A50]'
    },
    hufflepuff: {
      primary: 'bg-[#ECB939]',
      secondary: 'bg-[#372E29]',
      text: 'text-[#372E29]',
      border: 'border-[#372E29]',
      hover: 'hover:bg-[#FFC949]',
      accent: 'from-[#ECB939] to-[#FFC949]'
    }
  };

  const colors = houseColors[userHouse as keyof typeof houseColors];

  return (
    <div className="space-y-8 text-gray-800">
      <div>
        <h1 className="text-2xl font-bold mb-2 font-serif">Welcome back, {user?.user_metadata?.first_name || 'Wizard'}!</h1>
        <p className="text-gray-600 font-serif">Here's an overview of your magical learning progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* XP and Level - Styled as a magical artifact */}
        <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden">
          <CardHeader className="pb-2 border-b border-amber-800/30">
            <CardTitle className="text-lg font-serif">Experience</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-400 rounded-full p-3 shadow-inner shadow-amber-600">
                <svg className="h-6 w-6 text-[#1a2639]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.5 1.5c-1.7 0-3 1.3-3 3v1.9L7 8.9v1.6c0 .5.4.9.9.9h.6v7.2c0 .5.4.9.9.9h6.1c.5 0 .9-.4.9-.9v-7.2h.6c.5 0 .9-.4.9-.9V8.9l-2.5-2.5V4.5c0-1.7-1.3-3-3-3z"/>
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-amber-200 font-serif">Current XP</p>
                <p className="text-3xl font-bold text-amber-50 font-serif">{userProgress.xp}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-amber-200 font-serif">Level {userProgress.level}</p>
              <div className="h-2 mt-2 bg-[#0c1220] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 w-0"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lesson Progress - Styled as a spellbook */}
        <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden">
          <CardHeader className="pb-2 border-b border-amber-800/30">
            <CardTitle className="text-lg font-serif">Spellbooks</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-emerald-600 rounded-full p-3 shadow-inner shadow-emerald-800">
                <svg className="h-6 w-6 text-amber-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-amber-200 font-serif">Mastered</p>
                <p className="text-3xl font-bold text-amber-50 font-serif">{userProgress.completedLessons}/{userProgress.totalLessons}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-amber-200 font-serif">Progress</p>
              <div className="h-2 mt-2 bg-[#0c1220] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                  style={{ width: `${(userProgress.completedLessons / userProgress.totalLessons) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problem Progress - Styled as a potion */}
        <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden">
          <CardHeader className="pb-2 border-b border-amber-800/30">
            <CardTitle className="text-lg font-serif">Magical Problems</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-full p-3 shadow-inner shadow-blue-700">
                <svg className="h-6 w-6 text-amber-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-amber-200 font-serif">Solved</p>
                <p className="text-3xl font-bold text-amber-50 font-serif">{userProgress.completedProblems}/{userProgress.totalProblems}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-amber-200 font-serif">Progress</p>
              <div className="h-2 mt-2 bg-[#0c1220] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-600"
                  style={{ width: `${(userProgress.completedProblems / userProgress.totalProblems) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Lessons - Styled as scrolls */}
      <div>
        <h2 className="text-xl font-bold mb-4 font-serif border-b-2 border-amber-800 pb-2 inline-block">Recommended Next Steps</h2>
        <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-amber-50 font-serif">Introduction to Linear Equations</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-green-900 text-green-300">Beginner</span>
                    <span className="text-xs text-amber-200">30 min • Not started</span>
                  </div>
                  <p className="text-sm text-amber-200 mt-2 font-serif">Learn the basics of linear equations and how to solve them.</p>
                </div>
                <Link href="/dashboard/lesson/1">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800">
                    Start Lesson
                  </Button>
                </Link>
              </div>
              <div className="border-t border-amber-800/30 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-amber-50 font-serif">Solving Systems of Equations</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-amber-900 text-amber-300">Intermediate</span>
                      <span className="text-xs text-amber-200">45 min • Not started</span>
                    </div>
                    <p className="text-sm text-amber-200 mt-2 font-serif">Learn how to solve systems of linear equations.</p>
                  </div>
                  <Link href="/dashboard/lesson/2">
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800">
                      Start Lesson
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
