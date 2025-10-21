import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About AxomPrep — Our Mission & Vision",
  description: "Learn about AxomPrep's mission to democratize quality education through AI-powered learning solutions. Meet our team and discover our core values.",
};

export default function AboutPage() {
  return <AboutClient />;
}