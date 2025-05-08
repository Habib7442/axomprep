'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E1A2D] bg-[url('/images/hogwarts-bg.jpg')] bg-cover bg-center bg-blend-overlay p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Left side - Features */}
        <div className="text-amber-100 space-y-10 py-8 hidden md:block">
          <div className="flex items-center mb-8">
            <div className="relative h-12 w-12 mr-3 overflow-hidden rounded-full border-2 border-amber-600 shadow-md">
              <Link href="/">
              <Image
                src="/images/logo.jpg"
                alt="MockWizard Logo"
                width={48}
                height={48}
                className="object-cover"
              />
              </Link>
            </div>
            <h1 className="text-2xl font-bold font-serif text-amber-100">MockWizard</h1>
          </div>

          <h2 className="text-3xl font-bold font-serif text-amber-100">Begin Your Magical Journey</h2>
          <p className="text-amber-200/80 text-sm italic">Prepare for competitive exams with a touch of magic</p>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-[#740001] rounded-full p-2 mr-4 border border-[#D3A625] shadow-md">
                <svg className="h-6 w-6 text-[#D3A625]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold font-serif text-[#D3A625]">Enchanted Mock Tests</h3>
                <p className="text-amber-200/80 text-sm">Specially designed for SSC, RAILWAYS, BANKING, and ADRE exams.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#0E1A40] rounded-full p-2 mr-4 border border-[#946B2D] shadow-md">
                <svg className="h-6 w-6 text-[#946B2D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold font-serif text-[#946B2D]">Magical Spellbooks</h3>
                <p className="text-amber-200/80 text-sm">Master key concepts with our carefully crafted lessons and practice problems.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#ECB939] rounded-full p-2 mr-4 border border-[#372E29] shadow-md">
                <svg className="h-6 w-6 text-[#372E29]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold font-serif text-amber-300">House Competitions</h3>
                <p className="text-amber-200/80 text-sm">Compete with fellow wizards on the leaderboard and earn points for your house.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="bg-[#0E1A2D]/80 backdrop-blur-sm rounded-lg p-8 border border-amber-900/30 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  )
}
