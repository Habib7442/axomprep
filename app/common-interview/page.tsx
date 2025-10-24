import type { Metadata } from "next";
import CommonInterviewClient from "./CommonInterviewClient";

export const metadata: Metadata = {
  title: "Common Interview Questions — AI-Powered Interview Training",
  description: "Practice common interview questions with our AI coach. Improve your English communication skills and build confidence for your next job interview.",
  keywords: [
    "interview practice", 
    "common interview questions", 
    "AI interview coach", 
    "job interview preparation", 
    "interview skills", 
    "HR interview questions"
  ],
  openGraph: {
    title: "Common Interview Questions — AI-Powered Interview Training",
    description: "Practice common interview questions with our AI coach to build confidence for your next job interview.",
    url: "https://www.axomprep.in/common-interview",
    siteName: "AxomPrep",
  },
};

export default function CommonInterviewPage() {
  return <CommonInterviewClient />;
}