"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canCreateCompanionServer } from "../billing.server";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  // console.log("Creating companion for user:", author);
  // console.log("Form data:", formData);

  // Check if user can create a companion by calling our server function directly
  try {
    const canCreate = await canCreateCompanionServer();
    console.log("User can create companion:", canCreate);
    
    if (!canCreate) {
      // Return a specific error code instead of redirecting
      console.log("User cannot create companion");
      return { error: "limit_reached" };
    }
  } catch (error) {
    // If we can't check permissions, we should NOT allow creation to avoid bypassing limits
    console.error("Error checking companion creation permission:", error);
    return { error: "permission_error" };
  }

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    console.error("Error creating companion:", error);
    return { error: error?.message || "Failed to create a companion" };
  }

  console.log("Companion created successfully:", data[0]);
  return { success: true, companion: data[0] };
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  return companions;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);

  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('session_history')
        .insert({
            companion_id: companionId,
            user_id: userId,
        })

    if(error) throw new Error(error.message);

    return data;
}

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}

export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}

export const getUserCompanions = async (userId: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('author', userId)

    if(error) throw new Error(error.message);

    return data;
}

export const newCompanionPermissions = async () => {
  try {
    // Use server-side function directly to avoid authentication issues with fetch
    const canCreate = await canCreateCompanionServer();
    return canCreate;
  } catch (error) {
    console.error("Error checking companion creation permission:", error);
    // If we can't check permissions, we should NOT allow creation to avoid bypassing limits
    return false;
  }
}

// Trial actions
export const initializeUserTrial = async () => {
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
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no record exists

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
      .maybeSingle();

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
};

export const checkUserTrialStatus = async () => {
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
      .maybeSingle();

    if (error || !trialData) {
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
};

// Bookmarks
export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("bookmarks").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) {
    throw new Error(error.message);
  }
  // Revalidate the path to force a re-render of the page

  revalidatePath(path);
  return data;
};

export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};

// Function to check if a companion is bookmarked
export const isCompanionBookmarked = async (companionId: string) => {
  const { userId } = await auth();
  if (!userId) return false;
  
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("companion_id", companionId)
    .eq("user_id", userId)
    .maybeSingle();
    
  if (error) {
    console.error("Error checking if companion is bookmarked:", error);
    return false;
  }
  
  return !!data;
};

// It's almost the same as getUserCompanions, but it's for the bookmarked companions
export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  // First try a simple query to see if we can fetch bookmarks
  const { data: bookmarks, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId);
    
  if (bookmarksError) {
    console.error("Error fetching bookmarks:", bookmarksError.message, bookmarksError.details, bookmarksError.hint);
    return [];
  }
  
  // If we have bookmarks, get the companion details
  if (bookmarks && bookmarks.length > 0) {
    const companionIds = bookmarks.map(bookmark => bookmark.companion_id);
    const { data: companions, error: companionsError } = await supabase
      .from("companions")
      .select("*")
      .in("id", companionIds);
      
    if (companionsError) {
      console.error("Error fetching companions:", companionsError.message, companionsError.details, companionsError.hint);
      return [];
    }
    
    return companions || [];
  }
  
  return [];
};