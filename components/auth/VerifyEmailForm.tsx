'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function VerifyEmailForm() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUserEmail() {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/login')
        return
      }
      
      setEmail(user.email)
      setLoading(false)
    }
    
    getUserEmail()
  }, [router, supabase])

  const handleResendVerification = async () => {
    if (!email) return
    
    setResendLoading(true)
    setError(null)
    setResendSuccess(false)
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email
      })
      
      if (error) {
        setError(error.message)
      } else {
        setResendSuccess(true)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setResendLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <svg className="h-10 w-10 text-yellow-400 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 10h2v2h-2v-2zm0-6h2v4h-2v-4z" />
            </svg>
          </div>
          <CardTitle className="text-xl font-semibold text-white">Verify Your Email</CardTitle>
          <CardDescription className="text-gray-300">
            We've sent a verification email to <span className="font-medium text-yellow-400">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400 text-sm">
            Please check your inbox and click the verification link to activate your account.
          </p>
          
          {error && (
            <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {resendSuccess && (
            <div className="p-3 bg-green-900/50 border border-green-500 text-green-200 rounded-md text-sm">
              Verification email resent successfully!
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            onClick={handleResendVerification}
            disabled={resendLoading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
          >
            {resendLoading ? 'Sending...' : 'Resend Verification Email'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="w-full border-gray-600 text-gray-300 hover:text-white"
          >
            Sign Out
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Need help? <a href="mailto:support@mathsquest.com" className="text-yellow-400 hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  )
}
