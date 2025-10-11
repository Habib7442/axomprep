import { currentUser } from "@clerk/nextjs/server";
import InterviewClient from "@/app/interview/InterviewClient";
import { redirect } from "next/navigation";

interface InterviewPageProps {
  searchParams: Promise<{ topic?: string }>;
}

const InterviewPage = async ({ searchParams }: InterviewPageProps) => {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const unwrappedParams = await searchParams;

  return (
    <InterviewClient 
      user={{
        id: user.id,
        firstName: user.firstName,
        imageUrl: user.imageUrl
      }}
      initialTopic={unwrappedParams?.topic || ""}
    />
  );
};

export default InterviewPage;