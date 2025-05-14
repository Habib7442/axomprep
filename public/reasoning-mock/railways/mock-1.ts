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

const rrbNTPCMockTest1: MockTest = {
  name: "Railways",
  subject: "Reasoning",
  date: "4 January 2021",
  shift: "1",
  totalMarks: 30,
  passingMarks: 20,
  negativeMarking: 0.33,
  timeLimit: 25,
  questions: [
    {
      id: 22,
      question:
        "A mango kept in a basket doubles every one minute. If the basket gets completely filled by mangoes in 30 min then in how many minutes half of the basket was filled?",
      options: ["27", "29", "15", "28"],
      answer: "29",
    },
    {
      id: 31,
      question:
        "1. Banana price is more than that of lychee. 2. Banana price is less than that of kiwi. 3. Kiwi Price is more than that of banana and lychee. If both, 1 and 2 statements are true, then third is:",
      options: ["vague", "true", "uncertain", "false"],
      answer: "true",
    },
    {
      id: 40,
      question:
        "In a class of students, Rajesh ranks 15th from the top and Prakash ranks 25th from the bottom. Gyan is on the 10th place ahead of Prakash. If there are 10 students, exactly in between Rajesh and Gyan, then how many total students are there in the class?",
      options: ["60", "55", "40", "50"],
      answer: "60",
    },
    {
      id: 41,
      question: "Pick the odd one out.",
      options: ["MNKL", "IJGH", "EFCD", "OPQR"],
      answer: "OPQR",
    },
    {
      id: 44,
      question:
        "In a symbolic language, ‘turn is a hot place’ is written as ‘a hot is place stunt’ and ‘water vapour to air here’, as ‘to air vapour here water’, then in the same language, ‘shimla is a hill place’ would be written as?",
      options: [
        "Shimla is a hill place",
        "A hill is place shimla",
        "A hill place is shimla",
        "shimla is a place hill",
      ],
      answer: "A hill is place shimla",
    },
    {
      id: 46,
      question:
        "Select the option that is related to the third term in the same way as the second term is related to the first term. BSTN : AQUP :: DNUC : ?",
      options: ["CLVE", "BSTO", "TOUS", "TSTB"],
      answer: "CLVE",
    },
    {
      id: 55,
      question:
        "Five students are sitting in a circle facing the center. Sunii is between Sunil and Sushmit. Sushma is on the left side of Shweta. Sushmit and Sushma are not sitting next to each other. Who is sitting next to Sunii on his right side?",
      options: ["Sushma", "Sushmit", "Shweta", "Sunil"],
      answer: "Shweta",
    },
    {
      id: 58,
      question:
        "Select the combination of letters that when sequentially placed in the blanks will create a repetitive pattern. a, bc_a_bctia_ccd_bcd_",
      options: [
        "a, a, b, c, c, d",
        "a, c, b, d, b, d",
        "a, d, b, b, a, d",
        "a, d, b, b, d, d",
      ],
      answer: "a, c, b, d, b, d",
    },
    {
      id: 60,
      question:
        "Consider the given statement and decide which of the given assumptions is/are implicit in the statement. Statement: A wealthy person has a higher chance of having diabetes. Assumptions: I. Most of causes of death among wealthy persons are due to diabetes. II. Poor persons do not have diabetes.",
      options: [
        "Only assumptions (II) is implicit.",
        "Both, assumptions (I) and (II) are implicit.",
        "Neither assumption (I) nor (II) is implicit.",
        "Only assumptions (I) is implicit.",
      ],
      answer: "Neither assumption (I) nor (II) is implicit.",
    },
    {
      id: 61,
      question:
        "Select the number from among the given options that can replace the question mark (?) in the following series. 64, 60, 52, 40, 9:4",
      options: ["20", "24", "10", "16"],
      answer: "24",
    },
    {
      id: 71,
      question: "How many triangles are there in the following figures?",
      questionImage: "/images/reasoning/railways/mock-1/question-71.png",
      options: ["20", "18", "22", "16"],
      answer: "22",
    },
    {
      id: 77,
      question:
        "Aman is older than Sahu, Sahu is younger than Komal but older than Millan. Komal is older than Aman but younger than Uday. Who is the third oldest among them?",
      options: ["Komal", "Aman", "Sahu", "Uday"],
      answer: "Aman",
    },
    {
      id: 78,
      question:
        "Select the option that is related to the third term in the same way as the second term is related to the first term. DFB : GHC :: LNJ : ?",
      options: ["LOJ", "OQM", "OPK", "EGC"],
      answer: "OPK",
    },
    {
      id: 79,
      question:
        "Read the given statements and conclusions carefully and decide which of the conclusions logically follow(s) from the statements. Statement: Some woman are wise. All wise are engineers. Conclusions: I. Some women are engineers. II. All engineers are wise.",
      options: [
        "Neither conclusion I nor conclusion II follows.",
        "Both, conclusion (I) and (II) follow.",
        "Only conclusion (II) follows.",
        "Only conclusion (I) follows.",
      ],
      answer: "Only conclusion (I) follows.",
    },
    {
      id: 80,
      question:
        "If “-” denotes ‘multiplication’, ‘-’ denotes ‘addition’, ‘×’ denotes ‘division’ and ‘+’ denotes ‘subtraction’, then which of the following equation is true?",
      options: [
        "9 + 5 - 16 × 4 + 2 = 41",
        "15 + 15 × 3 - 4 + 5 = 26",
        "10 - 12 + 18 × 6 + 2 = 16",
        "11 + 8 × 2 - 4 + 1 = 42",
      ],
      answer: "10 - 12 + 18 × 6 + 2 = 16",
    },
    {
      id: 86,
      question:
        "If 'A+B' means 'A is daughter of B', 'A - B' means 'A is wife of B', 'A + B' means 'A is the son of B'. If P-Q-S then which of the following is true?",
      options: [
        "Q is the father of P",
        "P is a daughter of Q",
        "S is the father of P",
        "S is the wife Q",
      ],
      answer: "S is the father of P",
    },
    {
      id: 87,
      question:
        "Read the given statements and conclusions carefully and decide which of the conclusions logically follow(s) from the statements. Statements: Regularity is a cause for a success in exams. Some irregular students pass in the examinations. Conclusions: I. All irregular students pass in exams. II. Some irregular students fail in the exam.",
      options: [
        "Only conclusion (II) follows.",
        "Only conclusion (I) follows.",
        "Both, conclusion (I) and conclusion ( II) follow.",
        "Neither conclusion I nor conclusion II follows.",
      ],
      answer: "Only conclusion (II) follows.",
    },
    {
      id: 88,
      question:
        "In the given figure, how many hockey players are playing football?",
      questionImage: "/images/reasoning/railways/mock-1/question-88.png",
      options: ["55", "35", "41", "22"],
      answer: "41",
    },
    {
      id: 89,
      question: "Select the number that is different from the rest.",
      options: ["72563", "52637", "56372", "63754"],
      answer: "63754",
    },
    {
      id: 90,
      question:
        "A, B, C, D, and E are sitting in a line. C is sitting at the west end and E is the neighbour of B and C. Between A and C there are two persons. Who is sitting at the east end?",
      options: ["B", "D", "A", "C"],
      answer: "D",
    },
    {
      id: 91,
      question:
        "If in a certain code, INTEREST is written as TSEKETNI, then in the same code, REMEMBER would be written as:",
      options: ["REWOLFES", "MEMBARAI", "SATATAION", "REBMEMER"],
      answer: "REBMEMER",
    },
    {
      id: 92,
      question:
        "In one of the following letter-clusters, the number of letters skipped in between the adjacent letters is in a decreasing sequence. Identify the letter-cluster.",
      options: ["UPGIG", "OJEBG", "UNSOB", "VQMJH"],
      answer: "VQMJH",
    },
    {
      id: 94,
      question:
        "Select the option that is related to the third number in the same way as the second number is related to the first number. 25 : 16 : 41 : 9",
      options: ["32", "31", "30", "51"],
      answer: "32",
    },
    {
      id: 95,
      question:
        "Select the number from among the given options that can replace the question mark (?) in the following series. 2, 6, 12, 20, 7, 9",
      options: ["30, 42", "27, 36", "25, 30", "32, 48"],
      answer: "30, 42",
    },
    {
      id: 96,
      question:
        "Select the number from among the given options that can replace the question mark (?) in the following series. 8, 27, 64, 125, 216, 7",
      options: ["353", "337", "343", "341"],
      answer: "343",
    },
    {
      id: 97,
      question: "Pick the odd one out.",
      options: ["LEOPARD", "COW", "DEER", "TIGER"],
      answer: "COW",
    },
    {
      id: 98,
      question:
        "Which of the following diagrams best represents the relationship between Man, Father and Brother?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      optionImage: "/images/reasoning/railways/mock-1/option-98.png",
      answer: "Option 2",
      hasImageOptions: true,
    },
    {
      id: 99,
      question:
        "Select the option in which the words share the same relationship as that shared by the given pair of words. Cat : Mew :: ?",
      options: ["Duck : Quack", "Jackal : Hoot", "Bull : Crow", "Owl: Hiss"],
      answer: "Duck : Quack",
    },
    {
      id: 100,
      question:
        "Select the number from among the given options that can replace the question mark (?) in the following table.",
      questionImage: "/images/reasoning/railways/mock-1/question-100.png",
      options: ["23", "55", "26", "25"],
      answer: "26",
    },
  ],
};

export default rrbNTPCMockTest1;
