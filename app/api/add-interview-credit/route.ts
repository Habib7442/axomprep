import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { addInterviewCredit } from "@/lib/billing.server";

export async function POST() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Add interview credit to user
    const success = await addInterviewCredit(userId);
    
    if (success) {
      return NextResponse.json({ success: true, message: "Interview credit added successfully" });
    } else {
      return NextResponse.json({ error: "Failed to add interview credit" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in add-interview-credit API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}