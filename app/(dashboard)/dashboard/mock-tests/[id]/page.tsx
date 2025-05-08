'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Loader2, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import sscCGLMockTest from '@/public/maths-mock/ssc/mock-1'
import { use } from 'react'

export default function MockTestPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const supabase = createClient()

  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  // Replace hyphens with slashes to match the original test ID format
  const testId = unwrappedParams.id.replace('-', '/')

  // State variables
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [testStarted, setTestStarted] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)

  // Get the test data
  const mockTest = sscCGLMockTest

  // Initialize timer
  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)
      setLoading(false)
    }

    checkAuth()
  }, [router, supabase])

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (testStarted && !testCompleted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            submitTest()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [testStarted, testCompleted, timeRemaining])

  // Start the test
  const startTest = () => {
    setTimeRemaining(mockTest.timeLimit * 60) // Convert minutes to seconds
    setTestStarted(true)
  }

  // Handle answer selection
  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < mockTest.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  // Navigate to previous question
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  // Navigate to a specific question
  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  // Calculate test results
  const calculateResults = useCallback(() => {
    let correctAnswers = 0
    let incorrectAnswers = 0
    let unattempted = 0

    mockTest.questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id]

      if (!userAnswer) {
        unattempted++
      } else if (userAnswer === question.answer) {
        correctAnswers++
      } else {
        incorrectAnswers++
      }
    })

    // Calculate score with negative marking
    const marksPerQuestion = mockTest.totalMarks / mockTest.questions.length
    const score = (correctAnswers * marksPerQuestion) - (incorrectAnswers * mockTest.negativeMarking)
    const totalScore = Math.max(0, Math.round(score))

    // Check if passed
    const passed = totalScore >= mockTest.passingMarks

    return {
      correctAnswers,
      incorrectAnswers,
      unattempted,
      score: totalScore,
      totalMarks: mockTest.totalMarks,
      passed,
      timeTaken: mockTest.timeLimit * 60 - timeRemaining
    }
  }, [selectedAnswers, mockTest, timeRemaining])

  // Submit the test
  const submitTest = useCallback(async () => {
    if (testCompleted || submitting) return

    setSubmitting(true)

    const results = calculateResults()
    setTestResults(results)
    setTestCompleted(true)

    // Save results to Supabase
    if (user) {
      try {
        console.log('Saving test results to Supabase:', {
          user_id: user.id,
          test_id: testId,
          score: results.score,
          total_marks: results.totalMarks,
          correct_answers: results.correctAnswers,
          incorrect_answers: results.incorrectAnswers,
          unattempted: results.unattempted,
          time_taken: results.timeTaken,
          passed: results.passed
        })

        const { data, error } = await supabase.from('mock_test_results').insert({
          user_id: user.id,
          test_id: testId,
          score: results.score,
          total_marks: results.totalMarks,
          correct_answers: results.correctAnswers,
          incorrect_answers: results.incorrectAnswers,
          unattempted: results.unattempted,
          time_taken: results.timeTaken,
          passed: results.passed
        }).select()

        if (error) {
          console.error('Error saving test results:', error)
          alert(`Failed to save test results: ${error.message}. Please take a screenshot of your results.`)
        } else {
          console.log('Test results saved successfully:', data)
        }
      } catch (error) {
        console.error('Exception saving test results:', error)
        alert(`An unexpected error occurred: ${error}. Please take a screenshot of your results.`)
      }
    } else {
      console.error('No user found when trying to save results')
    }

    setSubmitting(false)
  }, [testCompleted, submitting, calculateResults, user, supabase, testId])

  // Confirm before submitting
  const confirmSubmit = () => {
    if (window.confirm('Are you sure you want to submit your test? You cannot change your answers after submission.')) {
      submitTest()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        <span className="ml-2 text-amber-600">Loading test...</span>
      </div>
    )
  }

  // Render test instructions before starting
  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-amber-800 font-serif">{mockTest.name} Mock Test</h1>
          <p className="text-amber-700 mt-2">
            Date: {mockTest.date} • Shift: {mockTest.shift}
          </p>
        </div>

        <Card className="border-2 border-amber-800/30 bg-amber-50/80 p-6">
          <h2 className="text-xl font-bold text-amber-800 mb-4">Test Instructions</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-amber-800">Total Questions</p>
                <p>{mockTest.questions.length}</p>
              </div>
              <div>
                <p className="font-medium text-amber-800">Total Marks</p>
                <p>{mockTest.totalMarks}</p>
              </div>
              <div>
                <p className="font-medium text-amber-800">Time Limit</p>
                <p>{mockTest.timeLimit} minutes</p>
              </div>
              <div>
                <p className="font-medium text-amber-800">Passing Marks</p>
                <p>{mockTest.passingMarks}</p>
              </div>
            </div>

            <div className="bg-amber-100 p-4 rounded-md border border-amber-300">
              <h3 className="font-medium text-amber-800 mb-2">Important Notes:</h3>
              <ul className="list-disc list-inside space-y-1 text-amber-700">
                <li>Each question carries {Math.round((mockTest.totalMarks / mockTest.questions.length) * 10) / 10} marks.</li>
                <li>There is a negative marking of {mockTest.negativeMarking} marks for each wrong answer.</li>
                <li>The timer will start as soon as you begin the test.</li>
                <li>You can navigate between questions using the navigation buttons.</li>
                <li>You must score at least {mockTest.passingMarks} marks to pass this test.</li>
                <li>Once you submit the test, you cannot change your answers.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={startTest}
              className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium px-8 py-2"
            >
              Start Test
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Render test results after completion
  if (testCompleted && testResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-amber-800 font-serif">Test Results</h1>
          <p className="text-amber-700 mt-2">
            {mockTest.name} • {mockTest.date} • Shift: {mockTest.shift}
          </p>
          <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded-md text-green-800 text-sm">
            Your test results have been saved. You can view your performance in your profile.
          </div>
        </div>

        <Card className="border-2 border-amber-800/30 bg-amber-50/80 p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-amber-800 mb-2">
              Your Score: {testResults.score}/{testResults.totalMarks}
            </h2>
            <Badge className={testResults.passed ? 'bg-green-700 text-white px-3 py-1' : 'bg-red-700 text-white px-3 py-1'}>
              {testResults.passed ? 'PASSED' : 'FAILED'}
            </Badge>
            <p className="text-amber-700 mt-2">
              Time Taken: {Math.floor(testResults.timeTaken / 60)}m {testResults.timeTaken % 60}s
            </p>
            <div className="mt-3 text-sm text-amber-800 bg-amber-50 p-3 rounded-md border border-amber-200 inline-block">
              <p>Scoring: ({testResults.correctAnswers} × {Math.round((mockTest.totalMarks / mockTest.questions.length) * 10) / 10}) - ({testResults.incorrectAnswers} × {mockTest.negativeMarking}) = {testResults.score}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded-md border border-green-300 text-center">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <p className="font-medium text-green-800">Correct Answers</p>
              <p className="text-2xl font-bold text-green-700">{testResults.correctAnswers}</p>
            </div>

            <div className="bg-red-100 p-4 rounded-md border border-red-300 text-center">
              <XCircle className="h-6 w-6 text-red-600 mx-auto mb-1" />
              <p className="font-medium text-red-800">Incorrect Answers</p>
              <p className="text-2xl font-bold text-red-700">{testResults.incorrectAnswers}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md border border-gray-300 text-center">
              <AlertCircle className="h-6 w-6 text-gray-600 mx-auto mb-1" />
              <p className="font-medium text-gray-800">Unattempted</p>
              <p className="text-2xl font-bold text-gray-700">{testResults.unattempted}</p>
            </div>
          </div>

          <div className="space-y-6 mt-8">
            <h3 className="text-xl font-bold text-amber-800 mb-4">Question Analysis</h3>

            {mockTest.questions.map((question, index) => {
              const userAnswer = selectedAnswers[question.id]
              const isCorrect = userAnswer === question.answer
              const isUnattempted = !userAnswer

              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-md border ${
                    isUnattempted ? 'bg-gray-100 border-gray-300' :
                    isCorrect ? 'bg-green-100 border-green-300' :
                    'bg-red-100 border-red-300'
                  }`}
                >
                  <div className="flex items-start">
                    <span className="font-medium mr-2">{index + 1}.</span>
                    <div>
                      <p className="font-medium">{question.question}</p>

                      <div className="mt-2 space-y-1">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`flex items-center p-2 rounded ${
                              option === question.answer ? 'bg-green-200 border border-green-400' :
                              option === userAnswer ? 'bg-red-200 border border-red-400' :
                              'bg-transparent'
                            }`}
                          >
                            <span className="mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                            <span>{option}</span>

                            {option === question.answer && (
                              <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                            )}

                            {option === userAnswer && option !== question.answer && (
                              <XCircle className="h-4 w-4 text-red-600 ml-auto" />
                            )}
                          </div>
                        ))}
                      </div>

                      {isUnattempted && (
                        <p className="text-gray-700 mt-2">
                          <AlertCircle className="h-4 w-4 inline mr-1" />
                          You did not attempt this question
                        </p>
                      )}

                      {!isUnattempted && !isCorrect && (
                        <p className="text-red-700 mt-2">
                          <XCircle className="h-4 w-4 inline mr-1" />
                          Your answer: {userAnswer}
                        </p>
                      )}

                      {!isUnattempted && (
                        <p className="text-green-700 mt-2">
                          <CheckCircle className="h-4 w-4 inline mr-1" />
                          Correct answer: {question.answer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/dashboard/mock-tests">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium">
                Back to Mock Tests
              </Button>
            </Link>
            <Link href="/profile">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white border-2 border-amber-900 font-medium">
                View Profile
              </Button>
            </Link>
            <Link href="/dashboard/leaderboard">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white border-2 border-amber-900 font-medium">
                View Leaderboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  // Render the test
  const currentQuestion = mockTest.questions[currentQuestionIndex]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Test header with timer and progress */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-xl font-bold text-amber-800 font-serif">{mockTest.name}</h1>

        <div className="flex items-center space-x-2 sm:space-x-4 self-end sm:self-auto">
          <div className={`flex items-center ${timeRemaining < 60 ? 'text-red-600' : 'text-amber-700'}`}>
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
            <span className="font-mono font-medium text-sm sm:text-base">{formatTime(timeRemaining)}</span>
          </div>

          <Button
            onClick={confirmSubmit}
            className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium text-xs sm:text-sm py-1 h-8 sm:h-10"
          >
            Submit Test
          </Button>
        </div>
      </div>

      <Progress
        value={(currentQuestionIndex + 1) / mockTest.questions.length * 100}
        className="h-2 mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {/* Question navigation sidebar */}
        <div className="md:col-span-1 order-2 md:order-1">
          <Card className="border-2 border-amber-800/30 bg-amber-50/80 p-3 md:p-4">
            <h2 className="text-xs md:text-sm font-medium text-amber-800 mb-2 md:mb-3">Question Navigation</h2>

            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-5 gap-1 md:gap-2">
              {mockTest.questions.map((q, index) => {
                const isAnswered = !!selectedAnswers[q.id]
                const isCurrent = index === currentQuestionIndex

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(index)}
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-md flex items-center justify-center text-xs md:text-sm font-medium ${
                      isCurrent ? 'bg-amber-600 text-white border-2 border-amber-800' :
                      isAnswered ? 'bg-green-600 text-white' :
                      'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>

            <div className="mt-3 md:mt-4 text-xs md:text-sm grid grid-cols-3 md:grid-cols-1 gap-1">
              <div className="flex items-center">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-green-600 rounded-sm mr-1 md:mr-2"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-amber-600 rounded-sm mr-1 md:mr-2"></div>
                <span>Current</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-200 rounded-sm mr-1 md:mr-2"></div>
                <span>Not Answered</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Current question */}
        <div className="md:col-span-3 order-1 md:order-2">
          <Card className="border-2 border-amber-800/30 bg-amber-50/80 p-4 md:p-6">
            <div className="mb-3 md:mb-4 flex justify-between items-center">
              <h2 className="text-sm md:text-lg font-medium text-amber-800">
                Question {currentQuestionIndex + 1} of {mockTest.questions.length}
              </h2>

              <Badge className="bg-amber-600 text-xs md:text-sm px-2 py-0.5">
                {mockTest.totalMarks / mockTest.questions.length} marks
              </Badge>
            </div>

            <div className="mb-4 md:mb-6">
              <p className="text-amber-900 font-medium text-sm md:text-base">{currentQuestion.question}</p>
            </div>

            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center p-2 md:p-3 rounded-md border cursor-pointer ${
                    selectedAnswers[currentQuestion.id] === option
                      ? 'bg-amber-100 border-amber-400'
                      : 'bg-white border-gray-300 hover:bg-amber-50'
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                >
                  <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border flex items-center justify-center mr-2 md:mr-3 ${
                    selectedAnswers[currentQuestion.id] === option
                      ? 'border-amber-600 bg-amber-600 text-white'
                      : 'border-gray-400'
                  }`}>
                    {selectedAnswers[currentQuestion.id] === option && (
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm md:text-base">{String.fromCharCode(65 + index)}. {option}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4 md:mt-6">
              <Button
                onClick={goToPrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium text-xs md:text-sm py-1 h-8 md:h-10"
              >
                Previous
              </Button>

              <Button
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === mockTest.questions.length - 1}
                className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium text-xs md:text-sm py-1 h-8 md:h-10"
              >
                Next
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
