'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleResendVerification = async () => {
    const unverifiedEmail = sessionStorage.getItem('unverifiedEmail') || email

    if (!unverifiedEmail) {
      setError('No email address to send verification to')
      return
    }

    setResendLoading(true)
    setError(null)
    setResendSuccess(false)

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: unverifiedEmail
      })

      if (error) {
        setError(`Error sending verification email: ${error.message}`)
      } else {
        setResendSuccess(true)
        // Clear the error since we've successfully sent the verification email
        setError(null)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setResendLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!email || !password) {
      setError('Email and password are required')
      setLoading(false)
      return
    }

    try {
      // First, check if the user exists and if their email is verified
      const { data: { user: existingUser }, error: userError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (userError) {
        console.error('Login error details:', userError)

        // Provide more user-friendly error messages
        if (userError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.')
        } else if (userError.message.includes('Email not confirmed')) {
          setError(
            'Your email address has not been verified. Please check your inbox for the verification link or click "Resend verification email" below.'
          )
          // Store the email in session storage for resend functionality
          if (email) {
            sessionStorage.setItem('unverifiedEmail', email)
          }
        } else {
          setError(`Error: ${userError.message}`)
        }
        return
      }

      // Check if email is verified
      if (existingUser && !existingUser.email_confirmed_at) {
        setError(
          'Your email address has not been verified. Please check your inbox for the verification link or click "Resend verification email" below.'
        )
        // Store the email in session storage for resend functionality
        if (email) {
          sessionStorage.setItem('unverifiedEmail', email)
        }
        return
      }

      console.log('Login successful')
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      console.error('Login error:', err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-amber-100 font-serif">Return to MockWizard Academy</h2>
        <p className="text-amber-200/80 mt-2 italic">Welcome back, esteemed wizard</p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[url('/images/parchment-texture.jpg')] bg-cover opacity-10 rounded-lg"></div>
        <div className="relative p-4 text-center">
          <p className="text-amber-200 font-serif">
            "It matters not what someone is born, but what they grow to be."
          </p>
          <p className="text-amber-200/60 text-sm mt-2 italic">
            — Albus Dumbledore
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-[#740001]/30 border-2 border-[#740001] text-amber-200 rounded-lg text-sm shadow-lg">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-[#D3A625]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-serif font-medium">{error}</span>
          </div>
          {error.includes('not been verified') && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleResendVerification}
              disabled={resendLoading}
              className="mt-3 w-full bg-amber-600 hover:bg-amber-700 text-white font-serif"
            >
              {resendLoading ? 'Sending owl post...' : 'Resend verification owl'}
            </Button>
          )}
        </div>
      )}

      {resendSuccess && (
        <div className="mb-6 p-4 bg-[#1A472A]/30 border-2 border-[#AAAAAA] text-amber-200 rounded-lg text-sm shadow-lg">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-[#AAAAAA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-serif font-medium">Owl dispatched successfully! Please check your inbox for the verification letter.</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSignIn} className="space-y-6 bg-[#0E1A2D]/80 p-6 rounded-lg border border-amber-900/30 shadow-lg">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-amber-200 font-serif">
            Owl Post Address (Email)
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#1A1A2E] border-amber-900/50 text-amber-100 focus:ring-amber-500 focus:border-amber-500"
            placeholder="wizard@hogwarts.edu"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium text-amber-200 font-serif">
              Secret Spell (Password)
            </Label>
            <Link href="/forgot-password" className="text-sm text-amber-400 hover:text-amber-300 hover:underline italic font-serif">
              Forgot your spell?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#1A1A2E] border-amber-900/50 text-amber-100 focus:ring-amber-500 focus:border-amber-500"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="remember-me" className="data-[state=checked]:bg-amber-600 border-amber-900/50" />
          <Label htmlFor="remember-me" className="text-sm text-amber-200 font-serif">
            Remember my wand
          </Label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold font-serif py-6 rounded-md shadow-lg shadow-amber-900/30 transition-transform hover:scale-105"
        >
          {loading ? 'Casting Alohomora...' : 'Enter the Great Hall'}
        </Button>
      </form>

      <div className="mt-8 text-center bg-[#0E1A2D]/60 p-4 rounded-lg border border-amber-900/20">
        <p className="text-amber-200/80 font-serif">
          Not yet enrolled at MockWizard?{' '}
          <Link href="/signup" className="text-amber-400 hover:text-amber-300 hover:underline transition-colors">
            Receive your acceptance letter
          </Link>
        </p>
      </div>
    </div>
  )
}
