interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  questionImage?: string; // Optional path to question image
  optionImage?: string; // Optional path to a single option image
  hasImageOptions?: boolean; // Flag to indicate if there's an option image
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

const sscCGLMockTest1: MockTest = {
  name: "SSC",
  subject: "Reasoning",
  date: "9 September 2024",
  shift: "1",
  totalMarks: 50,
  passingMarks: 30,
  negativeMarking: 0.5,
  timeLimit: 25,
  questions: [
    {
      id: 1,
      question:
        "Three statements are given, followed by three conclusions numbered I, II and III. Assuming the statements to be true, even if they seem to be at variance with commonly known facts, decide which of the conclusions logically follow(s) from the statements. Statements: All pages are diaries. Some diaries are books. All books are notebooks. Conclusions: I. No page is a notebook. II. All pages are notebooks. III. All diaries being notebooks is a possibility.",
      options: [
        "Both conclusion I and II follow",
        "Only conclusions I and III follow",
        "Only conclusion III follows",
        "Only conclusion II follows",
      ],
      answer: "Only conclusion III follows",
    },
    {
      id: 2,
      question:
        "The position of how many letters will remain unchanged if all the letters in the word BINDER are arranged in English alphabetical order?",
      options: ["None", "One", "Two", "Three"],
      answer: "Two",
    },
    {
      id: 3,
      question:
        "In a certain code language: 'A + B' means 'A is the mother of B', 'A - B' means 'A is the brother of B', 'A × B' means 'A is the wife of B', 'A ÷ B' means 'A is the father of B'. Based on the above, how is 4 related to 2 if '4 + 3 ÷ 2 ÷ 1 - 5'?",
      options: [
        "Father's father",
        "Father's mother",
        "Mother's father",
        "Mother's mother",
      ],
      answer: "Father's mother",
    },
    {
      id: 4,
      question:
        "Identify the figure given in the options which when put in place of '?' will logically complete the series.",
      questionImage: "/images/reasoning/mock-1/question-4.png",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      optionImage: "/images/reasoning/mock-1/option-4.png",
      hasImageOptions: true,
      answer: "Option 3",
    },
    {
      id: 5,
      question:
        "'WISK' is related to 'DRHP' in a certain way based on the English alphabetical order. In the same way, 'LENT' is related to 'OVMG'. To which of the following is 'BANG' related, following the same logic?",
      options: ["ZYLU", "ZYNS", "YZNU", "YZMT"],
      answer: "YZMT",
    },
    {
      id: 6,
      question:
        "Two sets of numbers are given below. In each set of numbers, certain mathematical operation(s) on the first number result(s) in the second number. Similarly, certain mathematical operation(s) on the second number result(s) in the third number and so on. Which of the given options follows the same set of operations as in the given sets? Given sets: 18 → 36 → 72 → 107; 15 → 30 → 60 → 95",
      options: [
        "22 → 44 → 88 → 123",
        "25 → 50 → 100 → 125",
        "11 → 22 → 66 → 101",
        "30 → 60 → 90 → 115",
      ],
      answer: "22 → 44 → 88 → 123",
    },
    {
      id: 7,
      question:
        "Select the number from the given options to complete the series: 25, 30, 40, 55, 75, ___",
      options: ["105", "85", "80", "100"],
      answer: "100",
    },
    {
      id: 8,
      question:
        "The position(s) of how many letters will remain unchanged if all the letters in the word 'ENTOMB' are arranged in English alphabetical order?",
      options: ["None", "Two", "One", "Three"],
      answer: "Two",
    },
    {
      id: 9,
      question:
        "Six words Eat, Cry, Play, Sleep, Run and Bath are written on different faces of a dice. Three positions of this dice are shown in the figure. Find the word on the face opposite to Eat.",
      questionImage: "/images/reasoning/mock-1/question-9.png",
      options: ["Play", "Cry", "Sleep", "Run"],
      answer: "Sleep",
    },
    {
      id: 10,
      question:
        "Two different positions of the same dice with faces T, O, B, L, Y and V are shown below. Select the letter that will be on the face opposite to the one having L.",
      questionImage: "/images/reasoning/mock-1/question-10.png",
      options: ["Y", "B", "V", "O"],
      answer: "Y",
    },
    {
      id: 11,
      question:
        "Select the word-pair that best represents a similar relationship to the one expressed in the pair of words given below. (The words must be considered as meaningful English words and must NOT be related to each other based on the number of letters/number of consonants/vowels in the word)",
      options: [
        "Fungus : Jasmine",
        "Amaltas : Tree",
        "Fenugreek : Micro organism",
        "Algae : Flower",
      ],
      answer: "Amaltas : Tree",
    },
    {
      id: 12,
      question:
        "Select the set in which the numbers are related in the same way as are the numbers of the given sets: (213, 157), (185, 129)",
      options: ["(171, 123)", "(189, 141)", "(164, 108)", "(192, 152)"],
      answer: "(189, 141)",
    },
    {
      id: 13,
      question:
        "Three of the following four options are alike in a certain way and thus form a group. Which is the one that does NOT belong to that group?",
      options: [
        "540 - 188 - 128",
        "72 - 284 - 266",
        "81 - 101 - 92",
        "90 - 22 - 12",
      ],
      answer: "72 - 284 - 266",
    },
    {
      id: 14,
      question:
        "Which of the following terms will replace the question mark (?) in the given series? IMHP, MPJQ, QSLR, UVNS, ?",
      options: ["YYPT", "YYPT", "YXPT", "XYPT"],
      answer: "YYPT",
    },
    {
      id: 15,
      question:
        "In a certain code language, 'FACED' is written as 'GZDDE' and 'VACAY' is written as 'WZDZZ'. How will 'LABOR' be written in that language?",
      options: ["MZCNS", "MBCPS", "MBDPS", "MADMS"],
      answer: "MZCNS",
    },
    {
      id: 16,
      question:
        "Which two signs should be interchanged to make the following equation correct? 247 ÷ 13 + 16 × 3 - 148 = 119",
      options: ["+ and ×", "- and +", "- and ×", "+ and ×"],
      answer: "- and +",
    },
    {
      id: 17,
      question: "How many triangles are there in the given figure?",
      questionImage: "/images/reasoning/mock-1/question-17.png",
      options: ["18", "16", "21", "20"],
      answer: "21",
    },
    {
      id: 18,
      question:
        "Select the correct mirror image of the given figure when the mirror is placed at MN.",
      questionImage: "/images/reasoning/mock-1/question-18.png",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      optionImage: "/images/reasoning/mock-1/option-18.png",
      hasImageOptions: true,
      answer: "Option 1",
    },
    {
      id: 19,
      question:
        "Select the figure from among the given options that can replace the question mark (?) in the following series.",
      questionImage: "/images/reasoning/mock-1/question-19.png",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      optionImage: "/images/reasoning/mock-1/option-19.png",
      hasImageOptions: true,
      answer: "Option 1", // Note: Actual correct option not specified in text
    },
    {
      id: 20,
      question:
        "In a certain code language, 'FIVE' is written as '12184410' and FOUR is written as '12304236'. How will 'THREE' be written in that language?",
      options: ["4016361110", "4016361310", "4016361212", "4016361010"],
      answer: "4016361110",
    },
    {
      id: 21,
      question:
        "Select the correct mirror image of the given figure when the mirror is placed at MN as shown below.",
      questionImage: "/images/reasoning/mock-1/question-21.png",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      optionImage: "/images/reasoning/mock-1/option-21.png",
      hasImageOptions: true,
      answer: "Option 1", // Note: Actual correct option not specified in text
    },
    {
      id: 22,
      question:
        "In the following series, only one letter-cluster is incorrect. Select the incorrect letter-cluster: YCG, IMQ, SVZ, CGK, MQU",
      options: ["SVZ", "MQU", "CGK", "IMQ"],
      answer: "SVZ",
    },
    {
      id: 23,
      question:
        "Based on the English alphabetical order, three of the following four letter-clusters are alike in a certain way and thus form a group. Which is the one that DOES NOT belong to that group?",
      options: ["KJE", "JHD", "FDZ", "AYU"],
      answer: "FDZ",
    },
    {
      id: 24,
      question:
        "What will come in the place of the question mark (?) in the following equation, if '+' and '−' are interchanged and '×' and '÷' are interchanged? 342 × 18 + 79 - 45 + 3 = ?",
      options: ["65", "75", "85", "55"],
      answer: "75",
    },
    {
      id: 25,
      question:
        "[24/7] is related to [12/7] following a certain logic. Following the same logic, [11/15] is related to [11/30]. To which of the following is [9/13] related, following the same logic?",
      options: ["15/26", "9/39", "9/26", "10/27"], // Options not provided in original text
      answer: "9/26", // Answer not provided in original text
    },
  ],
};

export default sscCGLMockTest1;
