-- Create user_trials table
CREATE TABLE IF NOT EXISTS user_trials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  trial_start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  trial_end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_trials_user_id ON user_trials(user_id);
CREATE INDEX IF NOT EXISTS idx_user_trials_trial_end_date ON user_trials(trial_end_date);

-- Enable Row Level Security
ALTER TABLE user_trials ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own trial information" 
  ON user_trials FOR SELECT 
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own trial information" 
  ON user_trials FOR INSERT 
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own trial information" 
  ON user_trials FOR UPDATE 
  USING (auth.uid()::text = user_id);