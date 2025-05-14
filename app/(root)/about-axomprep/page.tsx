import type { Metadata } from "next";
import AboutAxomPrep from "./AboutAxomPrep";

export const metadata: Metadata = {
  title: "AxomPrep Coaching Center",
  description:
    "Discover AxomPrep, a coaching center dedicated to providing quality education in Kadong, Assam. We offer comprehensive study materials and personalized guidance for students.",
};

const AboutAxomPrepPage = () => {
  return <AboutAxomPrep />;
};

export default AboutAxomPrepPage;
