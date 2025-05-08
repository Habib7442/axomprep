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

const sscCGLMockTest2: MockTest = {
  name: "SSC",
  subject: "Reasoning",
  date: "12 September 2024",
  shift: "2",
  totalMarks: 50,
  passingMarks: 30,
  negativeMarking: 0.5,
  timeLimit: 25,
  questions: [
    {
      id: 1,
      question: "Find the missing number in the series: 3, 10, 29, 66, ?",
      options: [
        "127",
        "145",
        "155",
        "165"
      ],
      answer: "127"
    },
    {
      id: 2,
      question: "If FRIEND is coded as HUMJTK, how will CANDLE be coded?",
      options: [
        "EDRIRL",
        "DCQHQK",
        "ESJFQM",
        "FYOBOC"
      ],
      answer: "EDRIRL"
    },
    {
      id: 3,
      question: "In a certain code, TERMINAL is written as SDQNJOBM. How is CREDIBLE written in that code?",
      options: [
        "BSDCHAKD",
        "DSFEJCMF",
        "DQFCHCMF",
        "BQFCHCMF"
      ],
      answer: "DSFEJCMF"
    },
    {
      id: 4,
      question: "If 'A' means '+', 'B' means '-', 'C' means '×', and 'D' means '÷', then what is the value of 18 C 14 A 6 D 12 B 4?",
      options: [
        "253",
        "252",
        "255",
        "254"
      ],
      answer: "253"
    },
    {
      id: 5,
      question: "Select the option that is related to the third term in the same way as the second term is related to the first term. Knife : Cut :: Pen : ?",
      options: [
        "Paper",
        "Write",
        "Ink",
        "Letter"
      ],
      answer: "Write"
    },
    {
      id: 6,
      question: "Select the option that is related to the third term in the same way as the second term is related to the first term. Peacock : India :: Bear : ?",
      options: [
        "Russia",
        "Australia",
        "America",
        "China"
      ],
      answer: "Russia"
    },
    {
      id: 7,
      question: "Select the option that is related to the third term in the same way as the second term is related to the first term. ACEG : BDFH :: IKMO : ?",
      options: [
        "JLNP",
        "JLNQ",
        "JKNP",
        "KLNP"
      ],
      answer: "JLNP"
    },
    {
      id: 8,
      question: "Select the option that is related to the third term in the same way as the second term is related to the first term. 7 : 56 :: 9 : ?",
      options: [
        "81",
        "90",
        "72",
        "63"
      ],
      answer: "90"
    },
    {
      id: 9,
      question: "Select the option that is related to the third term in the same way as the second term is related to the first term. 6 : 42 :: 8 : ?",
      options: [
        "72",
        "56",
        "64",
        "48"
      ],
      answer: "72"
    },
    {
      id: 10,
      question: "Select the option that is related to the third term in the same way as the second term is related to the first term. 9 : 25 :: 16 : ?",
      options: [
        "36",
        "49",
        "64",
        "81"
      ],
      answer: "36"
    }
  ]
};

export default sscCGLMockTest2;
