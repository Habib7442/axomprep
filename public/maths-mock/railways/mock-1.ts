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

const railwaysMockTest: MockTest = {
  name: "RAILWAYS",
  subject: "Mathematics",
  date: "15 September 2024",
  shift: "1",
  totalMarks: 50,
  passingMarks: 30,
  negativeMarking: 0.5,
  timeLimit: 30,
  questions: [
    {
      id: 1,
      question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
      options: [
        "120 m",
        "240 m",
        "300 m",
        "260 m"
      ],
      answer: "240 m"
    },
    {
      id: 2,
      question: "A train 110 meters long is running at a speed of 60 kmph. In what time will it pass a man who is running at 6 kmph in the direction opposite to that of the train?",
      options: [
        "5 sec",
        "6 sec",
        "7 sec",
        "10 sec"
      ],
      answer: "6 sec"
    },
    {
      id: 3,
      question: "Two trains are running in opposite directions with the same speed. If the length of each train is 120 meters and they cross each other in 12 seconds, then the speed of each train (in km/hr) is:",
      options: [
        "36",
        "45",
        "72",
        "60"
      ],
      answer: "72"
    },
    {
      id: 4,
      question: "A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?",
      options: [
        "89 sec",
        "65 sec",
        "100 sec",
        "150 sec"
      ],
      answer: "89 sec"
    },
    {
      id: 5,
      question: "Two trains of equal length are running on parallel lines in the same direction at 46 km/hr and 36 km/hr. The faster train passes the slower train in 36 seconds. The length of each train is:",
      options: [
        "50 m",
        "80 m",
        "72 m",
        "82 m"
      ],
      answer: "50 m"
    },
    {
      id: 6,
      question: "A train 800 meters long is running at a speed of 78 km/hr. If it crosses a tunnel in 1 minute, then the length of the tunnel is:",
      options: [
        "500 m",
        "300 m",
        "700 m",
        "400 m"
      ],
      answer: "300 m"
    },
    {
      id: 7,
      question: "A 270 meters long train running at the speed of 120 kmph crosses another train running in opposite direction at the speed of 80 kmph in 9 seconds. What is the length of the other train?",
      options: [
        "230 m",
        "240 m",
        "260 m",
        "320 m"
      ],
      answer: "230 m"
    },
    {
      id: 8,
      question: "A train 360 m long is running at a speed of 45 km/hr. In what time will it pass a bridge 140 m long?",
      options: [
        "40 sec",
        "42 sec",
        "45 sec",
        "48 sec"
      ],
      answer: "40 sec"
    },
    {
      id: 9,
      question: "Two trains are moving in opposite directions at 60 km/hr and 90 km/hr. Their lengths are 1.10 km and 0.9 km respectively. The time taken by the slower train to cross the faster train in seconds is:",
      options: [
        "48 sec",
        "72 sec",
        "60 sec",
        "84 sec"
      ],
      answer: "48 sec"
    },
    {
      id: 10,
      question: "A 150 m long train crosses a 200 m long platform in 20 seconds. The speed of the train is:",
      options: [
        "60 km/hr",
        "62.5 km/hr",
        "65 km/hr",
        "67.5 km/hr"
      ],
      answer: "62.5 km/hr"
    }
  ]
};

export default railwaysMockTest;
