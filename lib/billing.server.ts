import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "./supabase";

/**
 * User plan types
 */
export type PlanType = 'free' | 'basic' | 'pro';

/**
 * Feature types for interview platform
 */
export type FeatureType = 
  | 'companions_limit'
  | 'interviews_per_month'
  | 'stories_per_month'
  | 'resume_analysis'
  | 'advanced_reporting'
  | 'priority_support';

/**
 * Plan feature limits for interview platform
 */
export interface PlanFeatures {
  companionsLimit: number;
  interviewsPerMonth: number;
  storiesPerMonth: number;
  resumeAnalysis: boolean;
  advancedReporting: boolean;
  prioritySupport: boolean;
}

/**
 * Get the base interview limit based on user's plan
 */
async function getBaseInterviewLimit(): Promise<number> {
  try {
    const { has } = await auth();
    
    // Check if user has pro plan (unlimited interviews)
    if (has({ plan: 'pro' })) {
      return 100; // Effectively unlimited
    }

    // Check if user has basic plan
    if (has({ plan: 'basic' })) {
      return 10;
    }

    // Free plan default
    return 10;
  } catch (error) {
    console.error("Error in getBaseInterviewLimit:", error);
    return 10; // Default to free plan limit
  }
}

/**
 * Get user's additional interview credits
 */
async function getUserAdditionalCredits(userId: string): Promise<number> {
  try {
    const supabase = createSupabaseClient();
    
    const { data, error } = await supabase
      .from('user_interview_credits')
      .select('additional_credits')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching user additional credits:", error);
      return 0;
    }

    return data?.additional_credits || 0;
  } catch (error) {
    console.error("Error in getUserAdditionalCredits:", error);
    return 0;
  }
}

/**
 * Add interview credit to user
 */
export async function addInterviewCredit(userId: string): Promise<boolean> {
  try {
    const supabase = createSupabaseClient();
    
    // First, try to update existing record
    // Get current value and increment it
    const { data: currentData, error: selectError } = await supabase
      .from('user_interview_credits')
      .select('additional_credits')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (selectError) {
      console.error("Error fetching current credits:", selectError);
      return false;
    }
    
    const currentCredits = currentData?.additional_credits || 0;
    const newCredits = currentCredits + 1;
    
    const { data: updateData, error: updateError } = await supabase
      .from('user_interview_credits')
      .update({ 
        additional_credits: newCredits,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select();

    // If no record was updated, insert a new one
    if ((!updateData || updateData.length === 0) && !updateError) {
      const { error: insertError } = await supabase
        .from('user_interview_credits')
        .insert({
          user_id: userId,
          additional_credits: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (insertError) {
        console.error("Error inserting user interview credits:", insertError);
        return false;
      }
    } else if (updateError) {
      // If update failed, try insert
      const { error: insertError } = await supabase
        .from('user_interview_credits')
        .insert({
          user_id: userId,
          additional_credits: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (insertError) {
        console.error("Error inserting user interview credits:", insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error in addInterviewCredit:", error);
    return false;
  }
}

/**
 * Get the current user's plan features (SERVER VERSION)
 */
export async function getUserPlanFeaturesServer(): Promise<PlanFeatures> {
  try {
    const { userId, has } = await auth();
    
    if (!userId) {
      return {
        companionsLimit: 0,
        interviewsPerMonth: 0,
        storiesPerMonth: 0,
        resumeAnalysis: false,
        advancedReporting: false,
        prioritySupport: false
      };
    }

    // Check if user is within their 7-day free trial period
    const supabase = createSupabaseClient();
    const { data: trialData, error: trialError } = await supabase
      .from('user_trials')
      .select('trial_end_date')
      .eq('user_id', userId)
      .maybeSingle();

    // If user has an active trial, provide trial benefits
    if (!trialError && trialData) {
      const now = new Date();
      const trialEndDate = new Date(trialData.trial_end_date);
      
      if (now < trialEndDate) {
        // During trial: 3 companions, 10 interviews, 2 stories per month (same as free plan)
        return {
          companionsLimit: 3,
          interviewsPerMonth: 10,
          storiesPerMonth: 2,
          resumeAnalysis: true,
          advancedReporting: false,
          prioritySupport: false
        };
      }
    }

    // Check if user has pro plan (Pro Companion - $20/month)
    if (has({ plan: 'pro' })) {
      return {
        companionsLimit: 50,
        interviewsPerMonth: 100, // Unlimited
        storiesPerMonth: 100, // Unlimited
        resumeAnalysis: true,
        advancedReporting: true,
        prioritySupport: true
      };
    }

    // Check if user has basic plan (Basic Core Learner - $10/month)
    if (has({ plan: 'basic' })) {
      return {
        companionsLimit: 10,
        interviewsPerMonth: 10,
        storiesPerMonth: 10,
        resumeAnalysis: true,
        advancedReporting: false,
        prioritySupport: false
      };
    }

    // Free plan - 3 companions, 10 interviews, 2 stories per month
    return {
      companionsLimit: 3,
      interviewsPerMonth: 10,
      storiesPerMonth: 2,
      resumeAnalysis: true, // Allow resume analysis for free users
      advancedReporting: false,
      prioritySupport: false
    };
  } catch (error) {
    console.error("Error in getUserPlanFeaturesServer:", error);
    // Return default free plan features on error
    return {
      companionsLimit: 3,
      interviewsPerMonth: 10,
      storiesPerMonth: 2,
      resumeAnalysis: true, // Allow resume analysis for free users
      advancedReporting: false,
      prioritySupport: false
    };
  }
}

/**
 * Check if user can create a new companion based on their plan (SERVER VERSION)
 */
export async function canCreateCompanionServer(): Promise<boolean> {
  try {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();

    if (!userId) return false;

    // Check if user is within their 7-day free trial period
    const { data: trialData, error: trialError } = await supabase
      .from('user_trials')
      .select('trial_end_date')
      .eq('user_id', userId)
      .maybeSingle();

    // If user has an active trial, check against trial limits
    if (!trialError && trialData) {
      const now = new Date();
      const trialEndDate = new Date(trialData.trial_end_date);
      
      if (now < trialEndDate) {
        // During trial: limit to 3 companions (same as free plan)
        const { data: companions, error } = await supabase
          .from('companions')
          .select('id', { count: 'exact' })
          .eq('author', userId);

        if (error) {
          console.error("Error checking companion count:", error);
          // If we can't check the count, do NOT allow creation to avoid bypassing limits
          return false;
        }

        const companionCount = companions?.length || 0;
        return companionCount < 3; // Trial limit: 3 companions (same as free plan)
      }
    }

    // Check if user has pro plan first (unlimited companions)
    if (has({ plan: 'pro' })) {
      return true;
    }

    // For basic plan, check companion limit
    let companionLimit = 0;
    if (has({ plan: 'basic' })) {
      companionLimit = 10;
    } else {
      // Free plan default (including basic without specific feature)
      companionLimit = 3;
    }

    // Check current companion count
    const { data: companions, error } = await supabase
      .from('companions')
      .select('id', { count: 'exact' })
      .eq('author', userId);

    if (error) {
      console.error("Error checking companion count:", error);
      // If we can't check the count, do NOT allow creation to avoid bypassing limits
      return false;
    }

    const companionCount = companions?.length || 0;
    return companionCount < companionLimit;
  } catch (error) {
    console.error("Error in canCreateCompanionServer:", error);
    // If there's any other error, do NOT allow creation to avoid bypassing limits
    return false;
  }
}

/**
 * Check if user can start an interview based on their plan and usage (SERVER VERSION)
 */
/**
 * Check if user can start a story session based on their plan and usage (SERVER VERSION)
 */
export async function canStartStoryServer(): Promise<boolean> {
  try {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();

    if (!userId) return false;

    // Check if user is within their 7-day free trial period
    const { data: trialData, error: trialError } = await supabase
      .from('user_trials')
      .select('trial_end_date')
      .eq('user_id', userId)
      .maybeSingle();

    // If user has an active trial, check against trial limits
    if (!trialError && trialData) {
      const now = new Date();
      const trialEndDate = new Date(trialData.trial_end_date);
      
      if (now < trialEndDate) {
        // During trial: limit to 2 stories per month (same as free plan)
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
        
        const { data: sessions, error } = await supabase
          .from('session_history')
          .select('id', { count: 'exact' })
          .eq('user_id', userId)
          .ilike('topic', 'Story:%')
          .gte('created_at', startOfMonth);

        if (error) {
          console.error("Error checking story session count:", error);
          // If we can't check the count, do NOT allow starting story to avoid bypassing limits
          return false;
        }

        const sessionCount = sessions?.length || 0;
        return sessionCount < 2; // Trial limit: 2 stories per month (same as free plan)
      }
    }

    // For pro plan, unlimited stories
    if (has({ plan: 'pro' })) {
      return true;
    }

    // For basic plan, 10 stories per month
    let storyLimit = 0;
    if (has({ plan: 'basic' })) {
      storyLimit = 10;
    } else {
      // Free plan default
      storyLimit = 2;
    }

    // Check current story session count for this month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
    
    const { data: sessions, error } = await supabase
      .from('session_history')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .ilike('topic', 'Story:%')
      .gte('created_at', startOfMonth);

    if (error) {
      console.error("Error checking story session count:", error);
      // If we can't check the count, do NOT allow starting story to avoid bypassing limits
      return false;
    }

    const sessionCount = sessions?.length || 0;
    return sessionCount < storyLimit;
  } catch (error) {
    console.error("Error in canStartStoryServer:", error);
    // If there's any other error, do NOT allow starting story to avoid bypassing limits
    return false;
  }
}

/**
 * Check if user can start an interview based on their plan and usage (SERVER VERSION)
 */
export async function canStartInterviewServer(): Promise<boolean> {
  try {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();

    if (!userId) return false;

    // Check if user is within their 7-day free trial period
    const { data: trialData, error: trialError } = await supabase
      .from('user_trials')
      .select('trial_end_date')
      .eq('user_id', userId)
      .maybeSingle();

    // If user has an active trial, check against trial limits
    if (!trialError && trialData) {
      const now = new Date();
      const trialEndDate = new Date(trialData.trial_end_date);
      
      if (now < trialEndDate) {
        // During trial: limit to 10 interviews per month (same as free plan)
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
        
        const { data: sessions, error } = await supabase
          .from('session_history')
          .select('id', { count: 'exact' })
          .eq('user_id', userId)
          .is('companion_id', null) // Only count interview practice sessions, not AI tutor sessions
          .gte('created_at', startOfMonth);

        if (error) {
          console.error("Error checking session count:", error);
          // If we can't check the count, do NOT allow starting interview to avoid bypassing limits
          return false;
        }

        const sessionCount = sessions?.length || 0;
        return sessionCount < 10; // Trial limit: 10 interviews per month (same as free plan)
      }
    }

    // Get base interview limit based on plan
    const baseLimit = await getBaseInterviewLimit();
    
    // Get user's additional credits
    const additionalCredits = await getUserAdditionalCredits(userId);
    
    // Total available interviews = base limit + additional credits
    const totalAvailable = baseLimit + additionalCredits;

    // Check current session count for this month (only interview practice sessions)
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
    
    const { data: sessions, error } = await supabase
      .from('session_history')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .is('companion_id', null) // Only count interview practice sessions, not AI tutor sessions
      .gte('created_at', startOfMonth);

    if (error) {
      console.error("Error checking session count:", error);
      // If we can't check the count, do NOT allow starting interview to avoid bypassing limits
      return false;
    }

    const sessionCount = sessions?.length || 0;
    return sessionCount < totalAvailable;
  } catch (error) {
    console.error("Error in canStartInterviewServer:", error);
    // If there's any other error, do NOT allow starting interview to avoid bypassing limits
    return false;
  }
}

/**
 * Check if user has access to a specific feature (SERVER VERSION)
 */
export async function hasFeatureServer(feature: FeatureType): Promise<boolean> {
  try {
    const { userId, has } = await auth();

    if (!userId) return false;

    switch (feature) {
      case 'companions_limit':
        return await canCreateCompanionServer();
      case 'interviews_per_month':
        return await canStartInterviewServer();
      case 'stories_per_month':
        return await canStartStoryServer();
      case 'resume_analysis':
        // Allow resume analysis for ALL users (both authenticated and with any plan)
        // This ensures the feature is available even if Clerk plan detection fails
        return true;
      case 'advanced_reporting':
        return has({ plan: 'pro' });
      case 'priority_support':
        return has({ plan: 'pro' });
      default:
        return false;
    }
  } catch (error) {
    console.error("Error in hasFeatureServer:", error);
    return false;
  }
}

/**
 * Get user's current plan name (SERVER VERSION)
 */
export async function getUserPlanServer(): Promise<PlanType> {
  try {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();

    if (!userId) {
      return 'free';
    }

    // Check if user is within their 7-day free trial period
    const { data: trialData, error: trialError } = await supabase
      .from('user_trials')
      .select('trial_end_date')
      .eq('user_id', userId)
      .maybeSingle();

    // If user has an active trial, return trial status
    if (!trialError && trialData) {
      const now = new Date();
      const trialEndDate = new Date(trialData.trial_end_date);
      
      if (now < trialEndDate) {
        return 'free'; // During trial, show as free plan with enhanced limits
      }
    }

    if (has({ plan: 'pro' })) {
      return 'pro';
    } else if (has({ plan: 'basic' })) {
      return 'basic';
    } else {
      return 'free';
    }
  } catch (error) {
    console.error("Error in getUserPlanServer:", error);
    return 'free';
  }
}

/**
 * Get user's usage data (SERVER VERSION)
 */
export async function getUserUsageServer(): Promise<{ companions: number; interviews: number; stories: number }> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { companions: 0, interviews: 0, stories: 0 };
    }

    try {
      const supabase = createSupabaseClient();
      
      // Get companion count
      const { data: companions, error: companionsError } = await supabase
        .from('companions')
        .select('id', { count: 'exact' })
        .eq('author', userId);

      // Get interview practice sessions count for this month (sessions without companion_id)
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
      const { data: interviewSessions, error: interviewSessionsError } = await supabase
        .from('session_history')
        .select('id', { count: 'exact' })
        .eq('user_id', userId)
        .is('companion_id', null)
        .gte('created_at', startOfMonth);

      // Get story sessions count for this month (sessions with topic starting with 'Story:')
      const { data: storySessions, error: storySessionsError } = await supabase
        .from('session_history')
        .select('id', { count: 'exact' })
        .eq('user_id', userId)
        .ilike('topic', 'Story:%')
        .gte('created_at', startOfMonth);

      // Note: We're not counting AI tutor sessions separately anymore as they're counted as part of the companions limit
      // AI tutor sessions are sessions with a companion_id which are already tracked in the companions count

      return {
        companions: companions?.length || 0,
        interviews: interviewSessions?.length || 0,
        stories: storySessions?.length || 0
      };
    } catch (error) {
      console.error("Error fetching usage data:", error);
      return { companions: 0, interviews: 0, stories: 0 };
    }
  } catch (error) {
    console.error("Error in getUserUsageServer:", error);
    return { companions: 0, interviews: 0, stories: 0 };
  }
}