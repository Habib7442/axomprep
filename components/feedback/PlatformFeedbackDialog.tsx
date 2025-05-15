'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Star } from 'lucide-react'

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  rating: z.number().min(1, { message: "Please provide a rating" }).max(5),
  feedbackText: z.string().min(10, { message: "Feedback must be at least 10 characters" }),
})

type FormValues = z.infer<typeof formSchema>

interface PlatformFeedbackDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  userId: string
  userName?: string
}

export default function PlatformFeedbackDialog({
  isOpen,
  onOpenChange,
  userId,
  userName,
}: PlatformFeedbackDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rating, setRating] = useState(0)
  const supabase = createClient()

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userName || '',
      rating: 0,
      feedbackText: '',
    },
  })

  // Handle form submission
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      // Insert feedback into Supabase
      const { error } = await supabase.from('platform_feedback').insert({
        user_id: userId,
        name: values.name,
        rating: values.rating,
        feedback_text: values.feedbackText,
      })

      if (error) {
        throw error
      }

      toast.success('Thank you for your feedback! It will be reviewed and may appear on our home page.')
      
      // Reset form and close dialog
      form.reset()
      setRating(0)
      onOpenChange(false)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      toast.error('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Star rating component
  const StarRating = ({ 
    value, 
    onChange 
  }: { 
    value: number, 
    onChange: (value: number) => void 
  }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => {
              onChange(star)
              form.setValue('rating', star)
            }}
            className="focus:outline-none"
          >
            <Star
              className={`h-8 w-8 ${
                star <= value
                  ? 'fill-amber-500 text-amber-500'
                  : 'text-amber-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-amber-50 border-2 border-amber-800/30 max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-amber-800 font-serif text-xl">
            Your Feedback Matters!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-amber-700">
            Please share your thoughts to help us improve the MockWizard experience.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-amber-800 font-serif">
                    Your Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="bg-amber-900/10 border-amber-600/30 text-amber-900 placeholder:text-amber-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-amber-800 font-serif">
                    How would you rate MockWizard?
                  </FormLabel>
                  <FormControl>
                    <StarRating value={rating} onChange={setRating} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedbackText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-amber-800 font-serif">
                    Your Feedback
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts, suggestions, or experiences with MockWizard..."
                      className="bg-amber-900/10 border-amber-600/30 text-amber-900 placeholder:text-amber-900 min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-amber-600 text-xs">
                    Your feedback may be displayed on our home page after review.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel className="border-2 border-amber-800 text-amber-800 hover:bg-amber-100">
                Skip
              </AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
