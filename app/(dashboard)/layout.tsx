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

  // Function to truncate email
  const truncateEmail = (email: string) => {
    if (!email) return ''
    const [username, domain] = email.split('@')
    if (username.length <= 6) return email
    return `${username.substring(0, 6)}...@${domain}`
  }

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
      <header className={`bg-gradient-to-r ${colors.accent} border-b-2 ${colors.border} shadow-lg sticky top-0 z-50`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center group">
              <div className="relative h-12 w-12 mr-3 overflow-hidden rounded-md border-2 border-amber-600 shadow-md transition-transform group-hover:scale-105">
                <Image
                  src="/images/logo.jpg"
                  alt="MockWizard Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-amber-100 font-serif tracking-wide">MockWizard</h1>
                <p className={`text-xs ${colors.text} italic`}>Powered by AxomPrep</p>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className={`${colors.text} hover:text-white transition border-b-2 border-transparent hover:border-current flex items-center`}>
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Great Hall
            </Link>
            {/* <Link href="/dashboard/spellbooks" className={`${colors.text} hover:text-white transition border-b-2 border-transparent hover:border-current flex items-center`}>
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Spellbooks
            </Link> */}
            <Link href="/dashboard/mock-tests" className={`${colors.text} hover:text-white transition border-b-2 border-transparent hover:border-current flex items-center`}>
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Mock Tests
            </Link>
            <Link href="/dashboard/leaderboard" className={`${colors.text} hover:text-white transition border-b-2 border-transparent hover:border-current flex items-center`}>
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Leaderboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-black/20 px-3 py-1.5 rounded-full">
              <div className={`h-8 w-8 rounded-full ${colors.secondary} flex items-center justify-center mr-2 text-sm font-bold shadow-inner border border-white/20`}>
                {userHouse === 'gryffindor' && 'G'}
                {userHouse === 'slytherin' && 'S'}
                {userHouse === 'ravenclaw' && 'R'}
                {userHouse === 'hufflepuff' && 'H'}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-amber-200 font-medium">
                  {user?.user_metadata?.first_name || 'Wizard'}
                </span>
                <span className="text-xs opacity-80">
                  {truncateEmail(user?.email || '')}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Link href="/profile">
                <Button
                  variant="outline"
                  size="sm"
                  className={`border ${colors.border} ${colors.text} hover:text-black hidden md:flex`}
                >
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Button>
              </Link>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className={`border ${colors.border} ${colors.text} hover:text-black`}
              >
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Leave
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Marauder's Map style */}
      <div className={`md:hidden bg-gradient-to-r ${colors.accent} border-b ${colors.border} px-4 py-3 shadow-md`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className={`h-7 w-7 rounded-full ${colors.secondary} flex items-center justify-center mr-2 text-xs font-bold shadow-inner border border-white/20`}>
              {userHouse === 'gryffindor' && 'G'}
              {userHouse === 'slytherin' && 'S'}
              {userHouse === 'ravenclaw' && 'R'}
              {userHouse === 'hufflepuff' && 'H'}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-amber-200 font-medium">
                {user?.user_metadata?.first_name || 'Wizard'}
              </span>
              <span className="text-xs opacity-80">
                {truncateEmail(user?.email || '')}
              </span>
            </div>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-2">
          <Link href="/dashboard" className={`${colors.text} hover:text-white transition py-2 px-3 bg-black/20 rounded-md flex items-center`}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Great Hall
          </Link>
          {/* <Link href="/dashboard/spellbooks" className={`${colors.text} hover:text-white transition py-2 px-3 bg-black/20 rounded-md flex items-center`}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Spellbooks
          </Link> */}
          <Link href="/dashboard/mock-tests" className={`${colors.text} hover:text-white transition py-2 px-3 bg-black/20 rounded-md flex items-center`}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Mock Tests
          </Link>
          <Link href="/dashboard/leaderboard" className={`${colors.text} hover:text-white transition py-2 px-3 bg-black/20 rounded-md flex items-center`}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Leaderboard
          </Link>
          <Link href="/profile" className={`${colors.text} hover:text-white transition py-2 px-3 bg-black/20 rounded-md flex items-center col-span-2`}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
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
          <p className="font-medium italic">&ldquo;Draco dormiens nunquam titillandus&rdquo;</p>
          <p className="mt-1">© {new Date().getFullYear()} MockWizard Academy. All magical rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
