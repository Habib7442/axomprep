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

const bankingMockTest: MockTest = {
  name: "BANKING",
  subject: "Mathematics",
  date: "20 September 2024",
  shift: "1",
  totalMarks: 50,
  passingMarks: 30,
  negativeMarking: 0.5,
  timeLimit: 35,
  questions: [
    {
      id: 1,
      question: "A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:",
      options: [
        "Rs. 698",
        "Rs. 700",
        "Rs. 720",
        "Rs. 735"
      ],
      answer: "Rs. 698"
    },
    {
      id: 2,
      question: "A sum of money placed at compound interest doubles itself in 4 years. In how many years will it amount to eight times itself?",
      options: [
        "8 years",
        "10 years",
        "12 years",
        "16 years"
      ],
      answer: "12 years"
    },
    {
      id: 3,
      question: "A man took a loan from a bank at the rate of 12% p.a. simple interest. After 3 years he had to pay Rs. 5400 interest only for the period. The principal amount borrowed by him was:",
      options: [
        "Rs. 15000",
        "Rs. 18000",
        "Rs. 20000",
        "Rs. 22500"
      ],
      answer: "Rs. 15000"
    },
    {
      id: 4,
      question: "A sum of Rs. 12,500 amounts to Rs. 15,500 in 4 years at the rate of simple interest. What is the rate of interest?",
      options: [
        "3%",
        "4%",
        "5%",
        "6%"
      ],
      answer: "6%"
    },
    {
      id: 5,
      question: "At what rate of compound interest per annum will a sum of Rs. 1200 become Rs. 1348.32 in 2 years?",
      options: [
        "6%",
        "8%",
        "10%",
        "12%"
      ],
      answer: "6%"
    },
    {
      id: 6,
      question: "The difference between simple and compound interests compounded annually on a certain sum of money for 2 years at 4% per annum is Rs. 1. The sum is:",
      options: [
        "Rs. 625",
        "Rs. 630",
        "Rs. 640",
        "Rs. 650"
      ],
      answer: "Rs. 625"
    },
    {
      id: 7,
      question: "A sum of money lent out at simple interest amounts to Rs. 720 after 2 years and to Rs. 1020 after a further period of 5 years. The sum is:",
      options: [
        "Rs. 600",
        "Rs. 620",
        "Rs. 640",
        "Rs. 660"
      ],
      answer: "Rs. 600"
    },
    {
      id: 8,
      question: "A person borrows Rs. 5000 for 2 years at 4% p.a. simple interest. He immediately lends it to another person at 6.5% p.a for 2 years. His gain in the transaction is:",
      options: [
        "Rs. 225",
        "Rs. 250",
        "Rs. 275",
        "Rs. 300"
      ],
      answer: "Rs. 250"
    },
    {
      id: 9,
      question: "The compound interest on Rs. 30,000 at 7% per annum for 3 years, compounded annually, is:",
      options: [
        "Rs. 6,727.50",
        "Rs. 6,825.15",
        "Rs. 7,347.30",
        "Rs. 7,902.10"
      ],
      answer: "Rs. 6,727.50"
    },
    {
      id: 10,
      question: "A sum of money invested at compound interest amounts to Rs. 4,624 in 2 years and to Rs. 5,324 in 3 years. The rate of interest per annum is:",
      options: [
        "10%",
        "12%",
        "15%",
        "18%"
      ],
      answer: "15%"
    }
  ]
};

export default bankingMockTest;
