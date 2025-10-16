import { createSupabaseClient } from "@/lib/supabase";

/**
 * Check if a user is currently on a free trial
 * @param userId The user ID to check
 * @returns Boolean indicating if user is on trial
 */
export async function isUserOnTrial(userId: string): Promise<boolean> {
  try {
    if (!userId) {
      return false;
    }

    const supabase = createSupabaseClient();
    
    // Get user's trial information
    const { data: trialData, error } = await supabase
      .from('user_trials')
      .select('trial_end_date')
      .eq('user_id', userId)
      .single();

    if (error || !trialData) {
      return false;
    }

    // Check if trial is still active
    const now = new Date();
    const trialEndDate = new Date(trialData.trial_end_date);
    return now < trialEndDate;
  } catch (error) {
    console.error("Error checking trial status:", error);
    return false;
  }
}

/**
 * Get trial details for a user
 * @param userId The user ID to check
 * @returns Trial details or null if not on trial
 */
export async function getUserTrialDetails(userId: string): Promise<{
  trialStartDate: string;
  trialEndDate: string;
  daysRemaining: number;
} | null> {
  try {
    if (!userId) {
      return null;
    }

    const supabase = createSupabaseClient();
    
    // Get user's trial information
    const { data: trialData, error } = await supabase
      .from('user_trials')
      .select('trial_start_date, trial_end_date')
      .eq('user_id', userId)
      .single();

    if (error || !trialData) {
      return null;
    }

    // Check if trial is still active
    const now = new Date();
    const trialEndDate = new Date(trialData.trial_end_date);
    
    if (now >= trialEndDate) {
      return null; // Trial has expired
    }

    const daysRemaining = Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      trialStartDate: trialData.trial_start_date,
      trialEndDate: trialData.trial_end_date,
      daysRemaining
    };
  } catch (error) {
    console.error("Error getting trial details:", error);
    return null;
  }
}