'use client'

import Link from 'next/link'
import { School, Mail, MapPin, GraduationCap, BookOpen, Trophy } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 border-t border-amber-900/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center mr-3">
                <School className="h-5 w-5 text-amber-200" />
              </div>
              <h3 className="text-amber-300 font-bold text-xl font-serif">AxomPrep Coaching Center</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Premier coaching center for Mathematics, General Science, and English for classes 8-10 in both English and Assamese medium.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 hover:text-amber-200 transition-colors">
                <MapPin className="h-5 w-5 mr-3 text-amber-500" />
                <span>Kadong, Assam</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-amber-200 transition-colors">
                <Mail className="h-5 w-5 mr-3 text-amber-500" />
                <a href="mailto:ashadulmjh@gmail.com">ashadulmjh@gmail.com</a>
              </div>
              <div className="flex items-center text-gray-300 hover:text-amber-200 transition-colors">
                <div className="h-5 w-5 mr-3 text-amber-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <a href="https://www.instagram.com/axom_prep?igsh=b3Bia2Zkc2NjMjFr" target="_blank" rel="noopener noreferrer">
                  @axom_prep
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center mr-3">
                <BookOpen className="h-5 w-5 text-amber-200" />
              </div>
              <h3 className="text-amber-300 font-bold text-xl font-serif">MockWizard Platform</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              A magical exam preparation platform by AxomPrep Coaching Center.
            </p>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/dashboard/mock-tests" className="flex items-center text-gray-300 hover:text-amber-200 transition-colors">
                <div className="w-8 h-8 bg-amber-900/40 rounded-full flex items-center justify-center mr-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                </div>
                <span>Mock Tests</span>
              </Link>
              <Link href="/dashboard/spellbooks" className="flex items-center text-gray-300 hover:text-amber-200 transition-colors">
                <div className="w-8 h-8 bg-amber-900/40 rounded-full flex items-center justify-center mr-3">
                  <GraduationCap className="h-4 w-4 text-amber-400" />
                </div>
                <span>Spellbooks</span>
              </Link>
              <Link href="/dashboard/leaderboard" className="flex items-center text-gray-300 hover:text-amber-200 transition-colors">
                <div className="w-8 h-8 bg-amber-900/40 rounded-full flex items-center justify-center mr-3">
                  <Trophy className="h-4 w-4 text-amber-400" />
                </div>
                <span>Leaderboard</span>
              </Link>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-amber-200" />
              </div>
              <h3 className="text-amber-300 font-bold text-xl font-serif">Quick Links</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/about-axomprep" className="flex items-center text-gray-300 hover:text-amber-200 transition-colors">
                <div className="w-8 h-8 bg-amber-900/40 rounded-full flex items-center justify-center mr-3">
                  <School className="h-4 w-4 text-amber-400" />
                </div>
                <span>About AxomPrep</span>
              </Link>
              <Link href="/axomprep-notes" className="flex items-center text-gray-300 hover:text-amber-200 transition-colors">
                <div className="w-8 h-8 bg-amber-900/40 rounded-full flex items-center justify-center mr-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                </div>
                <span>AxomPrep Notes</span>
              </Link>
              <Link href="/contact" className="flex items-center text-gray-300 hover:text-amber-200 transition-colors">
                <div className="w-8 h-8 bg-amber-900/40 rounded-full flex items-center justify-center mr-3">
                  <Mail className="h-4 w-4 text-amber-400" />
                </div>
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-900/20 pt-6 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a
              href="https://www.instagram.com/axom_prep?igsh=b3Bia2Zkc2NjMjFr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center hover:from-amber-500 hover:to-amber-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} AxomPrep Coaching Center. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            MockWizard is a product of AxomPrep.
          </p>
        </div>
      </div>
    </footer>
  )
}
