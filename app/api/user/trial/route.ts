import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

/**
 * Initialize a 7-day free trial for a new user
 */
export async function POST() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
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
      return NextResponse.json({ 
        success: true, 
        message: "Trial already exists for this user" 
      });
    }

    // Calculate trial end date (7 days from now)
    const trialStartDate = new Date();
    const trialEndDate = new Date(trialStartDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Create a new trial record for the user
    const { data, error } = await supabase
      .from('user_trials')
      .insert([
        {
          user_id: userId,
          trial_start_date: trialStartDate.toISOString(),
          trial_end_date: trialEndDate.toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating trial:", error);
      return NextResponse.json({ error: "Failed to create trial" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "7-day free trial initialized successfully",
      trial: data
    });
  } catch (error) {
    console.error("Error in trial initialization:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * Check if a user has an active trial
 */
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
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
      return NextResponse.json({ 
        hasTrial: false,
        isActive: false,
        message: "No trial found for this user"
      });
    }

    // Check if trial is still active
    const now = new Date();
    const trialEndDate = new Date(trialData.trial_end_date);
    const isActive = now < trialEndDate;

    return NextResponse.json({ 
      hasTrial: true,
      isActive,
      trialStartDate: trialData.trial_start_date,
      trialEndDate: trialData.trial_end_date,
      daysRemaining: Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    });
  } catch (error) {
    console.error("Error checking trial status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}