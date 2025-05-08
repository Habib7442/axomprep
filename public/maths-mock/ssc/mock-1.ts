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
  
  const sscCGLMockTest: MockTest = {
    name: "SSC",
    subject: "Mathematics",
    date: "9 September 2024",
    shift: "1",
    totalMarks: 50,
    passingMarks:30,
    negativeMarking: 0.5,
    timeLimit: 25,
    questions: [
      {
        id: 1,
        question: "Which digits should come in place * and $, respectively, if the number 72864*$ is divisible by both 8 and 5?",
        options: [
          "4 and 0",
          "2 and 0",
          "2 and 5",
          "4 and 5"
        ],
        answer: "4 and 0"
      },
      {
        id: 2,
        question: "The total number of soaps sold by companies Q and S together in May is what percentage more than the number of soaps sold by company P in July?",
        options: [
          "75%",
          "90%",
          "65%",
          "80%"
        ],
        answer: "80%"
      },
      {
        id: 3,
        question: "In a triangle PQR, S is a point on the side QR such that PS⊥QR. Which of the following options is true?",
        options: [
          "PS² + PR² = PQ² + QR²",
          "PR² + QS² = PQ² + SR²",
          "PQ² + PR² = QS² + SR²",
          "PS² + QS² = PQ² + PR²"
        ],
        answer: "PR² + QS² = PQ² + SR²"
      },
      {
        id: 4,
        question: "Simplify: 15.5 – [3 – (7 – (5 – (14.5 – 13.5)))]",
        options: [
          "15.5",
          "13.5",
          "12.5",
          "14.5"
        ],
        answer: "14.5"
      },
      {
        id: 5,
        question: "The incomes of P, Q, and R are in the ratio 10 : 12 : 9, and their expenditures are in the ratio 12 : 15 : 8. If Q saves 25% of his income, what is the ratio of the savings of P, Q, and R?",
        options: [
          "15 : 14 : 21",
          "14 : 15 : 21",
          "21 : 15 : 14",
          "21 : 14 : 15"
        ],
        answer: "14 : 15 : 21"
      },
      {
        id: 6,
        question: "If at least 40% marks in Mathematics are required for pursuing higher studies in Mathematics, how many students will be eligible to pursue higher studies in Mathematics?",
        options: [
          "55",
          "65",
          "70",
          "50"
        ],
        answer: "70"
      },
      {
        id: 7,
        question: "In triangles ABC and DEF, AB = FD and ∠A = ∠D. The two triangles are congruent by SAS criterion if:",
        options: [
          "BC = DE",
          "AC = EF",
          "BC = EF",
          "AC = DE"
        ],
        answer: "AC = DE"
      },
      {
        id: 8,
        question: "Two pipes, A and B, can fill a tank in 10 minutes and 20 minutes, respectively. Pipe C can empty the tank in 30 minutes. All three pipes are opened at the same time initially. However, pipe C is closed 2 minutes before the tank is filled. In what time will the tank be full (in minutes)?",
        options: [
          "12",
          "10",
          "8",
          "6"
        ],
        answer: "12"
      },
      {
        id: 9,
        question: "A payment of ₹120 is made with ₹10, ₹5, and ₹2 coins. A total of 25 coins are used. Which of the following is the number of ₹10 coins used in the payment?",
        options: [
          "6",
          "4",
          "10",
          "8"
        ],
        answer: "8"
      },
      {
        id: 10,
        question: "If 28.9 : x :: x : 36.1, and x > 0, find the value of x.",
        options: [
          "38.3",
          "32.3",
          "30.4",
          "35"
        ],
        answer: "32.3"
      },
      {
        id: 11,
        question: "If the total number of successful start-ups is 2910, find the number of start-ups in the education and agriculture sectors. (Neglect the decimal part.)",
        options: [
          "698",
          "1048",
          "1074",
          "1047"
        ],
        answer: "1048"
      },
      {
        id: 12,
        question: "The height of a cylinder is 20 cm. The lateral surface area is 1760 cm². Its volume is:",
        options: [
          "12032 cm³",
          "12302 cm³",
          "12203 cm³",
          "12320 cm³"
        ],
        answer: "12320 cm³"
      },
      {
        id: 13,
        question: "Raj divides ₹1,200 in the ratio 2 : 1 : 3 among three of his friends. The amount equal to the sum of three times the largest share and two times the smallest share is:",
        options: [
          "₹2,400",
          "₹1,800",
          "₹2,200",
          "₹2,000"
        ],
        answer: "₹2,400"
      },
      {
        id: 14,
        question: "A shopkeeper marked an article at ₹5,000. The shopkeeper allows successive discounts of 20%, 15%, and 10%. The selling price of the article is:",
        options: [
          "₹2,750",
          "₹3,000",
          "₹2,800",
          "₹3,060"
        ],
        answer: "₹3,060"
      },
      {
        id: 15,
        question: "The average of 12 numbers is 48. The average of the first 5 numbers is 45 and the average of the next 4 numbers is 52. If the 10th number is 10 less than the 11th number and 5 more than the 12th number, then the average of the 11th and 12th numbers is:",
        options: [
          "50.5",
          "46.5",
          "47.5",
          "48.5"
        ],
        answer: "48.5"
      },
      {
        id: 16,
        question: "Find the value of the following expression: √[(1 + sin θ)/(1 - sin θ)]",
        options: [
          "sec θ + tan θ",
          "cosec θ + tan θ",
          "cosec θ + cot θ",
          "sec θ + cot θ"
        ],
        answer: "sec θ + tan θ"
      },
      {
        id: 17,
        question: "The value of: (sin θ - 2 sin³ θ)/(2 cos³ θ - cos θ) * (1/tan θ) = sec² θ",
        options: [
          "2",
          "1",
          "0",
          "-1"
        ],
        answer: "1"
      },
      {
        id: 18,
        question: "Let t = 2/5, then the value of the expression t³ + (3/5)³ + (9/5)t is:",
        options: [
          "1/5",
          "1",
          "2",
          "1/2"
        ],
        answer: "1"
      },
      {
        id: 19,
        question: "M and N walk along a circular track. They start at 5:00 a.m. from the same point in opposite directions. M and N walk at speeds of 5 rounds per hour and 2 rounds per hour, respectively. How many times will they cross each other before 6:30 a.m. on the same day?",
        options: [
          "10",
          "3",
          "5",
          "7"
        ],
        answer: "10"
      },
      {
        id: 20,
        question: "Two circles C₁ and C₂ touch each other externally. The radius of C₁ = 16 cm and the radius of C₂ = 8 cm. Find the length (in cm) of their common tangent.",
        options: [
          "8√3",
          "16√3",
          "8√2",
          "16√2"
        ],
        answer: "16√2"
      },
      {
        id: 21,
        question: "If x + (1/x) = 15, then the value of (7x² - 9x + 7)/(x² - x + 1) is:",
        options: [
          "-48/7",
          "-22/7",
          "48/7",
          "22/7"
        ],
        answer: "48/7"
      },
      {
        id: 22,
        question: "In which of the given year(s) was the production of B type refrigerator closest to its average production over the given years?",
        options: [
          "Both 2012 and 2013",
          "Both 2013 and 2015",
          "2014",
          "Only 2012"
        ],
        answer: "Both 2012 and 2013"
      },
      {
        id: 23,
        question: "The measures of the three angles of a triangle are in the ratio 17 : 13 : 15. Find the positive difference between the greatest and the smallest of these three angles.",
        options: [
          "16°",
          "24°",
          "20°",
          "12°"
        ],
        answer: "16°"
      },
      {
        id: 24,
        question: "If 2 cosec² θ + 3 cot² θ = 17, then the value of θ when 0° ≤ θ ≤ 90° is:",
        options: [
          "45°",
          "90°",
          "30°",
          "75°"
        ],
        answer: "30°"
      },
      {
        id: 25,
        question: "A certain sum of money becomes seven times itself when invested at a certain rate of simple interest in 14 years. How much time (in years, rounded off to 2 decimal places) will it take to become 18 times itself at the same rate?",
        options: [
          "27.33",
          "39.67",
          "42.78",
          "35.5"
        ],
        answer: "39.67"
      }
    ]
  };
  
  export default sscCGLMockTest;