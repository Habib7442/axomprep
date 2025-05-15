'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Download } from 'lucide-react'
import Link from 'next/link'

interface TestResult {
  test_id: string
  score: number
  total_marks: number
  correct_answers: number
  incorrect_answers: number
  unattempted: number
  time_taken: number
  passed: boolean
  created_at: string
}

interface Test {
  id: string
  name: string
  passingMarks: number
  totalMarks: number
}

interface TestResultsListProps {
  results: TestResult[]
  tests: Test[]
  onDownloadCertificate: (testId: string) => void
  itemsPerPage?: number
}

export default function TestResultsList({
  results,
  tests,
  onDownloadCertificate,
  itemsPerPage = 5
}: TestResultsListProps) {
  const [currentPage, setCurrentPage] = React.useState(1);

  // Format time in minutes and seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  // Calculate pagination
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, results.length);
  const currentResults = results.slice(startIndex, endIndex);

  if (results.length === 0) {
    return (
      <div className="text-center py-4 sm:py-8">
        <p className="text-gray-500 text-sm sm:text-base">You haven't attempted any tests yet.</p>
        <Link href="/dashboard/mock-tests">
          <Button className="mt-3 sm:mt-4 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm py-1.5 sm:py-2">
            Take a Test
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {currentResults.map((result, index) => {
        const test = tests.find(t => t.id === result.test_id) || {
          name: result.test_id,
          passingMarks: 0,
          totalMarks: result.total_marks
        }

        return (
          <div key={index} className="border rounded-lg p-3 sm:p-4">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <h3 className="font-medium text-base sm:text-lg">{test.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Attempted on {new Date(result.created_at).toLocaleDateString()}
                </p>
              </div>
              <Badge className={`${result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-xs sm:text-sm px-1.5 py-0.5 sm:px-2 sm:py-1`}>
                {result.passed ? 'Passed' : 'Failed'}
              </Badge>
            </div>

            <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Score</p>
                <p className="text-sm sm:text-base font-medium">{result.score}/{result.total_marks}</p>
                <p className="text-xs text-gray-500 mt-1">
                  ({result.correct_answers} × {Math.round((result.total_marks / (result.correct_answers + result.incorrect_answers + result.unattempted)) * 10) / 10}) - ({result.incorrect_answers} × 0.5)
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Correct</p>
                <p className="text-sm sm:text-base font-medium text-green-700">{result.correct_answers}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Incorrect</p>
                <p className="text-sm sm:text-base font-medium text-red-700">{result.incorrect_answers}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Time Taken</p>
                <p className="text-sm sm:text-base font-medium">{formatTime(result.time_taken)}</p>
              </div>
            </div>

            <div className="mt-3 sm:mt-4">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Performance</p>
              <Progress
                value={result.score}
                max={result.total_marks}
                className="h-1.5 sm:h-2"
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">0</p>
                <p className="text-xs text-gray-500">{test.passingMarks}</p>
                <p className="text-xs text-gray-500">{result.total_marks}</p>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
              <Link href={`/dashboard/test-details/${result.test_id.replace(/\//g, '-')}`}>
                <Button
                  className="bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm py-1 sm:py-2 h-auto"
                >
                  View Details
                </Button>
              </Link>

              {result.passed && (
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm py-1 sm:py-2 h-auto"
                  onClick={() => onDownloadCertificate(result.test_id)}
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Download Certificate
                </Button>
              )}
            </div>
          </div>
        )
      })}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 text-amber-800 border-amber-300"
          >
            &lt;
          </Button>

          <div className="text-sm text-amber-800">
            Page {currentPage} of {totalPages}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 text-amber-800 border-amber-300"
          >
            &gt;
          </Button>
        </div>
      )}
    </div>
  )
}
