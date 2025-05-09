'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import jsPDF from 'jspdf'
import PerformanceMetrics from '@/components/profile/PerformanceMetrics'
import TestResultsList from '@/components/profile/TestResultsList'
import CertificatesList from '@/components/profile/CertificatesList'
import CertificateTemplate from '@/components/profile/CertificateTemplate'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [testResults, setTestResults] = useState<any[]>([])
  const [mockTests, setMockTests] = useState<any[]>([])
  const certificateRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  // Hogwarts houses with their colors
  const houseColors = {
    gryffindor: {
      primary: 'bg-[#740001]',
      secondary: 'bg-[#D3A625]',
      text: 'text-[#D3A625]',
      border: 'border-[#D3A625]',
      hover: 'hover:bg-[#9E0001]',
      accent: 'from-[#740001] to-[#9E0001]'
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
  }

  // Mock tests data
  const mockTestsData = [
    {
      id: 'ssc/mock-1',
      name: 'SSC CGL Mock Test 1',
      description: 'Practice test for SSC CGL exam with 25 questions',
      category: 'SSC',
      difficulty: 'intermediate',
      timeLimit: 25, // minutes
      totalMarks: 50,
      passingMarks: 30,
      date: '9 September 2024',
      shift: '1'
    }
  ]

  useEffect(() => {
    async function fetchUserData() {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setUser(user)

        // Get user profile data
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profile) {
          setUserProfile(profile)
        }

        // Fetch user's mock test results
        const { data: results, error } = await supabase
          .from('mock_test_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (!error && results) {
          // Process results to keep only the best score for each test_id
          const bestResults = new Map<string, any>();

          results.forEach(result => {
            if (!bestResults.has(result.test_id) ||
                bestResults.get(result.test_id).score < result.score) {
              bestResults.set(result.test_id, result);
            }
          });

          // Convert Map back to array
          setTestResults(Array.from(bestResults.values()));
        }

        setMockTests(mockTestsData)

        // Check if we need to download a certificate (from URL parameter)
        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search)
          const downloadTestId = urlParams.get('download')

          if (downloadTestId) {
            // Wait a moment for the component to fully render
            setTimeout(() => {
              downloadCertificate(downloadTestId)

              // Remove the parameter from URL to avoid repeated downloads
              const newUrl = window.location.pathname
              window.history.replaceState({}, document.title, newUrl)
            }, 1000)
          }
        }
      } else {
        router.push('/login')
      }

      setLoading(false)
    }

    fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, supabase])

  // Calculate performance metrics
  const calculatePerformance = () => {
    if (testResults.length === 0) {
      return {
        totalTests: 0,
        passedTests: 0,
        averageScore: 0,
        highestScore: 0,
        passRate: 0,
        averageTime: 0
      }
    }

    const totalTests = testResults.length
    const passedTests = testResults.filter(result => result.passed).length
    const totalScore = testResults.reduce((sum, result) => sum + result.score, 0)
    const averageScore = Math.round(totalScore / totalTests)
    const highestScore = Math.max(...testResults.map(result => result.score))
    const passRate = Math.round((passedTests / totalTests) * 100)
    const totalTime = testResults.reduce((sum, result) => sum + result.time_taken, 0)
    const averageTime = Math.round(totalTime / totalTests)

    return {
      totalTests,
      passedTests,
      averageScore,
      highestScore,
      passRate,
      averageTime
    }
  }

  // Check if user has passed a specific test
  const hasPassedTest = (testId: string) => {
    return testResults.some(result => result.test_id === testId && result.passed)
  }

  // Get the highest score for a specific test
  const getHighestScore = (testId: string) => {
    const filteredResults = testResults.filter(result => result.test_id === testId)
    if (filteredResults.length === 0) return null

    return filteredResults.reduce((max, result) =>
      result.score > max.score ? result : max, filteredResults[0])
  }

  // Format time in minutes and seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  // Generate and download PDF certificate
  const downloadCertificate = async (testId: string) => {
    const test = mockTests.find(test => test.id === testId)
    const result = testResults.find(result => result.test_id === testId && result.passed)

    if (!test || !result || !certificateRef.current) return

    try {
      // Create a direct PDF without using html2canvas
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })

      // Get house colors
      const houseColors: Record<string, { border: string, primary: string, accent: string }> = {
        gryffindor: { border: '#740001', primary: '#D3A625', accent: '#AE0001' },
        slytherin: { border: '#1A472A', primary: '#2A623D', accent: '#5D5D5D' },
        ravenclaw: { border: '#0E1A40', primary: '#222F5B', accent: '#946B2D' },
        hufflepuff: { border: '#ECB939', primary: '#F0C75E', accent: '#372E29' }
      }

      const house = userProfile?.house || 'slytherin'
      const houseColor = houseColors[house] || { border: '#B45309', primary: '#92400E', accent: '#F59E0B' }

      // Set background color - parchment-like
      pdf.setFillColor(255, 252, 245) // Very light cream color for better contrast
      pdf.rect(0, 0, 297, 210, 'F')

      // Add decorative border
      const borderWidth = 15

      // Outer border - using house color
      pdf.setFillColor(parseInt(houseColor.border.substring(1, 3), 16),
                      parseInt(houseColor.border.substring(3, 5), 16),
                      parseInt(houseColor.border.substring(5, 7), 16))
      pdf.rect(0, 0, 297, borderWidth, 'F') // Top
      pdf.rect(0, 210 - borderWidth, 297, borderWidth, 'F') // Bottom
      pdf.rect(0, 0, borderWidth, 210, 'F') // Left
      pdf.rect(297 - borderWidth, 0, borderWidth, 210, 'F') // Right

      // Inner border - gold/accent color
      pdf.setFillColor(parseInt(houseColor.accent.substring(1, 3), 16),
                      parseInt(houseColor.accent.substring(3, 5), 16),
                      parseInt(houseColor.accent.substring(5, 7), 16))
      const innerBorderWidth = 2
      const innerBorderOffset = borderWidth + 5
      pdf.rect(innerBorderOffset, innerBorderOffset, 297 - (innerBorderOffset * 2), innerBorderWidth, 'F') // Top
      pdf.rect(innerBorderOffset, 210 - innerBorderOffset - innerBorderWidth, 297 - (innerBorderOffset * 2), innerBorderWidth, 'F') // Bottom
      pdf.rect(innerBorderOffset, innerBorderOffset, innerBorderWidth, 210 - (innerBorderOffset * 2), 'F') // Left
      pdf.rect(297 - innerBorderOffset - innerBorderWidth, innerBorderOffset, innerBorderWidth, 210 - (innerBorderOffset * 2), 'F') // Right

      // Add corner decorations
      const cornerSize = 20

      // Top left corner decoration
      pdf.setFillColor(parseInt(houseColor.accent.substring(1, 3), 16),
                      parseInt(houseColor.accent.substring(3, 5), 16),
                      parseInt(houseColor.accent.substring(5, 7), 16))
      pdf.triangle(
        innerBorderOffset - 5, innerBorderOffset - 5,
        innerBorderOffset + cornerSize, innerBorderOffset - 5,
        innerBorderOffset - 5, innerBorderOffset + cornerSize,
        'F'
      )

      // Top right corner decoration
      pdf.triangle(
        297 - innerBorderOffset + 5, innerBorderOffset - 5,
        297 - innerBorderOffset - cornerSize, innerBorderOffset - 5,
        297 - innerBorderOffset + 5, innerBorderOffset + cornerSize,
        'F'
      )

      // Bottom left corner decoration
      pdf.triangle(
        innerBorderOffset - 5, 210 - innerBorderOffset + 5,
        innerBorderOffset + cornerSize, 210 - innerBorderOffset + 5,
        innerBorderOffset - 5, 210 - innerBorderOffset - cornerSize,
        'F'
      )

      // Bottom right corner decoration
      pdf.triangle(
        297 - innerBorderOffset + 5, 210 - innerBorderOffset + 5,
        297 - innerBorderOffset - cornerSize, 210 - innerBorderOffset + 5,
        297 - innerBorderOffset + 5, 210 - innerBorderOffset - cornerSize,
        'F'
      )

      // No background box for header - clean design

      // Add logo/emblem
      const logoSize = 25
      // Outer circle (accent color)
      pdf.setFillColor(parseInt(houseColor.accent.substring(1, 3), 16),
                      parseInt(houseColor.accent.substring(3, 5), 16),
                      parseInt(houseColor.accent.substring(5, 7), 16))
      pdf.circle(148.5, 40, logoSize, 'F')

      // Inner circle for logo
      pdf.setFillColor(parseInt(houseColor.border.substring(1, 3), 16),
                      parseInt(houseColor.border.substring(3, 5), 16),
                      parseInt(houseColor.border.substring(5, 7), 16))
      pdf.circle(148.5, 40, logoSize - 3, 'F')

      // Add logo text
      pdf.setTextColor(255, 255, 255) // White text for maximum contrast
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      pdf.text('MW', 148.5, 45, { align: 'center' })

      // Add certificate title with high contrast
      pdf.setTextColor(180, 0, 0) // Bright red for title
      pdf.setFontSize(32)
      pdf.setFont('helvetica', 'bold')
      // Ensure text fits by measuring and adjusting if needed
      const titleText = 'Certificate of Achievement'
      pdf.text(titleText, 148.5, 75, { align: 'center' })

      // Add decorative line under title
      pdf.setDrawColor(180, 0, 0) // Match title color
      pdf.setLineWidth(1)
      pdf.line(70, 80, 227, 80)

      // Add certificate content with better contrast
      pdf.setTextColor(0, 0, 0) // Black text for maximum readability
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'italic')
      pdf.text('This is to certify that', 148.5, 95, { align: 'center' })

      // Add user name with decorative elements
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      const userName = `${userProfile?.first_name || 'Wizard'} ${userProfile?.last_name || ''}`
      // Check if name is too long and adjust if needed
      const nameWidth = pdf.getStringUnitWidth(userName) * 24 / pdf.internal.scaleFactor
      if (nameWidth > 150) {
        pdf.setFontSize(20) // Reduce font size for long names
      }
      pdf.text(userName, 148.5, 110, { align: 'center' })

      // Add decorative line under name
      pdf.setDrawColor(180, 0, 0) // Match title color
      pdf.setLineWidth(0.5)
      pdf.line(80, 115, 217, 115)

      // Continue with certificate text
      pdf.setFont('helvetica', 'italic')
      pdf.setFontSize(16)
      pdf.text('has successfully completed and passed', 148.5, 130, { align: 'center' })

      // Add test name with styling
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      // Check if test name is too long and adjust if needed
      const testNameWidth = pdf.getStringUnitWidth(test.name) * 20 / pdf.internal.scaleFactor
      if (testNameWidth > 150) {
        pdf.setFontSize(16) // Reduce font size for long test names
      }
      pdf.text(test.name, 148.5, 145, { align: 'center' })

      // Add score information with decorative element
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'italic')
      pdf.text('with a distinguished score of', 148.5, 160, { align: 'center' })

      // No background box for score - clean design

      // Score text with high contrast
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(180, 0, 0) // Bright red for score
      pdf.text(`${result.score}/${test.totalMarks}`, 148.5, 180, { align: 'center' })

      // Add date and signature area
      pdf.setTextColor(0, 0, 0) // Black text
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      const dateStr = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      pdf.text(`Issued on ${dateStr}`, 148.5, 195, { align: 'center' })

      // Add MockWizard footer with full name
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(255, 255, 255) // White text for footer
      pdf.text('MockWizard - The Magical Exam Preparation Platform', 148.5, 205, { align: 'center' })

      // Save the PDF in a mobile-friendly way
      try {
        // For mobile devices, use a different approach
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          // Create a blob from the PDF
          const pdfBlob = pdf.output('blob');

          // Create a URL for the blob
          const blobUrl = URL.createObjectURL(pdfBlob);

          // Create a link element
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = `${test.name.replace(/\s+/g, '_')}_Certificate.pdf`;

          // Append to document, click, and remove
          document.body.appendChild(link);
          link.click();

          // Clean up after a delay
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
          }, 100);
        } else {
          // For desktop, use the standard method
          pdf.save(`${test.name.replace(/\s+/g, '_')}_Certificate.pdf`);
        }
      } catch (downloadError) {
        console.error('Error during PDF download:', downloadError);
        alert('There was an error downloading your certificate. Please try again on a desktop browser.');
      }
    } catch (error) {
      console.error('Error generating certificate:', error)
      alert('There was an error generating your certificate. Please try again later.')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    )
  }

  const performance = calculatePerformance()
  const userHouse = userProfile?.house || 'slytherin'
  const colors = houseColors[userHouse as keyof typeof houseColors]

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-serif text-amber-800">Wizard Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <Card className={`border-2 ${colors.border} shadow-lg overflow-hidden`}>
            <div className={`${colors.primary} p-4 sm:p-6 text-white`}>
              <div className="flex flex-col items-center">
                <div className={`h-16 w-16 sm:h-24 sm:w-24 rounded-full ${colors.secondary} flex items-center justify-center text-white text-xl sm:text-3xl font-bold mb-2 sm:mb-4`}>
                  {userProfile?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'W'}
                </div>
                <h2 className="text-lg sm:text-xl font-bold">{userProfile?.first_name || 'Wizard'} {userProfile?.last_name || ''}</h2>
                <p className="text-xs sm:text-sm opacity-80">{user?.email}</p>

                <div className="mt-2 sm:mt-4">
                  <Badge className={`${colors.secondary} text-white text-xs sm:text-sm`}>
                    {userHouse.charAt(0).toUpperCase() + userHouse.slice(1)} House
                  </Badge>
                </div>
              </div>
            </div>

            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Experience Points</p>
                  <div className="flex items-center">
                    <Progress value={userProfile?.xp || 0} max={100} className="h-2 flex-grow mr-2" />
                    <span className="text-xs sm:text-sm font-medium">{userProfile?.xp || 0} XP</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Level</p>
                  <p className="text-base sm:text-lg font-medium">{userProfile?.level || 1}</p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Exam</p>
                  <p className="text-base sm:text-lg font-medium">{userProfile?.exam || 'Not specified'}</p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Joined</p>
                  <p className="text-base sm:text-lg font-medium">{new Date(userProfile?.created_at || Date.now()).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Dashboard */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4 w-full grid grid-cols-3 h-auto">
              <TabsTrigger value="overview" className="text-xs sm:text-sm py-1.5 sm:py-2">Performance</TabsTrigger>
              <TabsTrigger value="tests" className="text-xs sm:text-sm py-1.5 sm:py-2">Test Results</TabsTrigger>
              <TabsTrigger value="certificates" className="text-xs sm:text-sm py-1.5 sm:py-2">Certificates</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="border-2 border-amber-800">
                <CardHeader className="bg-amber-50 p-4 sm:p-6">
                  <CardTitle className="text-amber-800 font-serif text-lg sm:text-xl">Performance Overview</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Your magical progress in mock tests</CardDescription>
                </CardHeader>

                <CardContent className="p-3 sm:p-6">
                  <PerformanceMetrics
                    totalTests={performance.totalTests}
                    passedTests={performance.passedTests}
                    averageScore={performance.averageScore}
                    highestScore={performance.highestScore}
                    passRate={performance.passRate}
                    averageTime={performance.averageTime}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tests">
              <Card className="border-2 border-amber-800">
                <CardHeader className="bg-amber-50 p-4 sm:p-6">
                  <CardTitle className="text-amber-800 font-serif text-lg sm:text-xl">Test Results</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Your performance in individual tests</CardDescription>
                </CardHeader>

                <CardContent className="p-3 sm:p-6">
                  <TestResultsList
                    results={testResults}
                    tests={mockTests}
                    onDownloadCertificate={downloadCertificate}
                    itemsPerPage={5}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates">
              <Card className="border-2 border-amber-800">
                <CardHeader className="bg-amber-50 p-4 sm:p-6">
                  <CardTitle className="text-amber-800 font-serif text-lg sm:text-xl">Certificates</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Download certificates for tests you've passed</CardDescription>
                </CardHeader>

                <CardContent className="p-3 sm:p-6">
                  <CertificatesList
                    results={testResults}
                    tests={mockTests}
                    onDownloadCertificate={downloadCertificate}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Hidden certificate template for PDF generation */}
      <div className="hidden">
        <div ref={certificateRef}>
          <CertificateTemplate
            userName={`${userProfile?.first_name || 'Wizard'} ${userProfile?.last_name || ''}`}
            testName={mockTests[0]?.name || 'Mock Test'}
            score={testResults.find(r => r.test_id === mockTests[0]?.id && r.passed)?.score || 0}
            totalMarks={mockTests[0]?.totalMarks || 50}
            date={new Date().toLocaleDateString()}
            house={userProfile?.house || 'slytherin'}
          />
        </div>
      </div>
    </div>
  )
}
