-- Create mock test results table for leaderboard
CREATE TABLE IF NOT EXISTS public.mock_test_results (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  test_id TEXT NOT NULL, -- e.g., 'ssc/mock-1'
  score INTEGER NOT NULL,
  total_marks INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  incorrect_answers INTEGER NOT NULL,
  unattempted INTEGER NOT NULL,
  time_taken INTEGER NOT NULL, -- in seconds
  passed BOOLEAN NOT NULL, -- whether the user passed the test (score >= passing_marks)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS mock_test_results_user_id_idx ON public.mock_test_results(user_id);
CREATE INDEX IF NOT EXISTS mock_test_results_test_id_idx ON public.mock_test_results(test_id);

-- Row Level Security Policies
ALTER TABLE public.mock_test_results ENABLE ROW LEVEL SECURITY;

-- Users can view their own results
CREATE POLICY "Users can view their own results"
  ON public.mock_test_results
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own results
CREATE POLICY "Users can insert their own results"
  ON public.mock_test_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can view the leaderboard (all results)
CREATE POLICY "Users can view the leaderboard"
  ON public.mock_test_results
  FOR SELECT
  USING (auth.role() = 'authenticated');

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
