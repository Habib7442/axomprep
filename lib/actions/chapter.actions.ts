"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

// Save chapter score
export const saveChapterScore = async (scoreData: {
  chapter_id: string;
  chapter_name: string;
  score: number;
  time_taken: number;
  total_questions: number;
  correct_answers: number;
  subject: string;
  class: string;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("chapter_scores")
    .insert({
      ...scoreData,
      user_id: userId,
    })
    .select();

  if (error) throw new Error(error.message);

  return data[0];
};

// Get user's chapter scores
export const getUserChapterScores = async (chapterId?: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = createSupabaseClient();

  let query = supabase
    .from("chapter_scores")
    .select()
    .eq("user_id", userId);

  if (chapterId) {
    query = query.eq("chapter_id", chapterId);
  }

  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data;
};

// Get leaderboard for a chapter
export const getChapterLeaderboard = async (chapterId: string, limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("chapter_scores")
    .select("user_id, score, time_taken, created_at")
    .eq("chapter_id", chapterId)
    .order("score", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  // Add rank to each entry
  return data.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
};

// Update leaderboard table
export const updateLeaderboard = async (scoreData: {
  chapter_id: string;
  chapter_name: string;
  score: number;
  time_taken: number;
  subject: string;
  class: string;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = createSupabaseClient();

  // First, get the user's name (you might want to store this in a user profile table)
  const { data: userData, error: userError } = await supabase
    .from("companion_users")
    .select("name")
    .eq("id", userId)
    .maybeSingle();

  if (userError) {
    console.error("Error fetching user data:", userError);
  }

  const userName = userData?.name || "Anonymous";

  const { data, error } = await supabase
    .from("leaderboard")
    .insert({
      ...scoreData,
      user_id: userId,
    })
    .select();

  if (error) throw new Error(error.message);

  return data[0];
};

// Get flashcards for a chapter
export const getChapterFlashcards = async (chapterId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = createSupabaseClient();

  try {
    // Try to filter by both chapter_id and user_id
    const { data, error } = await supabase
      .from("flashcards")
      .select()
      .eq("chapter_id", chapterId)
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  } catch (error) {
    // If user_id filtering fails, fall back to just chapter_id filtering
    console.warn("Could not filter flashcards by user_id, falling back to chapter_id only:", error);
    
    const { data, error: fallbackError } = await supabase
      .from("flashcards")
      .select()
      .eq("chapter_id", chapterId);

    if (fallbackError) throw fallbackError;

    return data;
  }
};

// Save flashcard
export const saveFlashcard = async (flashcardData: {
  chapter_id: string;
  front_text: string;
  back_text: string;
  subject: string;
  class: string;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = createSupabaseClient();

  try {
    // Try to insert with user_id
    const { data, error } = await supabase
      .from("flashcards")
      .insert({
        ...flashcardData,
        user_id: userId,
      })
      .select();

    if (error) throw error;

    return data[0];
  } catch (error) {
    // If user_id insertion fails, fall back to inserting without user_id
    console.warn("Could not insert flashcard with user_id, falling back to insertion without user_id:", error);
    
    const { data, error: fallbackError } = await supabase
      .from("flashcards")
      .insert(flashcardData)
      .select();

    if (fallbackError) throw fallbackError;

    return data[0];
  }
};

// Update student progress
export const updateStudentProgress = async (progressData: {
  chapter_id: string;
  chapter_name: string;
  mastery_percentage: number;
  topic_mastery?: Record<string, number>;
  subject: string;
  class: string;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = createSupabaseClient();

  // Check if progress already exists for this user and chapter
  const { data: existingProgress, error: fetchError } = await supabase
    .from("student_progress")
    .select()
    .eq("user_id", userId)
    .eq("chapter_id", progressData.chapter_id)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);

  let result;
  if (existingProgress) {
    // Update existing progress
    const { data, error } = await supabase
      .from("student_progress")
      .update({
        ...progressData,
        updated_at: new Date().toISOString(),
        last_practiced: new Date().toISOString(),
      })
      .eq("id", existingProgress.id)
      .select();

    if (error) throw new Error(error.message);
    result = data[0];
  } else {
    // Create new progress entry
    const { data, error } = await supabase
      .from("student_progress")
      .insert({
        ...progressData,
        user_id: userId,
        last_practiced: new Date().toISOString(),
      })
      .select();

    if (error) throw new Error(error.message);
    result = data[0];
  }

  return result;
};

// Get student progress
export const getStudentProgress = async (chapterId?: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = createSupabaseClient();

  let query = supabase
    .from("student_progress")
    .select()
    .eq("user_id", userId);

  if (chapterId) {
    query = query.eq("chapter_id", chapterId);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data;
};

// Define the question type
interface MockTestQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  userAnswer?: string; // Make userAnswer optional
}

// Save mock test questions
export const saveMockTestQuestions = async (testData: {
  chapter_id: string;
  chapter_name: string;
  subject: string;
  class: string;
  questions: MockTestQuestion[];
  test_score: number;
  time_taken: number;
  total_questions: number;
  correct_answers: number;
  is_retake?: boolean; // Add is_retake parameter
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = createSupabaseClient();

  // Extract user answers from questions
  const userAnswers: Record<number, string> = {};
  const questionsWithoutUserAnswers = testData.questions.map((q, index) => {
    if (q.userAnswer) {
      userAnswers[index] = q.userAnswer;
    }
    // Remove userAnswer property from the question object
    const { userAnswer, ...questionWithoutUserAnswer } = q;
    return questionWithoutUserAnswer;
  });

  const { data, error } = await supabase
    .from("mock_test_questions")
    .insert({
      ...testData,
      questions: questionsWithoutUserAnswers,
      user_answers: userAnswers,
      user_id: userId,
      is_retake: testData.is_retake || false, // Add is_retake field
    })
    .select();

  if (error) throw new Error(error.message);

  return data[0];
};

// Get user's mock test questions
export const getUserMockTestQuestions = async (chapterId?: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = createSupabaseClient();

  let query = supabase
    .from("mock_test_questions")
    .select()
    .eq("user_id", userId);

  if (chapterId) {
    query = query.eq("chapter_id", chapterId);
  }

  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data;
};

// Save subtopic content
export const saveSubtopicContent = async (contentData: {
  chapter_id: string;
  subtopic: string;
  content_type: string; // 'explanation', 'practice_questions', 'examples'
  content: Record<string, unknown> | Array<unknown>; // JSON content
  subject: string;
  class: string;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = createSupabaseClient();

  // First, try to update existing content
  const { data: existingContent, error: fetchError } = await supabase
    .from("subtopic_content")
    .select()
    .eq("user_id", userId)
    .eq("chapter_id", contentData.chapter_id)
    .eq("subtopic", contentData.subtopic)
    .eq("content_type", contentData.content_type)
    .maybeSingle();

  if (fetchError) {
    console.error("Error fetching existing content:", fetchError);
    throw new Error(`Error fetching existing content: ${fetchError.message}`);
  }

  let result;
  if (existingContent) {
    // Update existing content
    const { data, error } = await supabase
      .from("subtopic_content")
      .update({
        ...contentData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingContent.id)
      .select();

    if (error) {
      console.error("Error updating content:", error);
      throw new Error(`Error updating content: ${error.message}`);
    }
    result = data[0];
  } else {
    // Insert new content
    const { data, error } = await supabase
      .from("subtopic_content")
      .insert({
        ...contentData,
        user_id: userId,
      })
      .select();

    if (error) {
      console.error("Error inserting content:", error);
      throw new Error(`Error inserting content: ${error.message}`);
    }
    result = data[0];
  }

  return result;
};

// Get subtopic content
export const getSubtopicContent = async (params: {
  chapter_id: string;
  subtopic: string;
  content_type: string;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("subtopic_content")
    .select()
    .eq("user_id", userId)
    .eq("chapter_id", params.chapter_id)
    .eq("subtopic", params.subtopic)
    .eq("content_type", params.content_type)
    .maybeSingle();

  if (error) {
    console.error("Error fetching subtopic content:", error);
    throw new Error(`Error fetching subtopic content: ${error.message}`);
  }

  return data;
};
