import sscMock1 from "@/public/maths-mock/ssc/mock-1";
// import sscMock2 from '@/public/maths-mock/ssc/mock-2'
import railwaysMock1 from "@/public/maths-mock/railways/mock-1";
import bankingMock1 from "@/public/maths-mock/banking/mock-1";
import adreMock1 from "@/public/maths-mock/adre/mock-1";
import sscReasoningMock1 from "@/public/reasoning-mock/ssc/mock-1";

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
  { id: "english", name: "English" },
  { id: "general-knowledge", name: "General Knowledge" },
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
      id: "ssc/mock-1",
      name: "SSC CGL Mock Test 1",
      description:
        "Practice test for SSC CGL exam with 25 questions on Mathematics",
      category: "SSC",
      subject: "Mathematics",
      difficulty: "intermediate",
      timeLimit: sscMock1.timeLimit,
      totalMarks: sscMock1.totalMarks,
      passingMarks: sscMock1.passingMarks,
      date: sscMock1.date,
      shift: sscMock1.shift,
    },
    {
      id: "reasoning/ssc",
      name: "SSC CGL Mock Test 1",
      description:
        "Practice test for SSC exam with image-based reasoning questions",
      category: "SSC",
      subject: "Reasoning",
      difficulty: "intermediate",
      timeLimit: sscReasoningMock1.timeLimit,
      totalMarks: sscReasoningMock1.totalMarks,
      passingMarks: sscReasoningMock1.passingMarks,
      date: sscReasoningMock1.date,
      shift: sscReasoningMock1.shift,
    },
    // {
    //   id: 'ssc/mock-2',
    //   name: 'SSC CGL Mock Test 2',
    //   description: 'Practice test for SSC CGL exam with 10 questions on Reasoning',
    //   category: 'SSC',
    //   subject: 'Reasoning',
    //   difficulty: 'beginner',
    //   timeLimit: sscMock2.timeLimit,
    //   totalMarks: sscMock2.totalMarks,
    //   passingMarks: sscMock2.passingMarks,
    //   date: sscMock2.date,
    //   shift: sscMock2.shift
    // },
    {
      id: "railways/mock-1",
      name: "Railways RRB Mock Test 1",
      description:
        "Practice test for Railways RRB exam with 10 questions on Mathematics",
      category: "Railways",
      subject: "Mathematics",
      difficulty: "intermediate",
      timeLimit: railwaysMock1.timeLimit,
      totalMarks: railwaysMock1.totalMarks,
      passingMarks: railwaysMock1.passingMarks,
      date: railwaysMock1.date,
      shift: railwaysMock1.shift,
    },
    {
      id: "banking/mock-1",
      name: "Banking SBI PO Mock Test 1",
      description:
        "Practice test for Banking SBI PO exam with 10 questions on Mathematics",
      category: "Banking",
      subject: "Mathematics",
      difficulty: "advanced",
      timeLimit: bankingMock1.timeLimit,
      totalMarks: bankingMock1.totalMarks,
      passingMarks: bankingMock1.passingMarks,
      date: bankingMock1.date,
      shift: bankingMock1.shift,
    },
    {
      id: "adre/mock-1",
      name: "ADRE Mock Test 1",
      description:
        "Practice test for ADRE exam with 10 questions on Mathematics",
      category: "ADRE",
      subject: "Mathematics",
      difficulty: "advanced",
      timeLimit: adreMock1.timeLimit,
      totalMarks: adreMock1.totalMarks,
      passingMarks: adreMock1.passingMarks,
      date: adreMock1.date,
      shift: adreMock1.shift,
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
 */
export function hasPassedPrerequisites(
  testId: string,
  userResults: any[]
): boolean {
  // Extract the test category and number
  const [category, mockNumber] = testId.split("/");
  const mockNum = parseInt(mockNumber.replace("mock-", ""));

  // If it's the first test in the category, no prerequisites
  if (mockNum === 1) return true;

  // Check if the user has passed all previous tests in this category
  for (let i = 1; i < mockNum; i++) {
    const prerequisiteId = `${category}/mock-${i}`;
    const hasPassed = userResults.some(
      (result) => result.test_id === prerequisiteId && result.passed
    );

    if (!hasPassed) return false;
  }

  return true;
}
