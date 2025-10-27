import { createSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createSupabaseClient();
    
    // Fetch distinct subjects from companions table
    const { data, error } = await supabase
      .from('companions')
      .select('subject')
      .not('subject', 'is', null)
      .order('subject');
    
    if (error) {
      console.error("Error fetching subjects:", error);
      return NextResponse.json({ error: "Failed to fetch subjects" }, { status: 500 });
    }
    
    // Extract unique subjects and sort them
    const subjects = Array.from(new Set(data.map(item => item.subject))).sort();
    
    return NextResponse.json({ subjects });
  } catch (error) {
    console.error("Unexpected error fetching subjects:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}