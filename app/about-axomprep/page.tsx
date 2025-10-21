import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About AxomPrep — Our Mission & Vision",
  description: "Learn about AxomPrep's mission to democratize quality English education through AI-powered learning solutions. Discover our core values and commitment to accessible learning.",
  keywords: [
    "AxomPrep", 
    "about us", 
    "mission", 
    "vision", 
    "AI learning", 
    "English education", 
    "accessible learning"
  ],
  openGraph: {
    title: "About AxomPrep — Our Mission & Vision",
    description: "Learn about AxomPrep's mission to democratize quality English education through AI-powered learning solutions.",
    url: "https://www.axomprep.in/about-axomprep",
    siteName: "AxomPrep",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}