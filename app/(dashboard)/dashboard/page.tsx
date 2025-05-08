'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import DashboardOverview from '@/components/dashboard/DashboardOverview'

interface UserProgress {
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

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [userProgress, setUserProgress] = useState<UserProgress>({
    xp: 0,
    level: 1,
    completedLessons: 0,
    totalLessons: 5,
    completedProblems: 0,
    totalProblems: 25,
    badges: [],
    testStats: {
      totalTests: 0,
      passedTests: 0,
      bestScore: 0,
      averageScore: 0,
      recentTests: []
    }
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  // Hogwarts houses
  const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff']

  useEffect(() => {
    async function fetchData() {
      try {
        // Get authenticated user
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          router.push('/login')
          return
        }

        setUser(user)

        // Get user profile data
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Error fetching profile:', profileError)
        }

        if (profile) {
          setUserProfile(profile)
        } else {
          // If no profile exists, randomly assign a house
          const randomHouse = houses[Math.floor(Math.random() * houses.length)]
          setUserProfile({ house: randomHouse })
        }

        // Fetch user's test results
        const { data: testResults, error: testError } = await supabase
          .from('mock_test_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (testError) {
          console.error('Error fetching test results:', testError)
        }

        // Fetch user's badges
        const { data: userBadges, error: badgesError } = await supabase
          .from('user_badges')
          .select(`
            *,
            badges (*)
          `)
          .eq('user_id', user.id)

        if (badgesError) {
          console.error('Error fetching badges:', badgesError)
        }

        // Calculate user progress
        const progress: UserProgress = {
          xp: profile?.xp || 0,
          level: profile?.level || 1,
          completedLessons: 0, // Will be updated when lessons are implemented
          totalLessons: 5,
          completedProblems: 0, // Will be updated when problems are implemented
          totalProblems: 25,
          badges: userBadges?.map(badge => badge.badges) || [],
          testStats: {
            totalTests: testResults?.length || 0,
            passedTests: testResults?.filter(test => test.passed).length || 0,
            bestScore: testResults?.length ? Math.max(...testResults.map(test => test.score)) : 0,
            averageScore: testResults?.length
              ? Math.round(testResults.reduce((sum, test) => sum + test.score, 0) / testResults.length)
              : 0,
            recentTests: testResults?.slice(0, 3) || []
          }
        }

        setUserProgress(progress)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 mx-auto mb-4">
            <svg className="h-full w-full text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.25 11.5L4.75 14.5L12 18.75L19.25 14.5L14.75 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-serif text-amber-200">Casting spells...</p>
        </div>
      </div>
    )
  }

  // Combine user data with profile data for the magical experience
  const magicalUser = {
    ...user,
    user_metadata: {
      ...user?.user_metadata,
      house: userProfile?.house || 'slytherin',
      first_name: userProfile?.first_name || user?.user_metadata?.first_name,
      last_name: userProfile?.last_name || user?.user_metadata?.last_name,
      username: userProfile?.username
    }
  }

  return (
    <DashboardOverview user={magicalUser} userProgress={userProgress} />
  )
}
