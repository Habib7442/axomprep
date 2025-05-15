'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Trophy, Star, Wand2, CheckCircle, Award, Sparkles, Zap } from 'lucide-react'
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
    testStats: {
      totalTests: number
      passedTests: number
      bestScore: number
      averageScore: number
      recentTests: any[]
    }
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

  // Get house colors for styling
  const houseColor = houseColors[userHouse as keyof typeof houseColors];

  return (
    <div className="space-y-8 text-gray-800">
      <div>
        <h1 className="text-2xl font-bold mb-2 font-serif">Welcome back, {user?.user_metadata?.first_name || 'Wizard'}!</h1>
        <p className="text-gray-600 font-serif">Here&apos;s an overview of your magical learning progress</p>
      </div>



      {/* Test Statistics */}
      <div>
        <h2 className="text-xl font-bold mb-4 font-serif border-b-2 border-amber-800 pb-2 inline-block">Mock Test Performance</h2>
        <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden">
          <CardContent className="pt-6">
            {userProgress.testStats.totalTests > 0 ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-[#0c1220] rounded-lg p-4 border border-amber-800/30 text-center">
                    <BookOpen className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-amber-200 font-serif">Tests Taken</p>
                    <p className="text-2xl font-bold text-amber-50 font-serif">{userProgress.testStats.totalTests}</p>
                  </div>

                  <div className="bg-[#0c1220] rounded-lg p-4 border border-amber-800/30 text-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-green-200 font-serif">Tests Passed</p>
                    <p className="text-2xl font-bold text-green-50 font-serif">{userProgress.testStats.passedTests}</p>
                  </div>

                  <div className="bg-[#0c1220] rounded-lg p-4 border border-amber-800/30 text-center">
                    <Award className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-purple-200 font-serif">Best Score</p>
                    <p className="text-2xl font-bold text-purple-50 font-serif">{userProgress.testStats.bestScore}%</p>
                  </div>

                  <div className="bg-[#0c1220] rounded-lg p-4 border border-amber-800/30 text-center">
                    <Star className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-blue-200 font-serif">Average Score</p>
                    <p className="text-2xl font-bold text-blue-50 font-serif">{userProgress.testStats.averageScore}%</p>
                  </div>
                </div>

                {userProgress.testStats.recentTests.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-amber-50 font-serif mb-3">Recent Tests</h3>
                    <div className="space-y-3">
                      {userProgress.testStats.recentTests.map((test, index) => (
                        <div key={index} className="bg-[#0c1220] rounded-lg p-3 border border-amber-800/30">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-amber-50">
                                {test.test_id === 'railways/je/paper1'
                                  ? 'RRB JE Paper 1'
                                  : test.test_id.replace(/\//g, ' ')}
                              </h4>
                              <div className="flex items-center mt-1">
                                <Badge className={`mr-2 ${test.passed ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                  {test.passed ? 'Passed' : 'Failed'}
                                </Badge>
                                <span className="text-xs text-amber-200">
                                  Score: {test.score}/{test.total_marks}
                                </span>
                              </div>
                            </div>
                            <Link href={`/dashboard/test-details/${test.test_id.replace(/\//g, '-')}`}>
                              <Button className="bg-amber-600 hover:bg-amber-700 text-white border border-amber-800 text-xs px-3 py-1 h-auto">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <Link href="/dashboard/mock-tests">
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800">
                      Take More Tests
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-amber-50 font-serif mb-2">No Tests Taken Yet</h3>
                <p className="text-sm text-amber-200 mb-4 max-w-md mx-auto">
                  Take your first mock test to see your performance statistics and track your progress.
                </p>
                <Link href="/dashboard/mock-tests">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800">
                    Take Your First Test
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      <div>
        <h2 className="text-xl font-bold mb-4 font-serif border-b-2 border-amber-800 pb-2 inline-block">Your Magical Badges</h2>
        <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden">
          <CardContent className="pt-6">
            {userProgress.badges && userProgress.badges.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userProgress.badges.map((badge, index) => (
                  <div key={index} className="bg-[#0c1220] rounded-lg p-4 border border-amber-800/30 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-amber-700 flex items-center justify-center mr-3 text-amber-50">
                      {badge.icon === 'wand' && <Wand2 className="h-6 w-6" />}
                      {badge.icon === 'star' && <Star className="h-6 w-6" />}
                      {badge.icon === 'trophy' && <Trophy className="h-6 w-6" />}
                      {badge.icon === 'sparkles' && <Sparkles className="h-6 w-6" />}
                      {badge.icon === 'zap' && <Zap className="h-6 w-6" />}
                      {!badge.icon && <Award className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-50">{badge.name}</h3>
                      <p className="text-xs text-amber-200">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Award className="h-12 w-12 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-amber-50 font-serif mb-2">No Badges Yet</h3>
                <p className="text-sm text-amber-200 mb-4 max-w-md mx-auto">
                  Complete lessons and tests to earn magical badges that showcase your achievements.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommended Lessons - Styled as scrolls */}
      {/* <div>
        <h2 className="text-xl font-bold mb-4 font-serif border-b-2 border-amber-800 pb-2 inline-block">Recommended Next Steps</h2>
        <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-amber-50 font-serif">Introduction to Percentages</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-green-900 text-green-300">Beginner</span>
                    <span className="text-xs text-amber-200">30 min • Not started</span>
                  </div>
                  <p className="text-sm text-amber-200 mt-2 font-serif">Learn the basics of percentages and how to calculate them.</p>
                </div>
                <Link href="/dashboard/spellbooks/percentage">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800">
                    Start Lesson
                  </Button>
                </Link>
              </div>
              <div className="border-t border-amber-800/30 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-amber-50 font-serif">Percentage Change</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-amber-900 text-amber-300">Intermediate</span>
                      <span className="text-xs text-amber-200">45 min • Not started</span>
                    </div>
                    <p className="text-sm text-amber-200 mt-2 font-serif">Learn how to calculate percentage increase and decrease.</p>
                  </div>
                  <Link href="/dashboard/spellbooks/percentage-change">
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800">
                      Start Lesson
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}
