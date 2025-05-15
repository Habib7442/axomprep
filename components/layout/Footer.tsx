'use client'

import Link from 'next/link'
import { School, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-teal-300 font-bold text-lg mb-3">AxomPrep Coaching Center</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Premier coaching center for Mathematics, General Science, and English for classes 8-10 in both English and Assamese medium.
            </p>
            <div className="flex items-center text-gray-400 mb-2">
              <MapPin className="h-4 w-4 mr-2 text-teal-400" />
              <span>123 Education Street, Guwahati, Assam</span>
            </div>
            <div className="flex items-center text-gray-400 mb-2">
              <Phone className="h-4 w-4 mr-2 text-teal-400" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Mail className="h-4 w-4 mr-2 text-teal-400" />
              <span>contact@axomprep.com</span>
            </div>
          </div>

          <div className="mb-6 md:mb-0">
            <h3 className="text-amber-300 font-bold text-lg mb-3">MockWizard Platform</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              A magical exam preparation platform by AxomPrep Coaching Center.
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/mock-tests" className="text-gray-400 hover:text-amber-300">
                  Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/dashboard/spellbooks" className="text-gray-400 hover:text-amber-300">
                  Spellbooks
                </Link>
              </li>
              <li>
                <Link href="/dashboard/leaderboard" className="text-gray-400 hover:text-amber-300">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-teal-300 font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-axomprep" className="text-gray-400 hover:text-teal-300">
                  About AxomPrep
                </Link>
              </li>
              <li>
                <Link href="/axomprep-notes" className="text-gray-400 hover:text-teal-300">
                  AxomPrep Notes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-teal-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} AxomPrep Coaching Center. All rights reserved. MockWizard is a product of AxomPrep.
          </p>
        </div>
      </div>
    </footer>
  )
}
