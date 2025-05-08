'use client'

import { useState, useEffect, use } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Loader2,  AlertCircle, CheckCircle, XCircle, Download, ArrowLeft } from 'lucide-react'
import { getAllMockTests } from '@/lib/mock-tests'

export default function TestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const supabase = createClient()

  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  // Replace hyphens with slashes to match the original test ID format
  const testId = unwrappedParams.id.replace('-', '/')

  // Define types for better type safety
  interface TestResult {
    id: string;
    user_id: string;
    test_id: string;
    score: number;
    total_marks: number;
    correct_answers: number;
    incorrect_answers: number;
    unattempted: number;
    time_taken: number;
    passed: boolean;
    created_at: string;
  }

  interface TestDetails {
    id: string;
    name: string;
    category: string;
    subject: string;
    difficulty: string;
    timeLimit: number;
    totalMarks: number;
    passingMarks: number;
    date: string;
    shift: string;
  }

  interface UserAnswer {
    id: string;
    result_id: string;
    question_id: number;
    answer: string;
  }

  interface QuestionOption {
    id: string;
    text: string;
  }

  interface Question {
    id: number;
    question: string; // In the mock files, the question text is stored as "question" not "text"
    text?: string;    // Keep this for backward compatibility
    options: QuestionOption[] | string[]; // Options can be an array of strings or QuestionOption objects
    answer: string;
    explanation?: string;
  }

  // State variables
  const [loading, setLoading] = useState(true)
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [test, setTest] = useState<TestDetails | null>(null)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    async function fetchTestDetails() {
      try {
        // Get the current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        // Fetch test result
        const { data: resultData, error: resultError } = await supabase
          .from('mock_test_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('test_id', testId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (resultError) {
          console.error('Error fetching test result:', resultError)
          setLoading(false)
          return
        }

        setTestResult(resultData)

        // Fetch user answers if available
        const { data: answersData, error: answersError } = await supabase
          .from('mock_test_answers')
          .select('*')
          .eq('result_id', resultData.id)

        if (!answersError && answersData) {
          setUserAnswers(answersData)
        }

        // Get test details from local data
        const allTests = getAllMockTests()
        const testDetails = allTests.find(t => t.id === testId)
        if (testDetails) {
          setTest(testDetails as unknown as TestDetails)
        }

        // Dynamically import the test questions
        try {
          // The correct path format is @/public/maths-mock/category/mock-number
          // For example: @/public/maths-mock/ssc/mock-1
          const [category, mockNumber] = testId.split('/')
          console.log(`Attempting to import questions from: @/public/maths-mock/${category}/mock-${mockNumber.replace('mock-', '')}`)

          const testModule = await import(`@/public/maths-mock/${category}/mock-${mockNumber.replace('mock-', '')}`)
          console.log('Test module loaded:', testModule)

          if (testModule.default && testModule.default.questions) {
            console.log('Questions found:', testModule.default.questions.length)
            setQuestions(testModule.default.questions)
          } else {
            console.error('No questions found in the imported module')
          }
        } catch (importError) {
          console.error('Error importing test questions:', importError)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching test details:', error)
        setLoading(false)
      }
    }

    fetchTestDetails()
  }, [testId, router, supabase])

  // Format time in minutes and seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    )
  }

  if (!testResult || !test) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-amber-800 mb-2">Test Result Not Found</h2>
          <p className="text-amber-700 mb-6">
            We couldn&apos;t find the test result you&apos;re looking for. It may have been deleted or you may not have permission to view it.
          </p>
          <Link href="/dashboard/mock-tests">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium">
              Back to Mock Tests
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Calculate marks per question
  const marksPerQuestion = test.totalMarks / questions.length

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center text-amber-700 hover:text-amber-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-800 font-serif">Test Details</h1>
        <p className="text-amber-700 mt-2">
          {test.name} • {test.date} • Shift: {test.shift}
        </p>
      </div>

      <Card className="border-2 border-amber-800/30 bg-amber-50/80 p-4 sm:p-6 mb-6">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-2">
            Your Score: {testResult.score}/{testResult.total_marks}
          </h2>
          <Badge className={testResult.passed ? 'bg-green-700 text-white px-3 py-1' : 'bg-red-700 text-white px-3 py-1'}>
            {testResult.passed ? 'PASSED' : 'FAILED'}
          </Badge>
          <p className="text-amber-700 mt-2">
            Time Taken: {formatTime(testResult.time_taken)}
          </p>
          <div className="mt-3 text-sm text-amber-800 bg-amber-50 p-3 rounded-md border border-amber-200 inline-block">
            <p>Scoring: ({testResult.correct_answers} × {Math.round(marksPerQuestion * 10) / 10}) - ({testResult.incorrect_answers} × 0.5) = {testResult.score}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded-md border border-green-300 text-center">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <p className="font-medium text-green-800">Correct Answers</p>
            <p className="text-2xl font-bold text-green-700">{testResult.correct_answers}</p>
          </div>

          <div className="bg-red-100 p-4 rounded-md border border-red-300 text-center">
            <XCircle className="h-6 w-6 text-red-600 mx-auto mb-1" />
            <p className="font-medium text-red-800">Incorrect Answers</p>
            <p className="text-2xl font-bold text-red-700">{testResult.incorrect_answers}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-md border border-gray-300 text-center">
            <AlertCircle className="h-6 w-6 text-gray-600 mx-auto mb-1" />
            <p className="font-medium text-gray-800">Unattempted</p>
            <p className="text-2xl font-bold text-gray-700">{testResult.unattempted}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold text-amber-800 mb-2">Performance</h3>
          <Progress value={testResult.score} max={testResult.total_marks} className="h-2 mb-2" />
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">0</span>
            <span className="text-xs text-gray-500">{test.passingMarks}</span>
            <span className="text-xs text-gray-500">{test.totalMarks}</span>
          </div>
        </div>

        {testResult.passed && (
          <div className="text-center mb-6">
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => {
                // This will be handled by the profile page's certificate download function
                router.push(`/profile?download=${testId}`)
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
          </div>
        )}

        {/* Question Analysis */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-amber-800 mb-4">Question Analysis</h3>

          {questions.length > 0 ? (
            <div className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = userAnswers.find(a => a.question_id === question.id)?.answer || null;

                // Handle different answer formats
                let isCorrect = false;
                if (userAnswer && question.answer) {
                  // Check if the answer is a direct match
                  if (userAnswer === question.answer) {
                    isCorrect = true;
                  }
                  // Check if the answer is an index (A, B, C, D) and the option at that index matches
                  else if (Array.isArray(question.options) &&
                          userAnswer.length === 1 &&
                          userAnswer.charCodeAt(0) >= 65 &&
                          userAnswer.charCodeAt(0) <= 68) {
                    const answerIndex = userAnswer.charCodeAt(0) - 65;
                    if (answerIndex >= 0 && answerIndex < question.options.length) {
                      const option = question.options[answerIndex];
                      if (typeof option === 'string' && option === question.answer) {
                        isCorrect = true;
                      }
                    }
                  }
                }

                const isUnattempted = !userAnswer;

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-md border ${
                      isUnattempted
                        ? 'bg-gray-50 border-gray-300'
                        : isCorrect
                          ? 'bg-green-50 border-green-300'
                          : 'bg-red-50 border-red-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800">Question {index + 1}</h4>
                      <Badge className={
                        isUnattempted
                          ? 'bg-gray-100 text-gray-800'
                          : isCorrect
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                      }>
                        {isUnattempted ? 'Unattempted' : isCorrect ? 'Correct' : 'Incorrect'}
                      </Badge>
                    </div>

                    <p className="mt-2 text-gray-700">{question.question || question.text}</p>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Array.isArray(question.options) && question.options.map((option, optIndex) => {
                        // Handle both string options and QuestionOption objects
                        const optionId = typeof option === 'string' ? String.fromCharCode(65 + optIndex) : option.id;
                        const optionText = typeof option === 'string' ? option : option.text;
                        const isCorrectAnswer = optionId === question.answer ||
                                               (typeof option === 'string' && question.answer === option);
                        const isUserAnswer = optionId === userAnswer ||
                                           (typeof option === 'string' && userAnswer === option);

                        return (
                          <div
                            key={optIndex}
                            className={`p-2 rounded border ${
                              isCorrectAnswer
                                ? 'bg-green-100 border-green-300'
                                : isUserAnswer && !isCorrectAnswer
                                  ? 'bg-red-100 border-red-300'
                                  : 'bg-white border-gray-200'
                            }`}
                          >
                            <div className="flex items-start">
                              <div className="mr-2">
                                {isCorrectAnswer ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : isUserAnswer && !isCorrectAnswer ? (
                                  <XCircle className="h-5 w-5 text-red-600" />
                                ) : (
                                  <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                                    {String.fromCharCode(65 + optIndex)} {/* A, B, C, D, etc. */}
                                  </div>
                                )}
                              </div>
                              <p className={`text-sm ${
                                isCorrectAnswer
                                  ? 'text-green-800 font-medium'
                                  : isUserAnswer && !isCorrectAnswer
                                    ? 'text-red-800 font-medium'
                                    : 'text-gray-700'
                              }`}>
                                {optionText}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {!isCorrect && (
                      <div className="mt-3 text-sm bg-amber-50 p-2 rounded border border-amber-200">
                        <p className="font-medium text-amber-800">Explanation:</p>
                        <p className="text-amber-700">{question.explanation || "No explanation available for this question."}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-amber-50 p-6 rounded-md border border-amber-200 text-center">
              <p className="text-amber-800">Question details are not available for this test.</p>
              <p className="text-amber-600 text-sm mt-2">You can still view your overall performance above.</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <Link href="/dashboard/mock-tests">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium">
              Take Another Test
            </Button>
          </Link>
          <Link href="/profile">
            <Button className="bg-amber-700 hover:bg-amber-800 text-white border-2 border-amber-900 font-medium">
              View Profile
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
