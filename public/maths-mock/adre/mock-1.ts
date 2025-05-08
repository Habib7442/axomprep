interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface MockTest {
  name: string;
  date: string;
  shift: string;
  subject: string;
  totalMarks: number;
  passingMarks: number;
  negativeMarking: number;
  timeLimit: number; // in minutes
  questions: Question[];
}

const adreMockTest: MockTest = {
  name: "ADRE",
  subject: "Mathematics",
  date: "25 September 2024",
  shift: "1",
  totalMarks: 50,
  passingMarks: 30,
  negativeMarking: 0.5,
  timeLimit: 40,
  questions: [
    {
      id: 1,
      question: "The average of 20 numbers is zero. Of them, at most, how many may be greater than zero?",
      options: [
        "0",
        "1",
        "10",
        "19"
      ],
      answer: "19"
    },
    {
      id: 2,
      question: "The sum of a non-zero number and its reciprocal is 2. The number is:",
      options: [
        "1",
        "2",
        "-1",
        "0"
      ],
      answer: "1"
    },
    {
      id: 3,
      question: "If a + b + c = 9 and ab + bc + ca = 26, then the value of a² + b² + c² is:",
      options: [
        "25",
        "27",
        "29",
        "31"
      ],
      answer: "29"
    },
    {
      id: 4,
      question: "If a, b, c are in A.P. and a², b², c² are in G.P., then a, b, c are in:",
      options: [
        "G.P.",
        "H.P.",
        "A.P.",
        "None of these"
      ],
      answer: "G.P."
    },
    {
      id: 5,
      question: "If a, b, c are in G.P., then log a, log b, log c are in:",
      options: [
        "G.P.",
        "H.P.",
        "A.P.",
        "None of these"
      ],
      answer: "A.P."
    },
    {
      id: 6,
      question: "If a, b, c are in A.P., then 1/(b-c), 1/(a-c), 1/(a-b) are in:",
      options: [
        "G.P.",
        "H.P.",
        "A.P.",
        "None of these"
      ],
      answer: "A.P."
    },
    {
      id: 7,
      question: "If a, b, c are in G.P., then a² + ab + b², b² + bc + c², c² + ca + a² are in:",
      options: [
        "G.P.",
        "H.P.",
        "A.P.",
        "None of these"
      ],
      answer: "G.P."
    },
    {
      id: 8,
      question: "If a, b, c are in A.P. and p, q, r are in G.P., then a^p, b^q, c^r are in:",
      options: [
        "G.P.",
        "H.P.",
        "A.P.",
        "None of these"
      ],
      answer: "None of these"
    },
    {
      id: 9,
      question: "If a, b, c are in H.P., then 1/a, 1/b, 1/c are in:",
      options: [
        "G.P.",
        "H.P.",
        "A.P.",
        "None of these"
      ],
      answer: "A.P."
    },
    {
      id: 10,
      question: "If a, b, c are in G.P., then a³, b³, c³ are in:",
      options: [
        "G.P.",
        "H.P.",
        "A.P.",
        "None of these"
      ],
      answer: "G.P."
    }
  ]
};

export default adreMockTest;
