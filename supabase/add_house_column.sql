-- Add house column to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS house TEXT;

-- Update the handle_new_user function to include random house assignment
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
    grade,
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
    CASE
      WHEN NEW.raw_user_meta_data->>'grade' IS NULL THEN NULL
      WHEN NEW.raw_user_meta_data->>'grade' = '' THEN NULL
      ELSE (NEW.raw_user_meta_data->>'grade')::INTEGER
    END,
    random_house
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update existing users with random houses if they don't have one
DO $$
DECLARE
  user_record RECORD;
  random_house TEXT;
  houses TEXT[] := ARRAY['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];
BEGIN
  FOR user_record IN SELECT id FROM public.users WHERE house IS NULL LOOP
    -- Select a random house
    random_house := houses[floor(random() * 4 + 1)];
    
    -- Update the user
    UPDATE public.users
    SET house = random_house
    WHERE id = user_record.id;
  END LOOP;
END $$;
