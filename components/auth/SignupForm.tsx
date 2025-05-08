'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createUserProfile } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SignupForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [exam, setExam] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [assignedHouse, setAssignedHouse] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (!firstName || !lastName || !email || !password || exam === '') {
      setError('All fields are required')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    try {
      // Use the exam value for the database
      const examValue = exam || ''

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: firstName,
            last_name: lastName,
            exam: exam
          }
        }
      })

      if (error) {
        console.error('Signup error details:', error)

        // Provide more user-friendly error messages
        if (error.message.includes('User already registered')) {
          setError('This email is already registered. Please log in instead.')
        } else if (error.message.includes('Password')) {
          setError(error.message)
        } else {
          setError(`Error: ${error.message}`)
        }
        return
      }

      // Check if the user was created successfully
      if (data?.user) {
        console.log('Signup successful, user created:', data.user.id)

        // Generate a random username
        const username = generateRandomUsername(firstName, lastName)

        // Randomly assign a Hogwarts house
        const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff']
        const randomHouse = houses[Math.floor(Math.random() * houses.length)]
        setAssignedHouse(randomHouse)

        // Use the server action to create the user profile
        const { success, error: profileError } = await createUserProfile(
          data.user.id,
          email,
          username,
          firstName,
          lastName,
          exam
        )

        if (!success) {
          console.error('Error creating user profile:', profileError)
          setError(`Error creating user profile: ${profileError}`)
          return
        }

        // Format house name for display
        const formattedHouse = randomHouse.charAt(0).toUpperCase() + randomHouse.slice(1)

        // Check if the user needs to verify their email
        if (data.user.identities && data.user.identities.length > 0 && !data.user.email_confirmed_at) {
          // Show success message and redirect to verification page
          setSuccess(`Account created successfully! The Sorting Hat has placed you in ${formattedHouse}! Please verify your email to continue.`)

          // Clear form fields
          setFirstName('')
          setLastName('')
          setEmail('')
          setPassword('')
          setExam('')

          // Redirect to verification page after a short delay
          setTimeout(() => {
            router.push('/verify')
          }, 2000)
        } else {
          // If email verification is not required (unlikely with Supabase defaults)
          setSuccess(`Account created successfully! The Sorting Hat has placed you in ${formattedHouse}!`)

          // Clear form fields
          setFirstName('')
          setLastName('')
          setEmail('')
          setPassword('')
          setExam('')
        }
      } else {
        console.error('No user data returned:', data)
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Function to generate a random username
  const generateRandomUsername = (firstName: string, lastName: string) => {
    const baseUsername = (firstName.charAt(0) + lastName).toLowerCase().replace(/[^a-z0-9]/g, '')
    const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    return baseUsername + randomSuffix
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-amber-100 font-serif">Your Hogwarts Acceptance Letter</h2>
        <p className="text-amber-200/80 mt-2 italic">Begin your magical journey at MockWizard</p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[url('/images/parchment-texture.jpg')] bg-cover opacity-10 rounded-lg"></div>
        <div className="relative p-4 text-center">
          <p className="text-amber-200 font-serif">
            Dear Future Wizard,
          </p>
          <p className="text-amber-200/80 text-sm mt-2 italic">
            We are pleased to inform you that you have been accepted to MockWizard School of Competitive Exam Preparation.
            Please complete the enrollment form below to secure your place among our distinguished houses.
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
        </div>
      )}

      {success && (
        <div className="mb-6 p-5 bg-[url('/images/parchment-texture.jpg')] bg-cover border-2 border-amber-800 text-amber-900 rounded-lg shadow-lg">
          <div className="flex items-center mb-3">
            {assignedHouse && (
              <div className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center border-2 shadow-md ${
                assignedHouse === 'gryffindor' ? 'bg-[#740001] text-[#D3A625] border-[#D3A625]' :
                assignedHouse === 'slytherin' ? 'bg-[#1A472A] text-[#AAAAAA] border-[#AAAAAA]' :
                assignedHouse === 'ravenclaw' ? 'bg-[#0E1A40] text-[#946B2D] border-[#946B2D]' :
                'bg-[#ECB939] text-[#372E29] border-[#372E29]'
              }`}>
                <span className="font-bold text-lg font-serif">
                  {assignedHouse?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-serif font-bold text-lg">The Sorting Hat has decided!</h3>
              <p className="font-medium">{success}</p>
            </div>
          </div>
          <p className="text-sm text-amber-800 italic border-t border-amber-800/30 pt-2 mt-2">
            You&apos;ll be able to see your house and participate in the house cup competition after verifying your email.
          </p>
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-6 bg-[#0E1A2D]/80 p-6 rounded-lg border border-amber-900/30 shadow-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-amber-200 font-serif">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#1A1A2E] border-amber-900/50 text-amber-100 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Harry"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-amber-200 font-serif">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#1A1A2E] border-amber-900/50 text-amber-100 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Potter"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exam" className="text-sm font-medium text-amber-200 font-serif">
            Choose Your Magical Subject
          </Label>
          <Select
            value={exam}
            onValueChange={(value) => setExam(value)}
          >
            <SelectTrigger className="bg-[#1A1A2E] border-amber-900/50 text-amber-100 focus:ring-amber-500 focus:border-amber-500">
              <SelectValue placeholder="Select your exam" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A2E] border-amber-900/50 text-amber-100">
              <SelectItem value="ssc" className="focus:bg-amber-900/30 focus:text-amber-100">SSC</SelectItem>
              <SelectItem value="railways" className="focus:bg-amber-900/30 focus:text-amber-100">RAILWAYS</SelectItem>
              <SelectItem value="banking" className="focus:bg-amber-900/30 focus:text-amber-100">BANKING</SelectItem>
              <SelectItem value="adre" className="focus:bg-amber-900/30 focus:text-amber-100">ADRE</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
          <Label htmlFor="password" className="text-sm font-medium text-amber-200 font-serif">
            Secret Spell (Password)
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#1A1A2E] border-amber-900/50 text-amber-100 focus:ring-amber-500 focus:border-amber-500"
            placeholder="••••••••"
          />
          <p className="text-amber-200/60 text-xs mt-1 italic">Your spell must be at least 8 characters long</p>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold font-serif py-6 rounded-md shadow-lg shadow-amber-900/30 transition-transform hover:scale-105"
        >
          {loading ? 'Casting Enrollment Spell...' : 'Join MockWizard Academy'}
        </Button>
      </form>

      <div className="mt-8 text-center bg-[#0E1A2D]/60 p-4 rounded-lg border border-amber-900/20">
        <p className="text-amber-200/80 text-sm font-serif">
          By enrolling, you agree to follow the rules of MockWizard Academy and promise not to reveal magical secrets to muggles.
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-amber-200/80 font-serif">
          Already a student at MockWizard?{' '}
          <Link href="/login" className="text-amber-400 hover:underline hover:text-amber-300 transition-colors">
            Return to your studies
          </Link>
        </p>
      </div>
    </div>
  )
}
