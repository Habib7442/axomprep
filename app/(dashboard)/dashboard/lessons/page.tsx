'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import LessonsList from '@/components/dashboard/LessonsList'

export default function LessonsPage() {
  const [loading, setLoading] = useState(true)
  const [userHouse, setUserHouse] = useState<string>('slytherin')
  const router = useRouter()
  const supabase = createClient()

  // Mock lessons data with magical themes
  const mockLessons = [
    {
      id: 1,
      title: 'Understanding Percentages',
      description: 'Master the fundamental concepts of percentages and their applications in everyday magic.',
      difficulty: 'beginner' as const,
      duration: '30 min',
      completed: false
    }
  ]

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Get user profile to determine house
        const { data: profile } = await supabase
          .from('users')
          .select('house')
          .eq('id', user.id)
          .single()

        if (profile?.house) {
          setUserHouse(profile.house)
        }
      } else {
        router.push('/login')
      }

      setLoading(false)
    }

    checkAuth()
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
          <p className="font-serif text-amber-200">Summoning spellbooks...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <svg className="h-6 w-6 text-amber-800 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
          </svg>
          <h2 className="text-xl font-bold font-serif">Hogwarts Library</h2>
        </div>
        <p className="text-gray-600 font-serif italic">
          "When in doubt, go to the library." — Hermione Granger
        </p>
      </div>

      <LessonsList lessons={mockLessons} />
    </div>
  )
}
