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
  subject: "Mathematics",
  date: "4 January 2021",
  shift: "1",
  totalMarks: 30,
  passingMarks: 20,
  negativeMarking: 0.33,
  timeLimit: 25,
  questions: [
  {
    id: 0.1,
    question: "Harish and Bimal can complete a task in 20 days. They worked at it for 15 days and then Bimal left. The remaining work was done by Harish alone, in 10 days. Harish alone can complete the entire task in:",
    options: [
      "40 days",
      "30 days",
      "35 days",
      "45 days"
    ],
    answer: "45 days"
  },
  {
    id: 0.4,
    question: "If √(3^n) = 729, then the value of n is equal to:",
    options: [
      "6",
      "8",
      "12",
      "9"
    ],
    answer: "12"
  },
  {
    id: 0.8,
    question: "The HCF of two numbers is 6 and their LCM is 84. If one of these numbers is 42, then the second number is:",
    options: [
      "12",
      "40",
      "48",
      "30"
    ],
    answer: "12"
  },
  {
    id: 0.12,
    question: "If x²y² + 1/(x²y²) = 83, then the value of xy - 1/(xy) is:",
    options: [
      "85",
      "9",
      "10",
      "81"
    ],
    answer: "9"
  },
  {
    id: 0.17,
    question: "The ratio of the number of females to that of male employees in a small company is 2 : 3. If the number of male employees in the company is 90, then the total number of employees working in the company is:",
    options: [
      "150",
      "130",
      "90",
      "120"
    ],
    answer: "150"
  },
  {
    id: 0.18,
    question: "If the area of a circle is 154 cm², then the circumference of the circle is:",
    options: [
      "22 cm",
      "44 cm",
      "36 cm",
      "11 cm"
    ],
    answer: "44 cm"
  },
  {
    id: 0.20,
    question: "A businessman purchases 20 articles whose cost is equal to the selling price of 15 articles. The profit or loss percentage of the businessman is:",
    options: [
      "33.33% profit",
      "25% profit",
      "15% loss",
      "23.33% loss"
    ],
    answer: "33.33% profit"
  },
 
  {
    id: 0.27,
    question: "The value of [(3√2+2) × (3√2-2)] of 13 + 15 is:",
    options: [
      "616",
      "197",
      "140",
      "414"
    ],
    answer: "140"
  },
  {
    id: 0.28,
    question: "In a school, 60% of the students passed in an examination. If the number of failed candidates is 240, then the number of candidates that have passed is:",
    options: [
      "600",
      "240",
      "360",
      "410"
    ],
    answer: "360"
  },
  {
    id: 0.30,
    question: "There is a carpet of length 20½ m. How many small pieces of carpet, each of length 4½ m, can be cut out of it?",
    options: [
      "7",
      "8",
      "9",
      "5"
    ],
    answer: "5"
  },
  {
    id: 0.34,
    question: "If the ratio between two numbers is 3 : 5 and their LCM is 120, then the numbers are:",
    options: [
      "21; 35",
      "24; 40",
      "27; 45",
      "30; 50"
    ],
    answer: "24; 40"
  },
  {
    id: 0.37,
    question: "When a smaller number divides a larger number, we get a quotient of 6 and a remainder of 5. Find the smaller number if the difference between the two numbers is 1540.",
    options: [
      "580",
      "620",
      "735",
      "307"
    ],
    answer: "307"
  },
  {
    id: 0.38,
    question: "The value of (sin 23°)/(cos 67°) + (cos 71°)/(sin 19°) is:",
    options: [
      "1",
      "3",
      "2",
      "0"
    ],
    answer: "2"
  },
  {
    id: 0.43,
    question: "The difference between the simple interest and the compound interest on ₹5000/- at 10% per annum for 3 years is:",
    options: [
      "₹155",
      "₹480",
      "₹233",
      "₹235"
    ],
    answer: "₹155"
  },
  {
    id: 0.45,
    question: "The perimeters of two similar triangles, ΔPQR and ΔXYZ are 48 cm and 24 cm respectively. If XY = 12 cm, then PQ is:",
    options: [
      "24 cm",
      "18 cm",
      "12 cm",
      "8 cm"
    ],
    answer: "24 cm"
  },
  {
    id: 0.47,
    question: "Train A, running at the speed of 80 km/hr crossed train B, running at the speed of 70 km/hr in the opposite direction. Both trains finish crossing each other in 30 seconds. If the length of train A is 300 m, then the length of train B is:",
    options: [
      "855 m",
      "950 m",
      "850 m",
      "750 m"
    ],
    answer: "750 m"
  },
  {
    id: 0.48,
    question: "The capacity of a cylindrical tank is 2376 m³. If the radius of the tank is 21 m, then the depth of the tank is:",
    options: [
      "71 m",
      "2.89 m",
      "5.75 m",
      "3.72 m"
    ],
    answer: "2.89 m"
  },
  {
    id: 0.56,
    question: "The sum of two numbers is 25 and their difference is 15. The ratio of the numbers is:",
    options: [
      "2 : 3",
      "4 : 1",
      "3 : 2",
      "5 : 3"
    ],
    answer: "4 : 1"
  },
  {
    id: 0.59,
    question: "If x + 1/x = 9, then the value of x² + 1/x² is:",
    options: [
      "83",
      "81",
      "79",
      "81.01"
    ],
    answer: "79"
  },
  {
    id: 0.62,
    question: "The value of [(0.27)² - (0.13)²]/(0.27 + 0.13) is:",
    options: [
      "0.40",
      "0.03",
      "0.14",
      "1.40"
    ],
    answer: "0.14"
  },
  {
    id: 0.66,
    question: "If tanθ + cotθ = 5, then the value of tan²θ + cot²θ + 2tan²60° is:",
    options: [
      "29√3",
      "29",
      "25",
      "10√3"
    ],
    answer: "25"
  },
  {
    id: 0.67,
    question: "A class has 48 students. On a specific day, only 3/8 of the students were present; the number of absentees on the same day would be:",
    options: [
      "18",
      "28",
      "38",
      "30"
    ],
    answer: "30"
  },
  {
    id: 0.68,
    question: "The value of 15 × 14 - 30 + (3² + 17) is:",
    options: [
      "206",
      "124",
      "154",
      "266"
    ],
    answer: "206"
  },
  {
    id: 0.70,
    question: "The angle of elevation of a pole from a point, which is 20 m away from the foot of the pole is 45°. Find the height of the pole.",
    options: [
      "20 m",
      "20√2 m",
      "15 m",
      "10 m"
    ],
    answer: "20 m"
  },
  {
    id: 0.73,
    question: "The marks obtained by 7 students in a class in mathematics are 43, 44, 65, 41, 53, 65 and 62. The mode of the data is:",
    options: [
      "53",
      "65",
      "41",
      "62"
    ],
    answer: "65"
  },
  {
    id: 0.74,
    question: "15 male employees or 20 female employees of a company can complete a project in 26 days. How long will 30 male employees and 12 female employees together take to complete the project?",
    options: [
      "14 days",
      "10 days",
      "12 days",
      "8 days"
    ],
    answer: "10 days"
  },
  {
    id: 0.75,
    question: "The sum of two numbers is 16 and their product is 63. The sum of their reciprocal is equal to:",
    options: [
      "16/63",
      "63/16",
      "1/63",
      "64/63"
    ],
    answer: "16/63"
  },
  {
    id: 0.81,
    question: "27% of 250 - 0.02% of 1000 is equal to:",
    options: [
      "65.52",
      "52.56",
      "67.30",
      "76.30"
    ],
    answer: "67.30"
  },
  {
    id: 0.82,
    question: "A bank provides a loan at the rate of 5% per annum to a trader on an amount of ₹12,50,000 for 5 years. The simple interest to be paid is:",
    options: [
      "₹2,25,400",
      "₹3,12,500",
      "₹2,40,600",
      "₹4,20,250"
    ],
    answer: "₹3,12,500"
  },
  {
    id: 0.85,
    question: "PQRS is a cyclic trapezium where PQ is parallel to RS and PQ is the diameter. If ∠QPR = 40° then the ∠PSR is equal to:",
    options: [
      "130°",
      "120°",
      "140°",
      "110°"
    ],
    answer: "130°"
  }
],
};

export default rrbNTPCMockTest1;
