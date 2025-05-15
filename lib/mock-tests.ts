import rrbJePaper1 from "@/data/rrb/je/paper1";

export interface MockTest {
  id: string;
  name: string;
  description: string;
  category: string;
  subject: string;
  difficulty: string;
  timeLimit: number;
  totalMarks: number;
  passingMarks: number;
  date: string;
  shift: string;
}

// Map of exam categories
export const examCategories = [
  { id: "ssc", name: "SSC" },
  { id: "railways", name: "Railways" },
  { id: "banking", name: "Banking" },
  { id: "adre", name: "ADRE" },
];

// Map of subjects
export const subjects = [
  { id: "mathematics", name: "Mathematics" },
  { id: "reasoning", name: "Reasoning" },
  { id: "general-knowledge", name: "General Knowledge" },
  { id: "full-length", name: "Full Length" },
];

// Difficulty levels
export const difficultyLevels = [
  { id: "beginner", name: "Beginner" },
  { id: "intermediate", name: "Intermediate" },
  { id: "advanced", name: "Advanced" },
];

// Function to get all mock tests
export function getAllMockTests(): MockTest[] {
  return [
    {
      id: "railways/je/paper1",
      name: "RRB JE Paper 1",
      description:
        "Practice test for Railways Junior Engineer exam with 100 questions",
      category: "railways", // Lowercase to match the filter
      subject: "full-length", // Match the filter format
      difficulty: "intermediate",
      timeLimit: rrbJePaper1.timeLimit,
      totalMarks: rrbJePaper1.totalMarks,
      passingMarks: rrbJePaper1.passingMarks,
      date: rrbJePaper1.date,
      shift: rrbJePaper1.shift,
    },
  ];
}

// Function to filter mock tests by category and subject
export function filterMockTests(
  mockTests: MockTest[],
  category?: string,
  subject?: string,
  difficulty?: string
): MockTest[] {
  // Simple filtering function that works with case-insensitive comparison
  return mockTests.filter((test) => {
    const categoryMatch =
      !category ||
      category === "all" ||
      test.category.toLowerCase() === category.toLowerCase();

    const subjectMatch =
      !subject ||
      subject === "all" ||
      test.subject.toLowerCase() === subject.toLowerCase();

    const difficultyMatch =
      !difficulty ||
      difficulty === "all" ||
      test.difficulty.toLowerCase() === difficulty.toLowerCase();

    return categoryMatch && subjectMatch && difficultyMatch;
  });
}

// Function to get a mock test by ID
export function getMockTestById(id: string): MockTest | undefined {
  const allTests = getAllMockTests();
  return allTests.find((test) => test.id === id);
}

/**
 * Check if a user has passed the prerequisite tests for a given test
 *
 * Note: Parameters are currently unused since there's only one test,
 * but they will be needed when more tests with prerequisites are added.
 */
export function hasPassedPrerequisites(
  _testId: string,
  _userResults: Array<{test_id: string; passed: boolean}>
): boolean {
  // For now, with only one test, always return true
  // This function can be expanded later when more tests are added
  // that have prerequisites
  return true;
}
