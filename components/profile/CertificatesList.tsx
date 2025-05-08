'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import Link from 'next/link'

interface TestResult {
  test_id: string
  score: number
  total_marks: number
  created_at: string
  passed: boolean
}

interface Test {
  id: string
  name: string
  category: string
  difficulty: string
  totalMarks: number
}

interface CertificatesListProps {
  results: TestResult[]
  tests: Test[]
  onDownloadCertificate: (testId: string) => void
}

export default function CertificatesList({
  results,
  tests,
  onDownloadCertificate
}: CertificatesListProps) {
  // Filter tests that have been passed
  const passedTests = tests.filter(test =>
    results.some(result => result.test_id === test.id && result.passed)
  )

  // Get the highest score for a specific test
  const getHighestScore = (testId: string) => {
    const testResults = results.filter(result => result.test_id === testId && result.passed)
    if (testResults.length === 0) return null

    return testResults.reduce((max, result) =>
      result.score > max.score ? result : max, testResults[0])
  }

  if (passedTests.length === 0) {
    return (
      <div className="text-center py-4 sm:py-8">
        <p className="text-gray-500 text-sm sm:text-base">You haven't passed any tests yet to earn certificates.</p>
        <Link href="/dashboard/mock-tests">
          <Button className="mt-3 sm:mt-4 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm py-1.5 sm:py-2">
            Take a Test
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {passedTests.map((test, index) => {
        const highestScore = getHighestScore(test.id)

        return (
          <div key={index} className="border rounded-lg p-4 sm:p-6">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <h3 className="font-medium text-base sm:text-lg">{test.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Category: {test.category} • Difficulty: {test.difficulty}
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs sm:text-sm px-1.5 py-0.5 sm:px-2 sm:py-1">Passed</Badge>
            </div>

            <div className="mt-3 sm:mt-4">
              <p className="text-xs sm:text-sm text-gray-500">Highest Score: {highestScore?.score}/{test.totalMarks}</p>
              <p className="text-xs sm:text-sm text-gray-500">Date: {highestScore ? new Date(highestScore.created_at).toLocaleDateString() : 'N/A'}</p>
              {highestScore && (
                <p className="text-xs text-gray-500 mt-1">
                  ({highestScore.correct_answers} × {Math.round((highestScore.total_marks / (highestScore.correct_answers + highestScore.incorrect_answers + highestScore.unattempted)) * 10) / 10}) - ({highestScore.incorrect_answers} × 0.5)
                </p>
              )}
            </div>

            <div className="mt-3 sm:mt-4">
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm py-1 sm:py-2 h-auto"
                onClick={() => onDownloadCertificate(test.id)}
              >
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Download Certificate
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
