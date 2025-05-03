'use client'

import { ReactNode } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userHouse, setUserHouse] = useState<string>('gryffindor') // Default house
  const router = useRouter()
  const supabase = createClient()

  // House colors
  const houseColors = {
    gryffindor: {
      primary: 'bg-[#740001]',
      secondary: 'bg-[#D3A625]',
      text: 'text-[#D3A625]',
      border: 'border-[#D3A625]',
      hover: 'hover:bg-[#9E0001]',
      accent: 'from-[#740001] to-[#AE0001]'
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

  // Get current house colors
  const colors = houseColors[userHouse as keyof typeof houseColors]

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)

        // Get user profile to determine house
        // For now, we'll randomly assign a house if not set
        const { data: profile } = await supabase
          .from('users')
          .select('house')
          .eq('id', user.id)
          .single()

        if (profile?.house) {
          setUserHouse(profile.house)
        } else {
          // Randomly assign a house
          const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff']
          const randomHouse = houses[Math.floor(Math.random() * houses.length)]
          setUserHouse(randomHouse)
        }
      } else {
        router.push('/login')
      }
      setLoading(false)
    }

    getUser()
  }, [router, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0E1A2D] bg-[url('/images/hogwarts-bg.jpg')] bg-cover bg-center bg-blend-overlay">
        <div className="text-white text-center">
          <div className="animate-spin h-16 w-16 mx-auto mb-4">
            <svg className="h-full w-full text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.25 11.5L4.75 14.5L12 18.75L19.25 14.5L14.75 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-serif">Casting spells...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen bg-[#0E1A2D] bg-[url('/images/hogwarts-bg.jpg')] bg-cover bg-center bg-blend-overlay bg-opacity-90 text-amber-50 font-serif`}
      style={{ backgroundBlendMode: 'overlay' }}
    >
      {/* Header - Hogwarts Great Hall style */}
      <header className={`${colors.primary} border-b-2 ${colors.border} shadow-lg`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 mr-3 relative">
              <svg className={`h-full w-full ${colors.text}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.5 1.5c-1.7 0-3 1.3-3 3v1.9L7 8.9v1.6c0 .5.4.9.9.9h.6v7.2c0 .5.4.9.9.9h6.1c.5 0 .9-.4.9-.9v-7.2h.6c.5 0 .9-.4.9-.9V8.9l-2.5-2.5V4.5c0-1.7-1.3-3-3-3zm0 1.5c.8 0 1.5.7 1.5 1.5v1.5h-3V4.5c0-.8.7-1.5 1.5-1.5zm-3 5.4l1.5-1.5h3l1.5 1.5v.6h-6v-.6zm1.5 1.5h3v6h-3v-6z"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold italic">MockWizards</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className={`${colors.text} hover:text-white transition border-b border-transparent hover:border-current`}>
              Great Hall
            </Link>
            <Link href="/dashboard/lessons" className={`${colors.text} hover:text-white transition border-b border-transparent hover:border-current`}>
              Spellbooks
            </Link>
            <Link href="/profile" className={`${colors.text} hover:text-white transition border-b border-transparent hover:border-current`}>
              Wizard Profile
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <div className={`h-8 w-8 rounded-full ${colors.secondary} flex items-center justify-center mr-2`}>
                {userHouse === 'gryffindor' && 'G'}
                {userHouse === 'slytherin' && 'S'}
                {userHouse === 'ravenclaw' && 'R'}
                {userHouse === 'hufflepuff' && 'H'}
              </div>
              <span className="text-sm">{user?.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className={`border ${colors.border} ${colors.text} hover:text-white`}
            >
              Leave Castle
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Marauder's Map style */}
      <div className={`md:hidden ${colors.primary} border-b ${colors.border} px-4 py-2`}>
        <nav className="flex justify-between">
          <Link href="/dashboard" className={`${colors.text} hover:text-white transition py-2`}>
            Great Hall
          </Link>
          <Link href="/dashboard/lessons" className={`${colors.text} hover:text-white transition py-2`}>
            Spellbooks
          </Link>
          <Link href="/profile" className={`${colors.text} hover:text-white transition py-2`}>
            Wizard Profile
          </Link>
        </nav>
      </div>

      {/* House Banner */}
      <div className={`${colors.secondary} py-2 text-center`}>
        <p className="text-sm font-medium">
          Welcome to House {userHouse.charAt(0).toUpperCase() + userHouse.slice(1)}!
          {userHouse === 'gryffindor' && " Where dwell the brave at heart."}
          {userHouse === 'slytherin' && " You'll make your real friends here."}
          {userHouse === 'ravenclaw' && " Where those of wit and learning will always find their kind."}
          {userHouse === 'hufflepuff' && " Where they are just and loyal."}
        </p>
      </div>

      {/* Main Content - Parchment style */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-[#f8f3e2] bg-opacity-90 text-gray-800 rounded-lg p-6 shadow-lg border-2 border-amber-800 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-30 pointer-events-none"></div>
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>

      {/* Footer - Hogwarts motto style */}
      <footer className={`${colors.primary} border-t-2 ${colors.border} py-6`}>
        <div className="container mx-auto px-4 text-center text-amber-200 text-sm">
          <p className="font-medium italic">"Draco dormiens nunquam titillandus"</p>
          <p className="mt-1">© {new Date().getFullYear()} MathWizards Academy. All magical rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
