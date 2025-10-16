"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

/**
 * Check if a user has an active trial
 * This is a server-side function that can be used in components that require server-side rendering
 */
export async function checkUserTrialStatus() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { 
        hasTrial: false,
        isActive: false,
        error: "User not authenticated"
      };
    }

    const supabase = createSupabaseClient();

    // Get user's trial information
    const { data: trialData, error } = await supabase
      .from('user_trials')
      .select('trial_start_date, trial_end_date')
      .eq('user_id', userId)
      .single();

    if (error) {
      // If no trial record exists, user doesn't have a trial
      return { 
        hasTrial: false,
        isActive: false,
        message: "No trial found for this user"
      };
    }

    // Check if trial is still active
    const now = new Date();
    const trialEndDate = new Date(trialData.trial_end_date);
    const isActive = now < trialEndDate;

    return { 
      hasTrial: true,
      isActive,
      trialStartDate: trialData.trial_start_date,
      trialEndDate: trialData.trial_end_date,
      daysRemaining: Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    };
  } catch (error) {
    console.error("Error checking trial status:", error);
    return { 
      hasTrial: false,
      isActive: false,
      error: "Internal server error"
    };
  }
}

/**
 * Initialize a 7-day free trial for a new user
 * This is a server-side function that can be used in components that require server-side rendering
 */
export async function initializeUserTrial() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { 
        success: false,
        error: "User not authenticated"
      };
    }

    const supabase = createSupabaseClient();

    // Check if user already has a trial record
    const { data: existingTrial, error: fetchError } = await supabase
      .from('user_trials')
      .select('id')
      .eq('user_id', userId)
      .single();

    // If user already has a trial, return success
    if (existingTrial) {
      return { 
        success: true,
        message: "Trial already exists for this user" 
      };
    }

    // Create a new trial record for the user (trial end date will be set automatically by the trigger)
    const { data, error } = await supabase
      .from('user_trials')
      .insert([
        {
          user_id: userId,
          trial_start_date: new Date().toISOString()
          // trial_end_date will be set automatically by the database trigger
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating trial:", error);
      return { 
        success: false,
        error: "Failed to create trial"
      };
    }

    return { 
      success: true,
      message: "7-day free trial initialized successfully",
      trial: data
    };
  } catch (error) {
    console.error("Error in trial initialization:", error);
    return { 
      success: false,
      error: "Internal server error"
    };
  }
}