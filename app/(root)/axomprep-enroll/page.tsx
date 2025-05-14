import type { Metadata } from "next";
import AxomPrepEnrollForm from "./AxomPrepEnrollForm";

export const metadata: Metadata = {
  title: "Enroll in AxomPrep Coaching",
  description:
    "Enroll in AxomPrep Coaching Center for classes 8-10. We offer personalized guidance and comprehensive study materials.",
};

const AxomPrepEnrollPage = () => {
  return <AxomPrepEnrollForm />;
};

export default AxomPrepEnrollPage;
