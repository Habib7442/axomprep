-- Alter users table to add first_name, last_name, and grade
ALTER TABLE public.users 
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT,
ADD COLUMN grade INTEGER,
ADD COLUMN username TEXT UNIQUE;

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

-- Update the handle_new_user function to include username generation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, username)
  VALUES (NEW.id, NEW.email, 
          COALESCE(NEW.raw_user_meta_data->>'username', 
                  generate_random_username(
                    COALESCE(NEW.raw_user_meta_data->>'first_name', 'user'),
                    COALESCE(NEW.raw_user_meta_data->>'last_name', 'user')
                  )));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
