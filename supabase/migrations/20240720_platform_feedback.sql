-- Create platform feedback table to store general user feedback about the platform
CREATE TABLE IF NOT EXISTS public.platform_feedback (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- Name of the person giving feedback (could be anonymous)
  rating INTEGER NOT NULL, -- Rating from 1-5
  feedback_text TEXT NOT NULL, -- Feedback text
  is_approved BOOLEAN DEFAULT false, -- Whether the feedback is approved for public display
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add RLS policies
ALTER TABLE public.platform_feedback ENABLE ROW LEVEL SECURITY;

-- Users can insert their own feedback
CREATE POLICY "Users can insert their own feedback"
  ON public.platform_feedback
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Users can view their own feedback
CREATE POLICY "Users can view their own feedback"
  ON public.platform_feedback
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view and update all feedback
CREATE POLICY "Admins can view all feedback"
  ON public.platform_feedback
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow public access to view approved feedback (for home page)
CREATE POLICY "Public can view approved feedback"
  ON public.platform_feedback
  FOR SELECT
  USING (is_approved = true);
