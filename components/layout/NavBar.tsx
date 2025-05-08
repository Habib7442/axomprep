'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/browser-client'
import { Menu, X, User, LogOut, BookOpen, Award, Home } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const supabase = createClient()

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
        }
      }
    }

    getUser()
  }, [supabase])

  // Function to truncate email
  const truncateEmail = (email: string) => {
    if (!email) return ''
    const [username, domain] = email.split('@')
    if (username.length <= 6) return email
    return `${username.substring(0, 6)}...@${domain}`
  }

  // Function to get user initials for avatar
  const getUserInitials = () => {
    if (userProfile?.first_name) {
      return `${userProfile.first_name[0]}${userProfile.last_name ? userProfile.last_name[0] : ''}`
    }
    if (user?.email) {
      return user.email[0].toUpperCase()
    }
    return 'MW'
  }

  // Function to get house color for avatar
  const getHouseColor = () => {
    const house = userProfile?.house || 'gryffindor'
    switch (house) {
      case 'gryffindor': return 'bg-[#740001] text-[#D3A625]'
      case 'slytherin': return 'bg-[#1A472A] text-[#AAAAAA]'
      case 'ravenclaw': return 'bg-[#0E1A40] text-[#946B2D]'
      case 'hufflepuff': return 'bg-[#ECB939] text-[#372E29]'
      default: return 'bg-amber-700 text-white'
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 to-amber-800 border-b border-amber-700 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 mr-2 overflow-hidden rounded-md">
                <Image
                  src="/images/logo.jpg"
                  alt="MockWizard Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <h1 className="text-xl font-bold text-amber-100 font-serif">MockWizard</h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-amber-200 hover:text-white transition flex items-center">
              <Home className="h-4 w-4 mr-1" />
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/mock-tests" className="text-amber-200 hover:text-white transition flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>Mock Tests</span>
            </Link>
            <Link href="/dashboard/leaderboard" className="text-amber-200 hover:text-white transition flex items-center">
              <Award className="h-4 w-4 mr-1" />
              <span>Leaderboard</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className={`h-8 w-8 ${getHouseColor()}`}>
                      <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.username || user.email} />
                      <AvatarFallback className={getHouseColor()}>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userProfile?.username || 'Wizard'}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {truncateEmail(user.email)}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-amber-200 hover:text-white hover:bg-amber-800/50"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-amber-600 hover:bg-amber-700 text-white border border-amber-500"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-amber-200 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-900 border-b border-amber-700 px-4 py-2 shadow-lg">
          <nav className="flex flex-col space-y-3 py-3">
            <Link
              href="/dashboard"
              className="text-amber-200 hover:text-white transition py-2 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4 mr-2" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/mock-tests"
              className="text-amber-200 hover:text-white transition py-2 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Mock Tests</span>
            </Link>
            <Link
              href="/dashboard/leaderboard"
              className="text-amber-200 hover:text-white transition py-2 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Award className="h-4 w-4 mr-2" />
              <span>Leaderboard</span>
            </Link>
            {user && (
              <Link
                href="/profile"
                className="text-amber-200 hover:text-white transition py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4 mr-2" />
                <span>Profile</span>
              </Link>
            )}
            {user && (
              <button
                onClick={() => {
                  handleSignOut()
                  setIsMenuOpen(false)
                }}
                className="text-amber-200 hover:text-white transition py-2 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Log out</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </>
  )
}
