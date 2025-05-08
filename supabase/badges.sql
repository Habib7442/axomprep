-- Create badges table
CREATE TABLE IF NOT EXISTS public.badges (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL, -- Icon identifier (e.g., 'star', 'trophy', 'wand')
  category TEXT NOT NULL, -- Category (e.g., 'achievement', 'milestone', 'special')
  tier TEXT NOT NULL, -- Tier (e.g., 'bronze', 'silver', 'gold', 'platinum')
  requirements JSONB, -- JSON with requirements to earn the badge
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_badges table to track which users have which badges
CREATE TABLE IF NOT EXISTS public.user_badges (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id INTEGER REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, badge_id)
);

-- Row Level Security Policies
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Badges are viewable by all authenticated users
CREATE POLICY "Badges are viewable by all authenticated users"
  ON public.badges
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Users can view their own badges
CREATE POLICY "Users can view their own badges"
  ON public.user_badges
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can view all user badges (for leaderboard)
CREATE POLICY "Users can view all user badges"
  ON public.user_badges
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Insert sample badges
INSERT INTO public.badges (name, description, icon, category, tier, requirements)
VALUES
  ('First Spell', 'Complete your first mock test', 'wand', 'achievement', 'bronze', '{"tests_completed": 1}'),
  ('Perfect Score', 'Score 100% on any mock test', 'star', 'achievement', 'gold', '{"perfect_score": true}'),
  ('Test Master', 'Complete 5 mock tests', 'scroll', 'milestone', 'silver', '{"tests_completed": 5}'),
  ('Math Wizard', 'Complete 10 mock tests', 'wizard-hat', 'milestone', 'gold', '{"tests_completed": 10}'),
  ('Consistent Learner', 'Complete tests on 3 consecutive days', 'calendar', 'achievement', 'silver', '{"consecutive_days": 3}'),
  ('Quick Thinker', 'Complete a test in half the allotted time', 'clock', 'achievement', 'gold', '{"time_efficiency": 0.5}'),
  ('House Champion', 'Earn the most points for your house in a week', 'trophy', 'special', 'platinum', '{"house_champion": true}'),
  ('Perfect Attendance', 'Log in for 7 consecutive days', 'streak', 'milestone', 'bronze', '{"login_streak": 7}'),
  ('Rising Star', 'Improve your score by 20% on a retake', 'arrow-up', 'achievement', 'silver', '{"score_improvement": 0.2}'),
  ('Grand Wizard', 'Earn all other badges', 'crown', 'special', 'platinum', '{"all_badges": true}');

-- Create a function to award badges automatically
CREATE OR REPLACE FUNCTION award_badge()
RETURNS TRIGGER AS $$
DECLARE
  badge_id INTEGER;
  tests_completed INTEGER;
  perfect_score BOOLEAN;
BEGIN
  -- Count completed tests
  SELECT COUNT(*) INTO tests_completed
  FROM public.mock_test_results
  WHERE user_id = NEW.user_id;
  
  -- Check for perfect score
  perfect_score := (NEW.score = NEW.total_marks);
  
  -- First Spell badge
  IF tests_completed = 1 THEN
    SELECT id INTO badge_id FROM public.badges WHERE name = 'First Spell';
    IF badge_id IS NOT NULL THEN
      INSERT INTO public.user_badges (user_id, badge_id)
      VALUES (NEW.user_id, badge_id)
      ON CONFLICT (user_id, badge_id) DO NOTHING;
    END IF;
  END IF;
  
  -- Perfect Score badge
  IF perfect_score THEN
    SELECT id INTO badge_id FROM public.badges WHERE name = 'Perfect Score';
    IF badge_id IS NOT NULL THEN
      INSERT INTO public.user_badges (user_id, badge_id)
      VALUES (NEW.user_id, badge_id)
      ON CONFLICT (user_id, badge_id) DO NOTHING;
    END IF;
  END IF;
  
  -- Test Master badge
  IF tests_completed = 5 THEN
    SELECT id INTO badge_id FROM public.badges WHERE name = 'Test Master';
    IF badge_id IS NOT NULL THEN
      INSERT INTO public.user_badges (user_id, badge_id)
      VALUES (NEW.user_id, badge_id)
      ON CONFLICT (user_id, badge_id) DO NOTHING;
    END IF;
  END IF;
  
  -- Math Wizard badge
  IF tests_completed = 10 THEN
    SELECT id INTO badge_id FROM public.badges WHERE name = 'Math Wizard';
    IF badge_id IS NOT NULL THEN
      INSERT INTO public.user_badges (user_id, badge_id)
      VALUES (NEW.user_id, badge_id)
      ON CONFLICT (user_id, badge_id) DO NOTHING;
    END IF;
  END IF;
  
  -- Quick Thinker badge
  IF NEW.time_taken <= (SELECT timeLimit * 30 FROM public.mock_tests WHERE id = NEW.test_id) THEN
    SELECT id INTO badge_id FROM public.badges WHERE name = 'Quick Thinker';
    IF badge_id IS NOT NULL THEN
      INSERT INTO public.user_badges (user_id, badge_id)
      VALUES (NEW.user_id, badge_id)
      ON CONFLICT (user_id, badge_id) DO NOTHING;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to award badges on test completion
CREATE TRIGGER on_test_completion
  AFTER INSERT ON public.mock_test_results
  FOR EACH ROW EXECUTE FUNCTION award_badge();
