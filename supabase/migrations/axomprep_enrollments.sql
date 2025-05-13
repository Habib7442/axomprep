-- Create the axomprep_enrollments table
CREATE TABLE IF NOT EXISTS axomprep_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  class TEXT NOT NULL,
  address TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  user_id UUID REFERENCES auth.users(id)
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS axomprep_enrollments_email_idx ON axomprep_enrollments(email);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS axomprep_enrollments_status_idx ON axomprep_enrollments(status);

-- Enable Row Level Security
ALTER TABLE axomprep_enrollments ENABLE ROW LEVEL SECURITY;

-- Create policies for different user roles

-- 1. Allow anyone to insert their own enrollment (no auth required for enrollment)
CREATE POLICY "Anyone can insert enrollments" 
ON axomprep_enrollments
FOR INSERT 
TO public
WITH CHECK (true);

-- 2. Users can view their own enrollments if authenticated
CREATE POLICY "Users can view their own enrollments" 
ON axomprep_enrollments
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

-- 3. Only admins can view all enrollments
CREATE POLICY "Admins can view all enrollments" 
ON axomprep_enrollments
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email LIKE '%@axomprep.com'
  )
);

-- 4. Only admins can update enrollments
CREATE POLICY "Admins can update enrollments" 
ON axomprep_enrollments
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email LIKE '%@axomprep.com'
  )
);

-- 5. Only admins can delete enrollments
CREATE POLICY "Admins can delete enrollments" 
ON axomprep_enrollments
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email LIKE '%@axomprep.com'
  )
);
