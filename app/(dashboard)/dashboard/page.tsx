'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import DashboardOverview from '@/components/dashboard/DashboardOverview'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  // Hogwarts houses
  const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff']

  // This is a placeholder for actual user progress data that would come from Supabase
  const mockProgress = {
    xp: 120,
    level: 1,
    completedLessons: 0,
    totalLessons: 5,
    completedProblems: 0,
    totalProblems: 25,
    badges: [
      {
        id: 1,
        name: 'First Spell Cast',
        description: 'You cast your first mathematical spell!',
        icon: 'wand'
      }
    ]
  }

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setUser(user)

        // Get user profile data if available
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profile) {
          setUserProfile(profile)
        } else {
          // If no profile exists, randomly assign a house
          const randomHouse = houses[Math.floor(Math.random() * houses.length)]
          setUserProfile({ house: randomHouse })

          // In a real app, you would create a profile here
          // await supabase.from('users').insert({
          //   id: user.id,
          //   house: randomHouse
          // })
        }
      } else {
        router.push('/login')
      }

      setLoading(false)
    }

    getUser()
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
      house: userProfile?.house || 'slytherin'
    }
  }

  return (
    <DashboardOverview user={magicalUser} userProgress={mockProgress} />
  )
}
