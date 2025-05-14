import type { Metadata } from "next";
import AxomPrepNotesPage from "./AxomPrepNotesPage";

export const metadata: Metadata = {
  title: "AxomPrep Study Notes",
  description:
    "Access comprehensive study materials for classes 8-10 in Mathematics, General Science, and English. Available in both English and Assamese medium.",
};

const AxomPrepNotes = () => {
  return <AxomPrepNotesPage />;
};

export default AxomPrepNotes;
