'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface Feedback {
  id: number
  name: string
  rating: number
  feedback_text: string
  created_at: string
}

export default function PlatformFeedbackDisplay() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const { data, error } = await supabase
          .from('platform_feedback')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false })
          .limit(5)

        if (error) {
          throw error
        }

        setFeedback(data || [])
      } catch (error) {
        console.error('Error fetching feedback:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [supabase])

  // Star rating display component
  const StarRatingDisplay = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-amber-500 text-amber-500'
                : 'text-amber-300'
            }`}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-2 border-amber-800/30 bg-amber-50/80 p-4">
            <CardContent className="p-0">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (feedback.length === 0) {
    return (
      <Card className="border-2 border-amber-800/30 bg-amber-50/80 p-4">
        <CardContent className="p-0 text-center text-amber-700">
          No feedback available yet. Be the first to share your thoughts!
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <Card key={item.id} className="border-2 border-amber-800/30 bg-amber-50/80 p-4">
          <CardContent className="p-0">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-amber-700 text-white p-2 rounded-full">
                <Quote className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-amber-900">{item.name}</h4>
                  <StarRatingDisplay rating={item.rating} />
                </div>
                <p className="mt-2 text-amber-800">{item.feedback_text}</p>
                <p className="mt-1 text-xs text-amber-600">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
