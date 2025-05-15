-- Create mock test answers table to store user answers for each question
CREATE TABLE IF NOT EXISTS public.mock_test_answers (
  id SERIAL PRIMARY KEY,
  result_id INTEGER REFERENCES public.mock_test_results(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL, -- Corresponds to the question ID in the mock test data
  answer TEXT NOT NULL, -- The user's answer
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS mock_test_answers_result_id_idx ON public.mock_test_answers(result_id);

-- Row Level Security Policies
ALTER TABLE public.mock_test_answers ENABLE ROW LEVEL SECURITY;

-- Users can view their own answers
CREATE POLICY "Users can view their own answers"
  ON public.mock_test_answers
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.mock_test_results
      WHERE public.mock_test_results.id = result_id
      AND public.mock_test_results.user_id = auth.uid()
    )
  );

-- Users can insert their own answers
CREATE POLICY "Users can insert their own answers"
  ON public.mock_test_answers
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.mock_test_results
      WHERE public.mock_test_results.id = result_id
      AND public.mock_test_results.user_id = auth.uid()
    )
  );
