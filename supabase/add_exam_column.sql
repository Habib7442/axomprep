-- Add exam column to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS exam TEXT;

-- Update the handle_new_user function to include exam instead of grade
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  random_house TEXT;
  houses TEXT[] := ARRAY['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];
BEGIN
  -- Select a random house
  random_house := houses[floor(random() * 4 + 1)];

  INSERT INTO public.users (
    id,
    email,
    username,
    first_name,
    last_name,
    exam,
    house
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
    COALESCE(NEW.raw_user_meta_data->>'exam', NULL),
    random_house
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
