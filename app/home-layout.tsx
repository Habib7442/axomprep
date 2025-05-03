'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-yellow-400 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 10h2v2h-2v-2zm0-6h2v4h-2v-4z" />
            </svg>
            <h1 className="text-xl font-bold">MathQuest</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition">
              About
            </Link>
            <Link href="/features" className="text-gray-300 hover:text-white transition">
              Features
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button 
                variant="default" 
                size="sm" 
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-gray-800 border-b border-gray-700 px-4 py-2">
        <nav className="flex justify-between">
          <Link href="/" className="text-gray-300 hover:text-white transition py-2">
            Home
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition py-2">
            About
          </Link>
          <Link href="/features" className="text-gray-300 hover:text-white transition py-2">
            Features
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} MathQuest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
