import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import InterviewClient from "@/app/interview/InterviewClient";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Interview Practice — AI-Powered English Interview Coaching",
  description: "Practice real interview scenarios with our AI coach. Improve your English communication skills, build confidence, and get instant feedback on your interview performance.",
  keywords: [
    "interview practice", 
    "AI interview coach", 
    "English communication", 
    "job interview preparation", 
    "interview skills", 
    "AI-powered learning"
  ],
  openGraph: {
    title: "Interview Practice — AI-Powered English Interview Coaching",
    description: "Practice real interview scenarios with our AI coach. Improve your English communication skills and build confidence.",
    url: "https://www.axomprep.in/interview",
    siteName: "AxomPrep",
  },
};

const InterviewPage = async ({ searchParams }: { searchParams: Promise<{ topic?: string }> }) => {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const unwrappedParams = await searchParams;

  return (
    <div>
      <InterviewClient 
        user={{
          id: user.id,
          firstName: user.firstName,
          imageUrl: user.imageUrl
        }}
        initialTopic={unwrappedParams?.topic || ""}
      />
    </div>
  );
};

export default InterviewPage;