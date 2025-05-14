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
  subject: "General Knowledge",
  date: "4 January 2021",
  shift: "1",
  totalMarks: 40,
  passingMarks: 30,
  negativeMarking: 0.33,
  timeLimit: 25,
  questions: [
    {
      id: 2,
      question: "Who launched the Sukanya Samridhi Yojana?",
      options: [
        "Narendra Modi",
        "HD Deve Gowda",
        "Atal Bihari Vajpayee",
        "Manmohan Singh",
      ],
      answer: "Narendra Modi",
    },
    {
      id: 3,
      question: "The main focus of the First Five-Year Plan was on the ______.",
      options: [
        "service sector",
        "agricultural and industrial sector",
        "agricultural sector",
        "industrial sector",
      ],
      answer: "agricultural sector",
    },
    {
      id: 5,
      question:
        "In which year did India first participate in the Olympic games?",
      options: ["1900", "1925", "1923", "1924"],
      answer: "1900",
    },
    {
      id: 6,
      question: "With which state is the Nabakalebara festival associated?",
      options: ["Odisha", "Assam", "Sikkim", "West Bengal"],
      answer: "Odisha",
    },
    {
      id: 7,
      question:
        "Which branch of physics deals with properties of fluids at rest?",
      options: ["Hydrostatics", "Astrophysics", "Thermodynamics", "Optics"],
      answer: "Hydrostatics",
    },
    {
      id: 9,
      question:
        "The first Amendment to the constitution of India was made on ______.",
      options: ["1951", "1953", "1952", "1950"],
      answer: "1951",
    },
    {
      id: 10,
      question: "The pH range of a human body is:",
      options: ["2.35 - 4.45", "5.35 - 6.45", "7.35 - 7.45", "8.35 - 9.45"],
      answer: "7.35 - 7.45",
    },
    {
      id: 11,
      question: "When was the Hindustan Republican Association formed?",
      options: ["1920", "1922", "1924", "1926"],
      answer: "1924",
    },
    {
      id: 13,
      question:
        "As per Nov 2020, How many countries have membership in the World Trade Organisation?",
      options: ["168", "160", "164", "165"],
      answer: "164",
    },
    {
      id: 14,
      question: "Where was the first nuclear power plant set up in India?",
      options: ["Kalapakkam", "Kakrapur", "Tarapur", "Kaiga"],
      answer: "Tarapur",
    },
    {
      id: 15,
      question: "Who wrote the famous Hindi novel 'Tamas'?",
      options: ["Yashpal", "Nagendra", "Bhisham Sahni", "Trilochan"],
      answer: "Bhisham Sahni",
    },
    {
      id: 16,
      question: "When did the Simon Commission arrive in India?",
      options: ["1931", "1928", "1927", "1930"],
      answer: "1928",
    },
    {
      id: 19,
      question: "Which industry uses limestone as raw material?",
      options: ["Plastic", "Automobile", "Utensils", "Cement"],
      answer: "Cement",
    },
    {
      id: 21,
      question: "Programming language Java was developed by ______.",
      options: [
        "Paul Allen",
        "Jaap Haartsen",
        "Charles Simonyi",
        "James Gosling",
      ],
      answer: "James Gosling",
    },
    {
      id: 23,
      question: "Who built the Sanchi Stupa?",
      options: ["Ashoka", "Chanakaya", "Bindusar", "Chandragupta"],
      answer: "Ashoka",
    },
    {
      id: 24,
      question:
        "The first national flag of India is said to have hoisted at ______ in 1906.",
      options: ["Patna", "Kolkata", "New Delhi", "Ahmedabad"],
      answer: "Kolkata",
    },
    {
      id: 25,
      question: "The pistil in the flower is ______.",
      options: [
        "a male reproductive part",
        "unisexual",
        "a female reproductive part",
        "bisexual",
      ],
      answer: "a female reproductive part",
    },
    {
      id: 26,
      question:
        "According to the World Development Report, countries having per capita income of more than US$12,000 per annum as on 2016 are called:",
      options: [
        "poor countries",
        "low income countries",
        "rich countries",
        "low middle income countries",
      ],
      answer: "rich countries",
    },
    {
      id: 32,
      question: "What was the code name for Pokhran Nuclear Test 2?",
      options: [
        "Laughing Buddha",
        "Smiling Buddha",
        "Operation Research",
        "Operation Shakti",
      ],
      answer: "Operation Shakti",
    },
    {
      id: 33,
      question: "In which form is data stored in a computer?",
      options: ["Binary", "Picture", "Magnetic", "Alphabets"],
      answer: "Binary",
    },
    {
      id: 35,
      question:
        "In which year were the Women Transforming India Awards started by NITI Aayog?",
      options: ["2016", "2015", "2014", "2017"],
      answer: "2016",
    },
    {
      id: 36,
      question: "How many non-permanent members does the UN Council have?",
      options: ["15", "10", "12", "14"],
      answer: "10",
    },
    {
      id: 39,
      question: "The ability of metals to be drawn into thin wires is called:",
      options: ["malleability", "ductility", "reactivity", "solubility"],
      answer: "ductility",
    },
    {
      id: 42,
      question: "Raja Ravi Varma was a famous ______.",
      options: ["painter", "poet", "mathematician", "singer"],
      answer: "painter",
    },
    {
      id: 49,
      question: "The first high court of India was established in ______.",
      options: ["Kolkata", "Delhi", "Mumbai", "Punjab"],
      answer: "Kolkata",
    },
    {
      id: 50,
      question: "When did the RTI Act come into effect?",
      options: [
        "December 2005",
        "November 2006",
        "September 2005",
        "October 2005",
      ],
      answer: "October 2005",
    },
    {
      id: 51,
      question:
        "Pradhan Mantri Swasthya Suraksha Yojana (PMSSY) was launched in the year ______.",
      options: ["2006", "2004", "2003", "2005"],
      answer: "2006",
    },
    {
      id: 52,
      question: "When did Akbar become the emperor?",
      options: ["1552 AD", "1550 AD", "1560 AD", "1556 AD"],
      answer: "1556 AD",
    },
    {
      id: 53,
      question: "Who among the following is the youngest Nobel Laureate?",
      options: [
        "Lawrence Bragg",
        "Nadia Murad",
        "Malala Yousafzai",
        "Tsung Dao Lee",
      ],
      answer: "Malala Yousafzai",
    },
    {
      id: 54,
      question: "In which of the following does the river Godavari originate?",
      options: ["Yammotri", "Brahmagiri Hills", "Hills of Coorg", "Gangotri"],
      answer: "Brahmagiri Hills",
    },
    {
      id: 57,
      question:
        "How many world heritage sites have been protected by UNESCO as of June 2020?",
      options: ["1121", "1256", "1056", "1273"],
      answer: "1121",
    },
    {
      id: 63,
      question:
        "How many environmental activists got the Goldman Environmental Prize 2019?",
      options: ["5", "4", "6", "3"],
      answer: "6",
    },
    {
      id: 64,
      question: "In which state is the Gandhi Sagar Dam constructed?",
      options: [
        "Maharashtra",
        "Himachal Pradesh",
        "Rajasthan",
        "Madhya Pradesh",
      ],
      answer: "Madhya Pradesh",
    },
    {
      id: 65,
      question:
        "When was the revolt of 1857 finally suppressed by the British?",
      options: ["1859", "1861", "1860", "1857"],
      answer: "1859",
    },
    {
      id: 69,
      question: "URL stands for:",
      options: [
        "Uniform Resource Locator",
        "Uniform Remote Locator",
        "Universal Remote Land",
        "Universal Resource Locator",
      ],
      answer: "Uniform Resource Locator",
    },
    {
      id: 72,
      question: "On which river is the Sardar Sarovar Dam constructed?",
      options: ["Ganga", "Brahmaputra", "Yamuna", "Narmada"],
      answer: "Narmada",
    },
    {
      id: 76,
      question: "______ is the largest Bauxite producing state of India.",
      options: ["Odisha", "Jharkhand", "Andhra Pradesh", "Gujarat"],
      answer: "Odisha",
    },
    {
      id: 83,
      question: "The cause of Hepatitis A is a:",
      options: ["mosquito bite", "bacteria", "virus", "protozoa"],
      answer: "virus",
    },
    {
      id: 84,
      question: "Which organ in the human body produces bile juice?",
      options: ["Small intestine", "Pancreas", "Liver", "Stomach"],
      answer: "Liver",
    },
  ],
};

export default rrbNTPCMockTest1;
