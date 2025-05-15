'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Loader2,
  Filter,
  BookOpen,
  GraduationCap,
  BarChart3,
  CheckCircle2,
  Clock
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { getAllMockTests, filterMockTests, examCategories, subjects, difficultyLevels } from '@/lib/mock-tests'

export default function MockTestsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const subjectParam = searchParams.get('subject')
  const difficultyParam = searchParams.get('difficulty')

  const [loading, setLoading] = useState(true)
  const [userResults, setUserResults] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'railways')
  const [selectedSubject, setSelectedSubject] = useState<string>(subjectParam || 'full-length')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(difficultyParam || 'all')
  const router = useRouter()
  const supabase = createClient()

  // Get all mock tests
  const allMockTests = getAllMockTests()

  // Filter mock tests based on selected filters
  const mockTests = filterMockTests(
    allMockTests,
    selectedCategory,
    selectedSubject,
    selectedDifficulty
  )

  useEffect(() => {
    async function fetchUserResults() {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Fetch user's mock test results
        const { data: results, error } = await supabase
          .from('mock_test_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (!error && results) {
          setUserResults(results)
        }
      } else {
        router.push('/login')
      }

      setLoading(false)
    }

    fetchUserResults()
  }, [router, supabase])

  // Check if user has passed a specific test
  const hasPassedTest = (testId: string) => {
    return userResults.some(result => result.test_id === testId && result.passed)
  }

  // Get the highest score for a specific test
  const getHighestScore = (testId: string) => {
    const testResults = userResults.filter(result => result.test_id === testId)
    if (testResults.length === 0) return null

    return testResults.reduce((max, result) =>
      result.score > max.score ? result : max, testResults[0])
  }

  // Check if user can attempt the next test
  const canAttemptTest = (testId: string, index: number) => {
    // Extract exam category from test ID (e.g., "ssc/mock-1" -> "ssc")
    const testCategory = testId.split('/')[0]

    // Get all tests for this category
    const categoryTests = mockTests.filter(test => test.id.startsWith(`${testCategory}/`))

    // Find the index of this test within its category
    const categoryIndex = categoryTests.findIndex(test => test.id === testId)

    // First test in a category is always available
    if (categoryIndex === 0) return true

    // For subsequent tests, check if user has passed the previous test in this category
    const previousTestId = categoryTests[categoryIndex - 1].id
    return hasPassedTest(previousTestId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        <span className="ml-2 text-amber-600">Loading mock tests...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-800 font-serif">Mock Tests</h1>
          <p className="text-amber-700 mt-2">
            Practice your magical mathematics skills with these enchanted mock tests.
            Pass each test to unlock the next challenge.
          </p>
        </div>
        <div className="flex space-x-2 self-start">
          <Link href="/profile">
            <Button variant="outline" className="border-2 border-amber-800 text-amber-800 hover:bg-amber-100 text-sm md:text-base">
              View Profile
            </Button>
          </Link>
          <Link href="/dashboard/leaderboard">
            <Button className="bg-amber-700 hover:bg-amber-800 text-white border-2 border-amber-900 font-medium text-sm md:text-base">
              View Leaderboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6 border-2 border-amber-800/30 bg-amber-50/80 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-amber-800 font-serif flex items-center">
            <Filter className="h-5 w-5 mr-2" /> Filter Mock Tests
          </CardTitle>
          <CardDescription className="text-amber-700">
            Select your exam category, subject, and difficulty level to find the perfect mock test
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-1">Exam Category</label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value)
                  // Update URL with new filter
                  const params = new URLSearchParams(searchParams.toString())
                  if (value && value !== 'all') {
                    params.set('category', value)
                  } else {
                    params.delete('category')
                  }
                  router.push(`/dashboard/mock-tests?${params.toString()}`)
                }}
              >
                <SelectTrigger className="border-amber-300 bg-white">
                  <SelectValue placeholder="Select Exam" />
                </SelectTrigger>
                <SelectContent>
                  {examCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-1">Subject</label>
              <Select
                value={selectedSubject}
                onValueChange={(value) => {
                  setSelectedSubject(value)
                  // Update URL with new filter
                  const params = new URLSearchParams(searchParams.toString())
                  if (value && value !== 'all') {
                    params.set('subject', value)
                  } else {
                    params.delete('subject')
                  }
                  router.push(`/dashboard/mock-tests?${params.toString()}`)
                }}
              >
                <SelectTrigger className="border-amber-300 bg-white">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-length">Full Length</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="reasoning">Reasoning</SelectItem>
                  <SelectItem value="general-knowledge">General Knowledge</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-1">Difficulty</label>
              <Select
                value={selectedDifficulty}
                onValueChange={(value) => {
                  setSelectedDifficulty(value)
                  // Update URL with new filter
                  const params = new URLSearchParams(searchParams.toString())
                  if (value && value !== 'all') {
                    params.set('difficulty', value)
                  } else {
                    params.delete('difficulty')
                  }
                  router.push(`/dashboard/mock-tests?${params.toString()}`)
                }}
              >
                <SelectTrigger className="border-amber-300 bg-white">
                  <SelectValue placeholder="All Difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active filters display */}
          {(selectedCategory !== 'railways' || selectedSubject !== 'full-length' || selectedDifficulty !== 'all') && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCategory !== 'railways' && (
                <Badge className="bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1">
                  Exam: {examCategories.find(c => c.id === selectedCategory)?.name}
                  <button
                    className="ml-2 text-amber-600 hover:text-amber-900"
                    onClick={() => {
                      setSelectedCategory('railways')
                      const params = new URLSearchParams(searchParams.toString())
                      params.set('category', 'railways')
                      router.push(`/dashboard/mock-tests?${params.toString()}`)
                    }}
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedSubject !== 'full-length' && (
                <Badge className="bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1">
                  Subject: {subjects.find(s => s.id === selectedSubject)?.name}
                  <button
                    className="ml-2 text-amber-600 hover:text-amber-900"
                    onClick={() => {
                      setSelectedSubject('full-length')
                      const params = new URLSearchParams(searchParams.toString())
                      params.set('subject', 'full-length')
                      router.push(`/dashboard/mock-tests?${params.toString()}`)
                    }}
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedDifficulty !== 'all' && (
                <Badge className="bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1">
                  Difficulty: {difficultyLevels.find(d => d.id === selectedDifficulty)?.name}
                  <button
                    className="ml-2 text-amber-600 hover:text-amber-900"
                    onClick={() => {
                      setSelectedDifficulty('all')
                      const params = new URLSearchParams(searchParams.toString())
                      params.delete('difficulty')
                      router.push(`/dashboard/mock-tests?${params.toString()}`)
                    }}
                  >
                    ×
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                className="text-amber-600 hover:text-amber-900 hover:bg-amber-100 h-7 px-2 py-0 text-xs"
                onClick={() => {
                  setSelectedCategory('railways')
                  setSelectedSubject('full-length')
                  setSelectedDifficulty('all')
                  router.push('/dashboard/mock-tests?category=railways&subject=full-length')
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="available">Available Tests</TabsTrigger>
          <TabsTrigger value="results">Your Results</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTests.map((test, index) => {
              const highestScore = getHighestScore(test.id)
              const canAttempt = canAttemptTest(test.id, index)
              const hasPassed = hasPassedTest(test.id)

              return (
                <Card key={test.id} className="border-2 border-amber-800/30 bg-amber-50/80 overflow-hidden relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-800/10 rounded-full -mt-12 -mr-12"></div>

                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-amber-800 font-serif">{test.name}</CardTitle>
                        <CardDescription className="text-amber-700 mt-1">{test.description}</CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`${
                          test.difficulty === 'beginner' ? 'bg-green-700' :
                          test.difficulty === 'intermediate' ? 'bg-amber-700' :
                          'bg-red-700'
                        }`}>
                          {test.difficulty}
                        </Badge>
                        <Badge className="bg-blue-700">{test.subject}</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center mb-4">
                      <Badge variant="outline" className="border-amber-800 text-amber-800 mr-2">
                        {test.category}
                      </Badge>
                      <span className="text-sm text-amber-700">
                        {test.date} • Shift {test.shift}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                      <div className="flex flex-col items-center p-2 bg-amber-100/50 rounded-lg border border-amber-200">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-700 mb-1" />
                        <p className="text-amber-800 font-medium">Time</p>
                        <p className="font-bold text-amber-900">{test.timeLimit} min</p>
                      </div>

                      <div className="flex flex-col items-center p-2 bg-amber-100/50 rounded-lg border border-amber-200">
                        <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-amber-700 mb-1" />
                        <p className="text-amber-800 font-medium">Marks</p>
                        <p className="font-bold text-amber-900">{test.totalMarks}</p>
                      </div>

                      <div className="flex flex-col items-center p-2 bg-amber-100/50 rounded-lg border border-amber-200">
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-amber-700 mb-1" />
                        <p className="text-amber-800 font-medium">Pass</p>
                        <p className="font-bold text-amber-900">{test.passingMarks}</p>
                      </div>

                      <div className="flex flex-col items-center p-2 bg-amber-100/50 rounded-lg border border-amber-200">
                        <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-amber-700 mb-1" />
                        <p className="text-amber-800 font-medium">Subject</p>
                        <p className="font-bold text-amber-900 truncate w-full text-center">{test.subject}</p>
                      </div>
                    </div>

                    {highestScore && (
                      <div className="mt-4 p-3 bg-amber-100 rounded-md border border-amber-300">
                        <p className="text-amber-800 font-medium">Your Highest Score</p>
                        <p className="text-lg font-bold text-amber-900">
                          {highestScore.score}/{test.totalMarks}
                          <span className="text-sm font-normal ml-2">
                            ({Math.round((highestScore.score / test.totalMarks) * 100)}%)
                          </span>
                        </p>
                        <p className="text-sm text-amber-700 mt-1">
                          {highestScore.passed ? 'Passed' : 'Not Passed'} •
                          {new Date(highestScore.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="border-t border-amber-800/30 pt-4">
                    {canAttempt ? (
                      <Link href={`/dashboard/mock-tests/${test.id.replace(/\//g, '-')}`} className="w-full">
                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium">
                          {hasPassed ? 'Retake Test' : 'Start Test'}
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled className="w-full bg-gray-400 text-white border-2 border-gray-500 font-medium cursor-not-allowed">
                        {(() => {
                          const testCategory = test.id.split('/')[0]
                          const categoryTests = mockTests.filter(t => t.id.startsWith(`${testCategory}/`))
                          const categoryIndex = categoryTests.findIndex(t => t.id === test.id)
                          if (categoryIndex > 0) {
                            const previousTest = categoryTests[categoryIndex - 1]
                            return `Pass ${previousTest.name} to Unlock`
                          }
                          return 'Pass Previous Test to Unlock'
                        })()}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="results">
          {userResults.length > 0 ? (
            <div>
              <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-2 border-amber-800/30 bg-amber-50/80">
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <BookOpen className="h-5 w-5 text-amber-800" />
                      </div>
                      <div>
                        <p className="text-sm text-amber-700">Total Tests Taken</p>
                        <p className="text-2xl font-bold text-amber-900">{userResults.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-amber-800/30 bg-amber-50/80">
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <CheckCircle2 className="h-5 w-5 text-green-800" />
                      </div>
                      <div>
                        <p className="text-sm text-amber-700">Tests Passed</p>
                        <p className="text-2xl font-bold text-green-700">
                          {userResults.filter(r => r.passed).length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-amber-800/30 bg-amber-50/80">
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <BarChart3 className="h-5 w-5 text-blue-800" />
                      </div>
                      <div>
                        <p className="text-sm text-amber-700">Average Score</p>
                        <p className="text-2xl font-bold text-blue-700">
                          {Math.round(userResults.reduce((sum, r) => sum + r.score, 0) / userResults.length)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-amber-800/30 bg-amber-50/80">
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <Clock className="h-5 w-5 text-purple-800" />
                      </div>
                      <div>
                        <p className="text-sm text-amber-700">Average Time</p>
                        <p className="text-2xl font-bold text-purple-700">
                          {Math.floor(userResults.reduce((sum, r) => sum + r.time_taken, 0) / userResults.length / 60)}m
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-100/50 border-2 border-amber-800/30 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-amber-800 text-amber-50">
                        <th className="px-4 py-3 text-left">Test Name</th>
                        <th className="px-4 py-3 text-center">Category</th>
                        <th className="px-4 py-3 text-center">Subject</th>
                        <th className="px-4 py-3 text-center">Date</th>
                        <th className="px-4 py-3 text-center">Score</th>
                        <th className="px-4 py-3 text-center">Correct</th>
                        <th className="px-4 py-3 text-center">Incorrect</th>
                        <th className="px-4 py-3 text-center">Time Taken</th>
                        <th className="px-4 py-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userResults.map((result, index) => {
                        const testInfo = allMockTests.find(t => t.id === result.test_id) || {
                          name: result.test_id,
                          totalMarks: result.total_marks,
                          category: 'Unknown',
                          subject: 'Unknown'
                        }

                        return (
                          <tr key={result.id} className={index % 2 === 0 ? 'bg-amber-50' : 'bg-amber-100/50'}>
                            <td className="px-4 py-3 font-medium text-amber-900">{testInfo.name}</td>
                            <td className="px-4 py-3 text-center text-amber-800">{testInfo.category}</td>
                            <td className="px-4 py-3 text-center text-amber-800">{testInfo.subject}</td>
                            <td className="px-4 py-3 text-center text-amber-800">
                              {new Date(result.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-center font-medium text-amber-900">
                              {result.score}/{testInfo.totalMarks}
                            </td>
                            <td className="px-4 py-3 text-center text-green-700">{result.correct_answers}</td>
                            <td className="px-4 py-3 text-center text-red-700">{result.incorrect_answers}</td>
                            <td className="px-4 py-3 text-center text-amber-800">
                              {Math.floor(result.time_taken / 60)}m {result.time_taken % 60}s
                            </td>
                            <td className="px-4 py-3 text-center">
                              <Badge className={result.passed ? 'bg-green-700' : 'bg-red-700'}>
                                {result.passed ? 'Passed' : 'Failed'}
                              </Badge>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-amber-100/50 border-2 border-amber-800/30 rounded-lg">
              <BookOpen className="h-12 w-12 text-amber-600 mx-auto mb-3" />
              <p className="text-amber-800 text-lg">You haven't taken any mock tests yet.</p>
              <p className="text-amber-700 mt-2 mb-4">Complete a test to see your results here.</p>
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800"
                onClick={() => document.querySelector('[data-value="available"]')?.click()}
              >
                Browse Available Tests
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
