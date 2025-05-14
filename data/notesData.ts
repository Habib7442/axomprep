// Types for notes data
export type Note = {
  id: string;
  title: string;
  description: string;
  class: string;
  subject: string;
  pdfUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  language: "English" | "Assamese";
};

// Available classes
export const classes = ["8", "9", "10"];

// Available subjects
export const subjects = ["Mathematics", "General Science", "English"];

// Available languages
export const languages = ["English", "Assamese"];

// Dummy notes data
export const notes: Note[] = [
  // Class 8 Notes
  {
    id: "math-8-1",
    title: "Rational Numbers",
    description: "Complete notes on rational numbers, their properties, and operations.",
    class: "8",
    subject: "Mathematics",
    pdfUrl: "/notes/class8/math/rational-numbers.pdf",
    thumbnailUrl: "/notes/thumbnails/math-8-1.jpg",
    uploadDate: "2023-10-15",
    language: "English",
  },
  {
    id: "math-8-2",
    title: "Linear Equations",
    description: "Comprehensive guide to solving linear equations in one variable.",
    class: "8",
    subject: "Mathematics",
    pdfUrl: "/notes/class8/math/linear-equations.pdf",
    thumbnailUrl: "/notes/thumbnails/math-8-2.jpg",
    uploadDate: "2023-10-20",
    language: "English",
  },
  {
    id: "math-8-3",
    title: "গণিত - সংখ্যা পদ্ধতি",
    description: "অষ্টম শ্ৰেণীৰ সংখ্যা পদ্ধতিৰ সম্পূৰ্ণ টোকা।",
    class: "8",
    subject: "Mathematics",
    pdfUrl: "/notes/class8/math/number-system-assamese.pdf",
    thumbnailUrl: "/notes/thumbnails/math-8-3.jpg",
    uploadDate: "2023-11-05",
    language: "Assamese",
  },
  {
    id: "science-8-1",
    title: "Cell Structure and Functions",
    description: "Detailed notes on cell structure, organelles, and their functions.",
    class: "8",
    subject: "General Science",
    pdfUrl: "/notes/class8/science/cell-structure.pdf",
    thumbnailUrl: "/notes/thumbnails/science-8-1.jpg",
    uploadDate: "2023-09-10",
    language: "English",
  },
  {
    id: "science-8-2",
    title: "বিজ্ঞান - কোষ গঠন",
    description: "কোষৰ গঠন আৰু কাৰ্য্য সম্পৰ্কে বিস্তৃত টোকা।",
    class: "8",
    subject: "General Science",
    pdfUrl: "/notes/class8/science/cell-structure-assamese.pdf",
    thumbnailUrl: "/notes/thumbnails/science-8-2.jpg",
    uploadDate: "2023-09-15",
    language: "Assamese",
  },
  {
    id: "english-8-1",
    title: "Grammar Basics",
    description: "Fundamental grammar rules and their applications.",
    class: "8",
    subject: "English",
    pdfUrl: "/notes/class8/english/grammar-basics.pdf",
    thumbnailUrl: "/notes/thumbnails/english-8-1.jpg",
    uploadDate: "2023-08-20",
    language: "English",
  },

  // Class 9 Notes
  {
    id: "math-9-1",
    title: "Polynomials",
    description: "Complete guide to polynomials, factorization, and algebraic identities.",
    class: "9",
    subject: "Mathematics",
    pdfUrl: "/notes/class9/math/polynomials.pdf",
    thumbnailUrl: "/notes/thumbnails/math-9-1.jpg",
    uploadDate: "2023-10-25",
    language: "English",
  },
  {
    id: "math-9-2",
    title: "Coordinate Geometry",
    description: "Introduction to coordinate geometry and its applications.",
    class: "9",
    subject: "Mathematics",
    pdfUrl: "/notes/class9/math/coordinate-geometry.pdf",
    thumbnailUrl: "/notes/thumbnails/math-9-2.jpg",
    uploadDate: "2023-11-10",
    language: "English",
  },
  {
    id: "math-9-3",
    title: "গণিত - বীজগণিত",
    description: "নৱম শ্ৰেণীৰ বীজগণিতৰ সম্পূৰ্ণ টোকা।",
    class: "9",
    subject: "Mathematics",
    pdfUrl: "/notes/class9/math/algebra-assamese.pdf",
    thumbnailUrl: "/notes/thumbnails/math-9-3.jpg",
    uploadDate: "2023-11-15",
    language: "Assamese",
  },
  {
    id: "science-9-1",
    title: "Force and Laws of Motion",
    description: "Comprehensive notes on Newton's laws of motion and their applications.",
    class: "9",
    subject: "General Science",
    pdfUrl: "/notes/class9/science/laws-of-motion.pdf",
    thumbnailUrl: "/notes/thumbnails/science-9-1.jpg",
    uploadDate: "2023-09-20",
    language: "English",
  },
  {
    id: "science-9-2",
    title: "বিজ্ঞান - গতিৰ নিয়ম",
    description: "নিউটনৰ গতিৰ নিয়ম আৰু ইয়াৰ প্ৰয়োগৰ বিষয়ে বিস্তৃত টোকা।",
    class: "9",
    subject: "General Science",
    pdfUrl: "/notes/class9/science/laws-of-motion-assamese.pdf",
    thumbnailUrl: "/notes/thumbnails/science-9-2.jpg",
    uploadDate: "2023-09-25",
    language: "Assamese",
  },
  {
    id: "english-9-1",
    title: "Essay Writing",
    description: "Guide to writing effective essays with examples.",
    class: "9",
    subject: "English",
    pdfUrl: "/notes/class9/english/essay-writing.pdf",
    thumbnailUrl: "/notes/thumbnails/english-9-1.jpg",
    uploadDate: "2023-08-25",
    language: "English",
  },

  // Class 10 Notes
  {
    id: "math-10-1",
    title: "Trigonometry",
    description: "Complete notes on trigonometric ratios, identities, and applications.",
    class: "10",
    subject: "Mathematics",
    pdfUrl: "/notes/class10/math/trigonometry.pdf",
    thumbnailUrl: "/notes/thumbnails/math-10-1.jpg",
    uploadDate: "2023-10-30",
    language: "English",
  },
  {
    id: "math-10-2",
    title: "Statistics",
    description: "Comprehensive guide to statistics, mean, median, mode, and data interpretation.",
    class: "10",
    subject: "Mathematics",
    pdfUrl: "/notes/class10/math/statistics.pdf",
    thumbnailUrl: "/notes/thumbnails/math-10-2.jpg",
    uploadDate: "2023-11-20",
    language: "English",
  },
  {
    id: "math-10-3",
    title: "গণিত - ত্ৰিকোণমিতি",
    description: "দশম শ্ৰেণীৰ ত্ৰিকোণমিতিৰ সম্পূৰ্ণ টোকা।",
    class: "10",
    subject: "Mathematics",
    pdfUrl: "/notes/class10/math/trigonometry-assamese.pdf",
    thumbnailUrl: "/notes/thumbnails/math-10-3.jpg",
    uploadDate: "2023-11-25",
    language: "Assamese",
  },
  {
    id: "science-10-1",
    title: "Electricity and Circuits",
    description: "Detailed notes on electric current, circuits, and Ohm's law.",
    class: "10",
    subject: "General Science",
    pdfUrl: "/notes/class10/science/electricity.pdf",
    thumbnailUrl: "/notes/thumbnails/science-10-1.jpg",
    uploadDate: "2023-09-30",
    language: "English",
  },
  {
    id: "science-10-2",
    title: "বিজ্ঞান - বিদ্যুৎ",
    description: "বিদ্যুৎ প্ৰবাহ, বিদ্যুৎ বৰ্তনী আৰু ওহমৰ নিয়মৰ বিষয়ে বিস্তৃত টোকা।",
    class: "10",
    subject: "General Science",
    pdfUrl: "/notes/class10/science/electricity-assamese.pdf",
    thumbnailUrl: "/notes/thumbnails/science-10-2.jpg",
    uploadDate: "2023-10-05",
    language: "Assamese",
  },
  {
    id: "english-10-1",
    title: "Literature Analysis",
    description: "Guide to analyzing literary texts with examples from the syllabus.",
    class: "10",
    subject: "English",
    pdfUrl: "/notes/class10/english/literature-analysis.pdf",
    thumbnailUrl: "/notes/thumbnails/english-10-1.jpg",
    uploadDate: "2023-08-30",
    language: "English",
  },
];

// Helper function to filter notes by class, subject, and language
export function filterNotes(
  classFilter: string,
  subjectFilter: string,
  languageFilter: string
): Note[] {
  return notes.filter(
    (note) =>
      (classFilter === "all" || note.class === classFilter) &&
      (subjectFilter === "all" || note.subject === subjectFilter) &&
      (languageFilter === "all" || note.language === languageFilter)
  );
}
