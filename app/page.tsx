import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "AxomPrep — AI-Powered English Learning Platform",
  description: "Master English communication skills through AI-powered interview practice. Build confidence and fluency for academic and professional success with our conversational AI platform.",
  keywords: [
    "English learning", 
    "AI interview practice", 
    "conversational AI", 
    "interview preparation", 
    "language learning", 
    "AI tutor"
  ],
  openGraph: {
    title: "AxomPrep — AI-Powered English Learning Platform",
    description: "Master English communication skills through AI-powered interview practice.",
    url: "https://www.axomprep.in",
    siteName: "AxomPrep",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
