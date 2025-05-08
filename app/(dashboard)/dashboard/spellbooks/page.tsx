'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Sparkles, Brain, Award, Wand2 } from 'lucide-react'
import Link from 'next/link'

export default function SpellbooksPage() {
  const [loading, setLoading] = useState(true)
  const [userHouse, setUserHouse] = useState<string>('slytherin')
  const router = useRouter()
  const supabase = createClient()

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
          <h2 className="text-xl font-bold font-serif">Magical Spellbooks</h2>
        </div>
        <p className="text-gray-600 font-serif italic">
          "The wand chooses the wizard, but the spellbook guides their magic." — Ollivander
        </p>
      </div>

      {/* Spellbook Lessons Section */}
      <div className="mb-10">
        <h3 className="text-lg font-bold font-serif mb-4 border-b border-amber-800/30 pb-2">Lesson Spellbooks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>
            
            <CardHeader className="relative z-10 border-b border-amber-800/30">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-serif">Understanding Percentages</CardTitle>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-green-900 text-green-300">
                  Beginner
                </span>
              </div>
              <CardDescription className="text-amber-200 font-serif">
                30 min • Not started • 15 House Points
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-4">
              <p className="text-amber-100 font-serif">
                Master the basic spells of Arithmancy to unravel the mysteries of percentages and their applications.
              </p>
            </CardContent>
            
            <CardFooter className="relative z-10 border-t border-amber-800/30 pt-4">
              <Link href="/dashboard/lesson/1" className="w-full">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium">
                  Open Spellbook
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden opacity-80 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>
            
            <CardHeader className="relative z-10 border-b border-amber-800/30">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-serif">Percentage Change</CardTitle>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-amber-900 text-amber-300">
                  Intermediate
                </span>
              </div>
              <CardDescription className="text-amber-200 font-serif">
                45 min • Locked • 25 House Points
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-4">
              <p className="text-amber-100 font-serif">
                Learn powerful incantations to calculate percentage increases, decreases, and successive changes.
              </p>
            </CardContent>
            
            <CardFooter className="relative z-10 border-t border-amber-800/30 pt-4">
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-amber-200 border border-amber-800" disabled>
                Complete Previous Lesson to Unlock
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden opacity-80 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>
            
            <CardHeader className="relative z-10 border-b border-amber-800/30">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-serif">Advanced Applications</CardTitle>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-red-900 text-red-300">
                  Advanced
                </span>
              </div>
              <CardDescription className="text-amber-200 font-serif">
                60 min • Locked • 40 House Points
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-4">
              <p className="text-amber-100 font-serif">
                Master complex percentage applications in profit, loss, discount, and compound scenarios.
              </p>
            </CardContent>
            
            <CardFooter className="relative z-10 border-t border-amber-800/30 pt-4">
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-amber-200 border border-amber-800" disabled>
                Complete Previous Lessons to Unlock
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Mini-Games Section */}
      <div className="mt-12 border-t-2 border-amber-800 pt-6">
        <div className="flex items-center mb-4">
          <svg className="h-6 w-6 text-amber-800 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <h2 className="text-xl font-bold font-serif">Magical Training Games</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>
            
            <CardHeader className="relative z-10 border-b border-amber-800/30">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-serif">Formula Memorization Training</CardTitle>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-amber-900 text-amber-300">
                  All Levels
                </span>
              </div>
              <CardDescription className="text-amber-200 font-serif">
                10-15 min • Interactive • 25 House Points
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-4">
              <p className="text-amber-100 font-serif">
                Train your memory to instantly recall important magical formulas through an enchanted memory game.
              </p>
            </CardContent>
            
            <CardFooter className="relative z-10 border-t border-amber-800/30 pt-4">
              <Link href="/dashboard/spellbooks/formula-mastery" className="w-full">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium">
                  Start Training
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden opacity-80">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>
            
            <CardHeader className="relative z-10 border-b border-amber-800/30">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-serif">Speed Calculation Challenge</CardTitle>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-800 text-gray-300">
                  Coming Soon
                </span>
              </div>
              <CardDescription className="text-amber-200 font-serif">
                5-10 min • Interactive • 20 House Points
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-4">
              <p className="text-amber-100 font-serif">
                Test your speed and accuracy with magical calculations in this timed challenge.
              </p>
            </CardContent>
            
            <CardFooter className="relative z-10 border-t border-amber-800/30 pt-4">
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-amber-200 border border-amber-800" disabled>
                Coming Soon
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
