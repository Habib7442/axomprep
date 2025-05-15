-- Create tables for MathQuest Phase 1

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  grade INTEGER,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a function to generate a random username
CREATE OR REPLACE FUNCTION generate_random_username(first_name TEXT, last_name TEXT)
RETURNS TEXT AS $$
DECLARE
  base_username TEXT;
  random_suffix TEXT;
  full_username TEXT;
  username_exists BOOLEAN;
BEGIN
  -- Create base username from first letter of first name and last name
  base_username := LOWER(LEFT(first_name, 1) || last_name);

  -- Remove spaces and special characters
  base_username := REGEXP_REPLACE(base_username, '[^a-zA-Z0-9]', '', 'g');

  -- Try up to 10 times to generate a unique username
  FOR i IN 1..10 LOOP
    -- Generate a random 4-digit number
    random_suffix := LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');

    -- Combine base username with random suffix
    full_username := base_username || random_suffix;

    -- Check if username exists
    SELECT EXISTS(SELECT 1 FROM public.users WHERE username = full_username) INTO username_exists;

    -- If username doesn't exist, return it
    IF NOT username_exists THEN
      RETURN full_username;
    END IF;
  END LOOP;

  -- If we couldn't generate a unique username after 10 tries, add timestamp
  RETURN base_username || random_suffix || EXTRACT(EPOCH FROM NOW())::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  grade INTEGER NOT NULL,
  topic TEXT NOT NULL,
  content_markdown TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Problems table
CREATE TABLE IF NOT EXISTS public.problems (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER REFERENCES public.lessons(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'input', 'mcq', etc.
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  options JSONB, -- For MCQs
  difficulty INTEGER DEFAULT 1,
  hints TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES public.lessons(id) ON DELETE CASCADE,
  problem_id INTEGER REFERENCES public.problems(id) ON DELETE CASCADE,
  status TEXT NOT NULL, -- 'completed', 'in_progress', 'not_started'
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, problem_id)
);

-- Row Level Security Policies

-- Users table policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- Lessons table policies
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lessons are viewable by all authenticated users"
  ON public.lessons
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Problems table policies
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Problems are viewable by all authenticated users"
  ON public.problems
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- User progress table policies
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own progress"
  ON public.user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.user_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON public.user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    username,
    first_name,
    last_name,
    grade
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username',
            generate_random_username(
              COALESCE(NEW.raw_user_meta_data->>'first_name', 'user'),
              COALESCE(NEW.raw_user_meta_data->>'last_name', 'user')
            )),
    COALESCE(NEW.raw_user_meta_data->>'first_name', NULL),
    COALESCE(NEW.raw_user_meta_data->>'last_name', NULL),
    CASE
      WHEN NEW.raw_user_meta_data->>'grade' IS NULL THEN NULL
      WHEN NEW.raw_user_meta_data->>'grade' = '' THEN NULL
      ELSE (NEW.raw_user_meta_data->>'grade')::INTEGER
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sample data for Phase 1
INSERT INTO public.lessons (title, description, grade, topic, content_markdown)
VALUES
  ('Introduction to Linear Equations', 'Learn the basics of linear equations and how to solve them.', 8, 'Algebra', '# Introduction to Linear Equations\n\nLinear equations are equations where the variable has a power of 1. They take the form of ax + b = c, where a, b, and c are constants.\n\n## Example\n\nLet''s solve 2x + 3 = 7\n\n1. Subtract 3 from both sides: 2x = 4\n2. Divide both sides by 2: x = 2\n\nTherefore, x = 2 is the solution.'),
  ('Solving Systems of Equations', 'Discover methods for solving systems of linear equations.', 8, 'Algebra', '# Solving Systems of Equations\n\nA system of equations consists of two or more equations with the same variables. We can solve them using substitution or elimination.\n\n## Example\n\nLet''s solve the system:\nx + y = 5\nx - y = 1\n\nUsing elimination:\nAdd the two equations: 2x = 6\nTherefore, x = 3\n\nSubstitute back: 3 + y = 5\nTherefore, y = 2\n\nThe solution is (3, 2).'),
  ('Graphing Linear Equations', 'Visualize linear equations on the coordinate plane.', 8, 'Algebra', '# Graphing Linear Equations\n\nLinear equations can be graphed on a coordinate plane. The graph of a linear equation is a straight line.\n\n## Example\n\nLet''s graph y = 2x + 1\n\n1. Find the y-intercept: When x = 0, y = 1\n2. Find another point: When x = 1, y = 3\n3. Plot these points and draw a line through them.\n\nThe line represents all solutions to the equation.'),
  ('Introduction to Quadratic Equations', 'Explore quadratic equations and their properties.', 9, 'Algebra', '# Introduction to Quadratic Equations\n\nQuadratic equations are equations where the highest power of the variable is 2. They take the form of ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0.\n\n## Example\n\nLet''s solve x² - 5x + 6 = 0\n\nUsing factoring: (x - 2)(x - 3) = 0\nTherefore, x = 2 or x = 3\n\nThe solutions are x = 2 and x = 3.'),
  ('Factoring Polynomials', 'Learn techniques for factoring polynomial expressions.', 9, 'Algebra', '# Factoring Polynomials\n\nFactoring is the process of finding expressions that multiply together to give a polynomial.\n\n## Example\n\nLet''s factor x² + 5x + 6\n\nWe need to find two numbers that multiply to give 6 and add to give 5.\nThese numbers are 2 and 3.\n\nTherefore, x² + 5x + 6 = (x + 2)(x + 3)');

INSERT INTO public.problems (lesson_id, type, question, answer, options, difficulty, hints)
VALUES
  (1, 'input', 'Solve for x: 2x + 3 = 7', '2', NULL, 1, ARRAY['Subtract 3 from both sides', 'Divide both sides by 2']),
  (1, 'input', 'Solve for x: 3x - 4 = 8', '4', NULL, 1, ARRAY['Add 4 to both sides', 'Divide both sides by 3']),
  (1, 'mcq', 'Which of the following is the solution to 4x + 2 = 10?', '2', '["1", "2", "3", "4"]', 1, ARRAY['Subtract 2 from both sides', 'Divide both sides by 4']),
  (1, 'mcq', 'What is the first step to solve 5x - 3 = 12?', 'Add 3 to both sides', '["Subtract 3 from both sides", "Add 3 to both sides", "Divide both sides by 5", "Multiply both sides by 5"]', 1, ARRAY['You need to isolate the variable term']),
  (1, 'input', 'Solve for x: 7x + 14 = 0', '-2', NULL, 2, ARRAY['Subtract 14 from both sides', 'Divide both sides by 7']),

  (2, 'input', 'If x + y = 5 and x - y = 3, what is the value of x?', '4', NULL, 2, ARRAY['Add the two equations', 'Divide by 2']),
  (2, 'input', 'If x + y = 5 and x - y = 3, what is the value of y?', '1', NULL, 2, ARRAY['Substitute the value of x back into either equation']),
  (2, 'mcq', 'Which method can be used to solve a system of linear equations?', 'All of the above', '["Substitution", "Elimination", "Graphing", "All of the above"]', 1, ARRAY['Think about all the methods we discussed']),
  (2, 'mcq', 'In the system: 2x + y = 5 and x - y = 1, what is the value of x?', '2', '["1", "2", "3", "4"]', 2, ARRAY['Try using elimination by adding the equations']),
  (2, 'input', 'If 3x + 2y = 12 and x + y = 5, what is the value of x?', '2', NULL, 2, ARRAY['Multiply the second equation by -2', 'Add the equations']),

  (3, 'mcq', 'What is the y-intercept of the line y = 3x + 4?', '4', '["0", "3", "4", "-4"]', 1, ARRAY['The y-intercept is where x = 0']),
  (3, 'mcq', 'What is the slope of the line y = 2x - 5?', '2', '["2", "-5", "5", "-2"]', 1, ARRAY['In the form y = mx + b, m is the slope']),
  (3, 'input', 'What is the slope of the line passing through the points (2, 3) and (4, 7)?', '2', NULL, 2, ARRAY['Use the slope formula: (y₂ - y₁)/(x₂ - x₁)']),
  (3, 'mcq', 'Which of the following is the equation of a horizontal line?', 'y = 3', '["x = 3", "y = 3", "y = 2x", "y = x + 3"]', 1, ARRAY['A horizontal line has a constant y-value']),
  (3, 'input', 'What is the y-intercept of the line 2x + 3y = 6?', '2', NULL, 2, ARRAY['Set x = 0 and solve for y']),

  (4, 'input', 'Solve for x: x² - 5x + 6 = 0', '2, 3', NULL, 2, ARRAY['Try factoring the expression', 'Look for factors of 6 that add up to -5']),
  (4, 'mcq', 'Which of the following is a solution to x² - 4x - 5 = 0?', '5', '["1", "3", "5", "-1"]', 2, ARRAY['Try factoring the expression', 'Look for factors of -5 that add up to -4']),
  (4, 'input', 'Solve for x: x² - 9 = 0', '3, -3', NULL, 1, ARRAY['This is a difference of squares', 'Factor as (x+3)(x-3)']),
  (4, 'mcq', 'What is the discriminant of x² - 6x + 9 = 0?', '0', '["0", "36", "-36", "6"]', 2, ARRAY['The discriminant is b² - 4ac', 'a = 1, b = -6, c = 9']),
  (4, 'input', 'Solve for x: 2x² - 5x - 3 = 0', '3, -0.5', NULL, 3, ARRAY['Try factoring the expression', 'Look for factors of -6 that add up to -5']),

  (5, 'mcq', 'Which of the following is the factored form of x² + 7x + 12?', '(x + 3)(x + 4)', '["(x + 3)(x + 4)", "(x + 6)(x + 2)", "(x + 3)(x - 4)", "(x - 3)(x - 4)"]', 2, ARRAY['Look for factors of 12 that add up to 7']),
  (5, 'input', 'Factor completely: x² - 16', '(x+4)(x-4)', NULL, 1, ARRAY['This is a difference of squares', 'a² - b² = (a+b)(a-b)']),
  (5, 'mcq', 'Which of the following is the factored form of 2x² + 7x + 3?', '(2x + 1)(x + 3)', '["(2x + 1)(x + 3)", "(2x + 3)(x + 1)", "(x + 1)(2x + 3)", "(x - 1)(2x - 3)"]', 3, ARRAY['Try different combinations of factors']),
  (5, 'input', 'Factor completely: x² + 6x + 9', '(x+3)²', NULL, 1, ARRAY['This is a perfect square trinomial', 'a² + 2ab + b² = (a+b)²']),
  (5, 'mcq', 'Which of the following cannot be factored using real numbers?', 'x² + 1', '["x² - 1", "x² + 2x + 1", "x² + 1", "x² - 2x + 1"]', 2, ARRAY['Check if each expression has real roots']);



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

-- Add RLS policies for platform feedback
ALTER TABLE public.platform_feedback ENABLE ROW LEVEL SECURITY;

-- Users can insert their own feedback
CREATE POLICY "Users can insert platform feedback"
  ON public.platform_feedback
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Users can view their own feedback
CREATE POLICY "Users can view their own platform feedback"
  ON public.platform_feedback
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view and update all feedback
CREATE POLICY "Admins can view all platform feedback"
  ON public.platform_feedback
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow public access to view approved feedback (for home page)
CREATE POLICY "Public can view approved platform feedback"
  ON public.platform_feedback
  FOR SELECT
  USING (is_approved = true);
