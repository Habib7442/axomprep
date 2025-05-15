interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  questionImage?: string;
  optionImage?: string;
  hasImageOptions?: boolean;
}

interface MockTest {
  id?: string;
  name: string;
  date: string;
  shift: string;
  subject: string;
  totalMarks: number;
  passingMarks: number;
  negativeMarking: number;
  timeLimit: number;
  questions: Question[];
}

const rrbJeMockTest1: MockTest = {
  name: "RRB JE",
  subject: "Full Length",
  date: "16/12/2024",
  shift: "1",
  totalMarks: 100,
  passingMarks: 60,
  negativeMarking: 0.33,
  timeLimit: 90,
  questions: [
    {
      id: 1,
      question:
        "In a series combination of resistors, how is the voltage distributed across each resistor?",
      options: [
        "The same across all resistors",
        "Unaffected by resistance values",
        "Inversely proportional to resistance",
        "Directly proportional to resistance",
      ],
      answer: "Directly proportional to resistance",
    },
    {
      id: 2,
      question:
        "What should come in place of the question mark (?) in the given series? 1 13 28 46 67 ?",
      options: ["90", "93", "92", "91"],
      answer: "91",
    },
    {
      id: 3,
      question:
        "An emf is induced whenever there is a change in the magnetic field linked with electric circuits. This is stated by the:",
      options: [
        "Ohm's law",
        "Newton's law",
        "Faraday's law",
        "Gravitation law",
      ],
      answer: "Faraday's law",
    },
    {
      id: 4,
      question:
        "The cost of a washing machine is 75% less than the cost of a TV. If the cost of the washing machine increases by 77% and that of the TV decreases by 27%, then what is the change in the total cost of 8 washing machines and 2 TVs?",
      options: [
        "Increase by 25%",
        "Decrease by 22%",
        "Decrease by 29%",
        "Increase by 31%",
      ],
      answer: "Increase by 25%",
    },
    {
      id: 5,
      question:
        "A shopkeeper lists the price of a fan at 20% above its cost price and offers a 10% discount on its list price. If he earns a profit of ₹150, then what is the list price (in ₹) of the fan?",
      options: ["1969", "2054", "2172", "2250"],
      answer: "2250",
    },
    {
      id: 6,
      question:
        "P is the sister of Q's brother R. S is the husband of Q and T is the son of S. How is P related to T?",
      options: ["Mother's sister", "Mother's mother", "Mother", "Sister"],
      answer: "Mother's sister",
    },
    {
      id: 7,
      question:
        "Which of the following reactions does NOT represent a neutralisation reaction?",
      options: [
        "Na₂CO₃ + HCl → NaCl + CO₂ + H₂O",
        "CH₂COOH + NaOH → CH₂COONa + H₂O",
        "H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O",
        "HCl + NaOH → NaCl + H₂O",
      ],
      answer: "Na₂CO₃ + HCl → NaCl + CO₂ + H₂O",
    },
    {
      id: 8,
      question:
        "Who among the following is India's first civilian space tourist?",
      options: [
        "Prasanth Balakrishnan Nair",
        "Ajit Krishnan",
        "Gopichand Thotakura",
        "Shubhanshu Shukla",
      ],
      answer: "Gopichand Thotakura",
    },
    {
      id: 9,
      question: "The commutator in an electric motor is used to:",
      options: [
        "maintain the potential difference in the circuit",
        "maintain the magnetic field in the circuit",
        "reverse the direction of current flowing through the coil",
        "change the direction of the magnetic field",
      ],
      answer: "reverse the direction of current flowing through the coil",
    },
    {
      id: 10,
      question:
        "17 men can dig a ditch 26 m long in 18 days, working 8 hours a day. How many more men should be engaged to dig a similar ditch 39 m long in 6 days, each man now working 9 hours a day?",
      options: ["51", "55", "53", "48"],
      answer: "51",
    },
    {
      id: 11,
      question:
        "A shopkeeper bought an article for ₹740. At what price (in ₹) should he sell the article to make 20% profit?",
      options: ["900", "876", "592", "888"],
      answer: "888",
    },
    {
      id: 12,
      question:
        "SKIB is related to OGNG in a certain way based on the English alphabetical order. In the same way, CUCV is related to YQHA. To which of the following options is QIRK related, following the same logic?",
      options: ["MEPW", "MWEP", "MEWP", "MWPE"],
      answer: "MEWP",
    },
    {
      id: 13,
      question:
        "Find the simple interest (in closest integral ₹) on ₹4000 at 5.25% per annum rate of interest for the period from 12 February 2024 to 13 April 2024",
      options: ["36", "35", "34", "33"],
      answer: "35",
    },
    {
      id: 14,
      question:
        "Five friends, S, T, U, V and W, are of different ages. Who is the second eldest among them? Statements: (I) W is younger than T. W is elder than U. (II) T is the eldest. Only one person is younger than V.",
      options: [
        "Data in statement II alone is sufficient to answer the question while data in statement I is not.",
        "Data in statement I alone is sufficient to answer the question while data in statement II is not.",
        "Data in statements I and II together are not sufficient to answer the question.",
        "Data in statements I and II together are sufficient to answer the question.",
      ],
      answer:
        "Data in statements I and II together are sufficient to answer the question.",
    },
    {
      id: 15,
      question: "Write the expanded form of (8a + 3b + 9c)².",
      options: [
        "64a² + 9b² + 81c² + 48ab + 54bc + 144ac",
        "64a² + 9b² + 81c² + 48ab + 49bc + 144ac",
        "64a² + 9b² + 81c² + 48ab + 54bc + 154ac",
        "64a² + 9b² + 81c² + 52ab + 54bc + 144ac",
      ],
      answer: "64a² + 9b² + 81c² + 48ab + 54bc + 144ac",
    },
    {
      id: 16,
      question:
        "Chaitanya Mahaprabhu was related to which of the following religious sects?",
      options: ["Vaishnava", "Shaiva", "Kapalika", "Tantra"],
      answer: "Vaishnava",
    },
    {
      id: 17,
      question: "A number when increased by 50%, gives 2820. The number is:",
      options: ["940", "3760", "1880", "5640"],
      answer: "1880",
    },
    {
      id: 18,
      question:
        "Who among the following secured a gold medal for India at the Paris Paralympics 2024?",
      options: ["Nishad Kumar", "Avani Lekhara", "Mona Agarwal", "Preethi Pal"],
      answer: "Avani Lekhara",
    },
    {
      id: 19,
      question: "What are regenerative cells used by Hydra for?",
      options: [
        "Hydra uses regenerative cells for reproduction by spore formation.",
        "Hydra uses regenerative cells for reproduction by fragmentation.",
        "Hydra uses regenerative cells for reproduction by budding.",
        "Hydra uses regenerative cells for reproduction by sexual reproduction.",
      ],
      answer: "Hydra uses regenerative cells for reproduction by budding.",
    },
    {
      id: 20,
      question:
        "In a certain code language, 'soldier protect country' is coded as 'lu mh na', 'entrepreneur prosper country' is coded as 'na ki tu' and 'soldier entrepreneur vital' is coded as 'mh tu sy'. What is the possible code for 'country vital' in that language?",
      options: ["na sy", "mh na", "sy ki", "tu na"],
      answer: "na sy",
    },
    {
      id: 21,
      question:
        "Which of the following reactions represents the combustion of methane?",
      options: [
        "CH₄ + O₂ → CO₂ + 2H₂O",
        "CH₄ + Cl₂ → CH₂Cl + HCl",
        "CH₄ + O₂ → CO + H₂O",
        "CH₄ + H₂O → CO + H₂",
      ],
      answer: "CH₄ + O₂ → CO₂ + 2H₂O",
    },
    {
      id: 22,
      question:
        "Kamal starts from Point A and drives 17 km towards south. He then takes a left turn, drives 13 km, turns left and drives 21 km. He then takes a left turn and drives 18 km. He takes a final left turn, drives 4 km and stops at Point P. How far (shortest distance) and towards which direction should he drive in order to reach Point A again?",
      options: [
        "5 km to the east",
        "3 km to the east",
        "6 km to the east",
        "4 km to the east",
      ],
      answer: "5 km to the east",
    },
    {
      id: 23,
      question:
        "What should come in place of the question mark (?) in the given series based on the English alphabetical order? ONL AZX MLJ YXV ?",
      options: ["JHK", "JKH", "KJH", "KHJ"],
      answer: "KJH",
    },
    {
      id: 24,
      question:
        "Two sets of numbers are given below. In each set of numbers, certain mathematical operation(s) on the first number result(s) in the second number. Similarly, certain mathematical operation(s) on the second number result(s) in the third number and so on. Which of the given options follows the same set of operations as in the given sets? (NOTE: Operations should be performed on the whole numbers, without breaking down the numbers into their constituent digits.) 16 – 17 – 21 – 30; 13 – 14 – 18 – 27",
      options: [
        "11 – 12 – 16 – 18",
        "24 – 25 – 29 – 42",
        "15 – 16 – 20 – 26",
        "22 – 23 – 27 – 36",
      ],
      answer: "22 – 23 – 27 – 36",
    },
    {
      id: 25,
      question:
        "Two taps can fill a cistern in 2 hours and 54 hours respectively. A third tap can empty it in 54 hours. How long (in hours) will it take to fill the empty cistern, if all of them are opened together?",
      options: ["5", "4", "3", "2"],
      answer: "2",
    },
    {
      id: 26,
      question: "Write the expanded form of (9a + 4b + 5c)².",
      options: [
        "81a² + 16b² + 25c² + 72ab + 35bc + 90ac",
        "81a² + 16b² + 25c² + 72ab + 40bc + 90ac",
        "81a² + 16b² + 25c² + 72ab + 40bc + 100ac",
        "81a² + 16b² + 25c² + 78ab + 40bc + 90ac",
      ],
      answer: "81a² + 16b² + 25c² + 72ab + 40bc + 90ac",
    },
    {
      id: 27,
      question:
        "If a child inherits a Y chromosome from the father, what will be the sex of the child?",
      options: ["Hermaphrodite", "Female", "Male"],
      answer: "Male",
    },
    {
      id: 28,
      question:
        "Komal invested a sum of ₹5000 at 20% per annum compound interest, compounded annually. If she received an amount of ₹8640 after n years, the value of n is:",
      options: ["4", "3.5", "3", "2.5"],
      answer: "3",
    },
    {
      id: 29,
      question:
        "If the three angles of a quadrilateral are 70°, 85° and 95°, then find the fourth angle.",
      options: ["105°", "110°", "100°", "115°"],
      answer: "110°",
    },
    {
      id: 30,
      question:
        "Two pieces of cloth measure 96 metres and 144 metres in length. What is the maximum length of cloth that can be cut equally from both pieces without any remainder?",
      options: ["96 metres", "24 metres", "12 metres", "48 metres"],
      answer: "48 metres",
    },
    {
      id: 31,
      question:
        "Which of the following rules is used to determine the direction of the force on a current-carrying conductor in an electric motor?",
      options: [
        "Ampere's Law",
        "Right-Hand Thumb Rule",
        "Fleming's Right-Hand Rule",
        "Fleming's Left-Hand Rule",
      ],
      answer: "Fleming's Left-Hand Rule",
    },
    {
      id: 32,
      question:
        "Akshat completes his journey in 20 hours. He covers half the distance at 57 km/h and the rest at 95 km/h. What is the length of the journey (in Km)?",
      options: ["1425", "1416", "1423", "1435"],
      answer: "1425",
    },
    {
      id: 33,
      question:
        "50 men can do a piece of work in 12 days. The number of men required to complete the same work in 50 days is:",
      options: ["19", "11", "15", "12"],
      answer: "12",
    },
    {
      id: 34,
      question:
        "Which of the following is the product of the neutralisation of hydrochloric acid (HCl) with sodium hydroxide (NaOH)?",
      options: [
        "Sodium chloride and hydrogen gas",
        "Sodium hydroxide and water",
        "Sodium hydroxide and hydrochloric acid",
        "Sodium chloride and water",
      ],
      answer: "Sodium chloride and water",
    },
    {
      id: 35,
      question:
        "Match the following rivers with their tributaries. Rivers: 1. Brahmaputra 2. Indus 3. Yamuna Tributaries: a. Betwa b. Chenab c. Dibang",
      options: [
        "1-b, 2-c, 3-a",
        "1-c, 2-a, 3-b",
        "1-c, 2-b, 3-a",
        "1-a, 2-b, 3-c",
      ],
      answer: "1-c, 2-b, 3-a",
    },
    {
      id: 36,
      question:
        "Which of the following released the fourth edition of SDG India Index 2023-24?",
      options: [
        "National Institute for Transforming India",
        "National Commission for Women",
        "National Crime Record Bureau",
        "National Commission of Backward Classes",
      ],
      answer: "National Institute for Transforming India",
    },
    {
      id: 37,
      question:
        "A conical tent has to accommodate 30 persons. Each person must have 5 m² spaces on the ground and 120 m³ of air to breathe. Find the height (in m) of the tent.",
      options: ["64", "84", "60", "72"],
      answer: "72",
    },
    {
      id: 38,
      question:
        "If in a code language, 'A' stands for '+', 'B' stands for '×', 'C' stands for '÷' and 'D' stands for '−', then the resultant of which of the following would be 55?",
      options: [
        "16 B 112 C 63 A 77 D 31",
        "16 D 112 A 63 C 77 B 31",
        "16 C 112 D 63 A 77 B 31",
        "16 A 112 B 63 C 77 D 31",
      ],
      answer: "16 A 112 B 63 C 77 D 31",
    },
    {
      id: 39,
      question: "Which of the following is NOT an agent of dispersal of seeds?",
      options: ["Wind", "Sunlight", "Animal", "Water"],
      answer: "Sunlight",
    },
    {
      id: 40,
      question: "What is the process by which sodium hydroxide is prepared?",
      options: [
        "Solvay's process",
        "Chlor-alkali process",
        "Contact process",
        "Haber's process",
      ],
      answer: "Chlor-alkali process",
    },
    {
      id: 41,
      question: "What is the pH range of a strongly acidic solution?",
      options: ["12-14", "0-3", "7-8", "10-11"],
      answer: "0-3",
    },
    {
      id: 42,
      question:
        "Select the option in which the triads share the same relationship as that shared by the given triads. LIFE - IFEL - FELI CALM - ALMC - LMCA",
      options: [
        "HUNT - HTUN - HNTU",
        "MUGS - UGSM - GSMU",
        "FLIP - LIFP - FPLI",
        "LAST - TLAS - STLA",
      ],
      answer: "MUGS - UGSM - GSMU",
    },
    {
      id: 43,
      question:
        "Radhika travels a distance of 230 km with speed of 46 km/h and 400 km with 100 km/h by her car. Find the average speed (in km/h) of Radhika.",
      options: ["72", "80", "70", "75"],
      answer: "75",
    },
    {
      id: 44,
      question:
        "How many numbers are there in the series '@ 2 # 2 4 3 = % 8 * 1 8 @ $ 4 | 6 4 3 * 8 =' that are immediately preceded by and also immediately followed by a symbol?",
      options: ["One", "Four", "Three", "Five"],
      answer: "Four",
    },
    {
      id: 45,
      question:
        "What should come in place of the question mark (?) in the given series? 17 22 37 62 97 ?",
      options: ["137", "140", "142", "148"],
      answer: "142",
    },
    {
      id: 46,
      question:
        "Based on the English alphabetical order, three of the following four are alike in a certain way and thus form a group. Which is the one that DOES NOT belong to that group?",
      options: ["FHD", "ZWX", "VST", "NKL"],
      answer: "FHD",
    },
    {
      id: 47,
      question:
        "Which of the following statements accurately describes the role of moral suasion in controlling money?",
      options: [
        "It is a combination of persuasion and pressure used by the RBI to influence banks' lending behaviour.",
        "It refers to the variation in the statutory liquidity ratio to regulate the allocation of bank credit.",
        "It is a direct tool used by the RBI to control the money supply by setting interest rates.",
        "It involves the sale and purchase of government securities to influence the money supply.",
      ],
      answer:
        "It is a combination of persuasion and pressure used by the RBI to influence banks' lending behaviour.",
    },
    {
      id: 48,
      question: "What determines the sex of a child in humans?",
      options: [
        "Genetic constitution",
        "Environmental cues",
        "The temperature at which fertilised eggs are placed",
        "The fate of the embryo",
      ],
      answer: "Genetic constitution",
    },
    {
      id: 49,
      question: "Which of the following is a natural ecosystem?",
      options: ["Crop field", "Aquarium", "Garden", "Forest"],
      answer: "Forest",
    },
    {
      id: 50,
      question:
        "The magnetic field inside a long, straight solenoid carrying current is ______.",
      options: [
        "zero",
        "uniform and parallel to the axis of the solenoid",
        "inversely proportional to the current",
        "stronger near the edges",
      ],
      answer: "uniform and parallel to the axis of the solenoid",
    },
    {
      id: 51,
      question:
        "On oxidation, silver changes its colour to ______ and copper changes its colour to ______.",
      options: ["grey; green", "black; green", "black; blue", "grey; blue"],
      answer: "black; green",
    },
    {
      id: 52,
      question:
        "Which of the following articles deals with the Finance Commission that distributes taxes between the Centre and State?",
      options: ["Article 280", "Article 282", "Article 283", "Article 281"],
      answer: "Article 280",
    },
    {
      id: 53,
      question: "The dark blue colour in the pH scale refers to ______.",
      options: [
        "neutral solution",
        "strong acidic solution",
        "strong basic solution",
        "weak basic solution",
      ],
      answer: "strong basic solution",
    },
    {
      id: 54,
      question: "(1 + sinA)(1 – sinA)(1 + tan²A) is equal to:",
      options: ["cosA", "0", "1", "tanA"],
      answer: "1",
    },
    {
      id: 55,
      question:
        "Find the value of K² - 3K, for which the number 58K764 is divisible by 11.",
      options: ["60", "52", "40", "48"],
      answer: "52",
    },
    {
      id: 56,
      question: "What is the average of all the natural numbers from 1 to 91?",
      options: ["46.5", "45.5", "47", "46"],
      answer: "46",
    },
    {
      id: 57,
      question:
        "Who is the author of 'The Great Indian Novel,' published in 2011?",
      options: [
        "Kiran Nagarkar",
        "Shashi Tharoor",
        "Vikram Seth",
        "Arundhati Roy",
      ],
      answer: "Shashi Tharoor",
    },
    {
      id: 58,
      question:
        "If third proportional of 12 and 24 be x, then what is the value of x?",
      options: ["50", "48", "45", "49"],
      answer: "48",
    },
    {
      id: 59,
      question:
        "Which of the following committees suggested that the 'duty to pay taxes' should also be a Fundamental Duty of the Indian citizen?",
      options: [
        "Sarkaria Commission",
        "Justice JS Verma Committee",
        "Swaran Singh Committee",
        "Santhanam Committee",
      ],
      answer: "Justice JS Verma Committee",
    },
    {
      id: 60,
      question: "Evaluate: 16 + 16 ÷ 4 - 3 × 3",
      options: ["13", "11", "14", "10"],
      answer: "11",
    },
    {
      id: 61,
      question:
        "What property of carbon allows it to form long chains and rings?",
      options: [
        "Ability to form stable bonds with other elements",
        "Tendency to form single bonds",
        "Ability to form multiple bonds",
        "Ability to form covalent bonds",
      ],
      answer: "Ability to form covalent bonds",
    },
    {
      id: 62,
      question:
        "The power in a circuit having voltage V and current I during time interval t is:",
      options: ["I/V", "(I × I)V", "I × V", "V/I"],
      answer: "I × V",
    },
    {
      id: 63,
      question:
        "Which of the following materials is likely to be non-biodegradable?",
      options: ["Wood", "Vegetable peels", "Plastic", "Paper"],
      answer: "Plastic",
    },
    {
      id: 64,
      question:
        "In a parallel circuit, how does the voltage across each resistor compare to the total voltage supplied by the battery?",
      options: [
        "It is divided according to the resistance values.",
        "It is zero.",
        "It is inversely proportional to the resistance.",
        "It is the same for each resistor.",
      ],
      answer: "It is the same for each resistor.",
    },
    {
      id: 65,
      question:
        "What is the relationship between current (I), power (P), and voltage (V)?",
      options: ["I = PV", "I = P²V", "I = V + P", "I = P/V"],
      answer: "I = P/V",
    },
    {
      id: 66,
      question:
        "Which of the following is an effective method to reduce plastic waste?",
      options: [
        "Using disposable plastic bags",
        "Burning plastic waste",
        "Dumping plastic waste in landfills",
        "Recycling and reusing plastic materials",
      ],
      answer: "Recycling and reusing plastic materials",
    },
    {
      id: 67,
      question:
        "The marks scored by 10 students are given below: 17, 16, 12, 16, 15, 16, 13, 14, 13, 20. The mode of the data is:",
      options: ["12", "16", "18", "17"],
      answer: "16",
    },
    {
      id: 68,
      question: "What is the average of all the natural numbers from 1 to 92?",
      options: ["46", "46.5", "47", "47.5"],
      answer: "46.5",
    },
    {
      id: 69,
      question:
        "Which of the following is a method of reproduction in plants, where only a single parent is involved?",
      options: [
        "Sexual reproduction",
        "Asexual reproduction",
        "Fertilisation",
        "Pollination",
      ],
      answer: "Asexual reproduction",
    },
    {
      id: 70,
      question:
        "If 'A' stands for '+', 'B' stands for '×', 'C' stands for '÷' and 'D' stands for '–', what will come in place of the question mark (?) in the following equation? 93 D 7 B 5 C (69 A 3) C 26 = ?",
      options: ["75", "122", "93", "107"],
      answer: "107",
    },
    {
      id: 71,
      question:
        "B, C, D, F and H have different marks. Only one person has scored between C and D. Only one person has scored between H and D. F has scored less than C and D. How many people have scored less than B?",
      options: ["Three", "Two", "One", "Four"],
      answer: "Three",
    },
    {
      id: 72,
      question:
        "Based on the English alphabetical order, three of the following four letter-clusters are alike in a certain way and thus form a group. Which letter-cluster DOES NOT belong to that group?",
      options: ["RUAF", "HKQU", "TWCG", "CFLP"],
      answer: "CFLP",
    },
    {
      id: 73,
      question:
        "The length of each of the two equal sides of an isosceles triangle is 100 cm each and the length of its base is 56 cm. The area (in cm²) of the triangle is:",
      options: ["2672", "2690", "2688", "2675"],
      answer: "2688",
    },
    {
      id: 74,
      question:
        "Hritik ranked 20th from the bottom and 30th from the top in his class. How many students are there in his class?",
      options: ["45", "34", "47", "49"],
      answer: "49",
    },
    {
      id: 75,
      question:
        " Study the given diagram carefully and answer the question that follows. The numbers in different sections indicate the number of persons.How many such policemen exist that are also Indians and footballers? (Refer to Venn diagram)",
      questionImage: "/assets/rrb/je/paper1/question-75.png",
      options: ["5", "2", "12", "3"],
      answer: "2",
    },
    {
      id: 76,
      question:
        "What is the power rating of a device that draws 1.75 A of current when connected to a 180-V source?",
      options: ["440 W", "315 W", "225 W", "105 W"],
      answer: "315 W",
    },
    {
      id: 77,
      question:
        "Which of the following articles deal with the provisions regarding the election, qualification, and removal of the Vice-President of India?",
      options: [
        "Article 224 - 245",
        "Article 68 - 75",
        "Article 78 - 80",
        "Article 63 - 71",
      ],
      answer: "Article 63 - 71",
    },
    {
      id: 78,
      question:
        "Find the median of the data given below: 180, 90, 134, 68, 52, 152, 88, 110",
      options: ["89", "60", "110", "100"],
      answer: "100",
    },
    {
      id: 79,
      question:
        "As of 30 September 2024, how many Jan Aushadhi Kendras have been established by the Government of India across the country?",
      options: ["12,822", "13,822", "14,822", "11,822"],
      answer: "13,822",
    },
    {
      id: 80,
      question:
        "Which of the following letter-clusters should replace # and % so that the pattern and relationship followed between the letter-cluster pair on the left side of :: is the same as that on the right side of ::? # : OKR :: XTA : %",
      options: [
        "# = KGN, % = FXE",
        "# = KLN, % = BXE",
        "# = KGN, % = BXP",
        "# = KGN, % = BXE",
      ],
      answer: "# = KGN, % = BXE",
    },
    {
      id: 81,
      question:
        "How many such symbols are there in the series '$ 7 @ 6 = & 5 Q 4 > # & & % 9 1 * £ 3' that are immediately preceded by a number and also immediately followed by another number?",
      options: ["One", "Two", "Three", "Four"],
      answer: "Two",
    },
    {
      id: 82,
      question:
        "Washing soda (Na₂CO₃·10H₂O) is obtained from which compound in the Solvay process?",
      options: [
        "Sodium chloride",
        "Sodium bicarbonate",
        "Sodium hydroxide",
        "Sodium sulphate",
      ],
      answer: "Sodium bicarbonate",
    },
    {
      id: 83,
      question: "Where is the Taj Mahotsav held?",
      options: [
        "Near the Western gate of Taj Mahal",
        "Near the Eastern gate of Taj Mahal",
        "In Fatehpur Sikri",
        "In Agra Fort",
      ],
      answer: "Near the Eastern gate of Taj Mahal",
    },
    {
      id: 84,
      question:
        "Select the term from among the given options that can replace the question mark (?) in the following series. OJH 20, MHF 25, KFD 35, IDB 55, GBZ 95, ?",
      options: ["EXS 175", "EZX 175", "YXS 175", "EXO 175"],
      answer: "EZX 175",
    },
    {
      id: 85,
      question: "Self pollination is possible only in:",
      options: [
        "unisexual flowers with stamen maturing first",
        "bisexual flowers with both stamens and pistil maturing at the same time",
        "bisexual flowers with both stamens and pistil maturing at the different time",
        "unisexual flowers with pistil maturing first",
      ],
      answer:
        "bisexual flowers with both stamens and pistil maturing at the same time",
    },
    {
      id: 86,
      question:
        "There are total 120 students in three sections A, B and C of Class 10. The average marks of the three sections is 85. The average marks of section B and C is 88 and the average marks of section A is 78. Find the number of students in section A.",
      options: ["33", "24", "28", "36"],
      answer: "36",
    },
    {
      id: 87,
      question:
        "A man sold an article for ₹346 by first giving a d% discount on its marked price, and then another discount having the same nominal value (in ₹). If the marked price of the article is ₹1730, then what is the value of d?",
      options: ["40", "43", "38", "44"],
      answer: "40",
    },
    {
      id: 88,
      question:
        "Seven boxes, D, E, F, R, S, T and U, are kept one over the other but not necessarily in the same order. U is kept immediately above T. E is kept immediately above D. Only F is kept above S. Only two boxes are kept above U. E is not kept at third position from the bottom. How many boxes are kept between R and F?",
      options: ["Three", "Four", "Two", "One"],
      answer: "Three",
    },
    {
      id: 89,
      question:
        "The first session of Indian National Congress took place at which of the following places?",
      options: ["Lahore", "Bombay", "Calcutta", "Allahabad"],
      answer: "Bombay",
    },
    {
      id: 90,
      question:
        "In a certain code language, 'house fire gas' is coded as 'dy ph mt', 'pressure gas station' is coded as 'lp ph st', 'station house farm' is coded as 'st bg dy'. What is the code for 'gas' in that language?",
      options: ["lp", "st", "ph", "mt"],
      answer: "ph",
    },
    {
      id: 91,
      question:
        "Every year, Foreign Trade Policy has been declared by which ministry of the Government of India?",
      options: [
        "Ministry of Information",
        "Ministry of Home Affairs",
        "Ministry of External Affairs",
        "Ministry of Commerce and Industry",
      ],
      answer: "Ministry of Commerce and Industry",
    },
    {
      id: 92,
      question:
        "Which of the following countries hosted the first business summit of the Bay of Bengal Initiative for Multi-Sectoral Technical and Economic Cooperation (BIMSTEC) in 2024?",
      options: [
        "Dhaka, Bangladesh",
        "Thimphu, Bhutan",
        "New Delhi, India",
        "Kathmandu, Nepal",
      ],
      answer: "New Delhi, India",
    },
    {
      id: 93,
      question:
        "Six students are sitting around a circular table facing the centre. L is an immediate neighbour of both J and H. I is sitting second to the left of J. K is sitting third to the right of H. G is an immediate neighbour of both I and H. The position of how many persons will remain unchanged if all persons are arranged in English alphabetical order in clockwise direction, starting from G (including G)?",
      options: ["One", "Two", "Three", "Four"],
      answer: "Two",
    },
    {
      id: 94,
      question: "Write the expanded form of (4a + 9b + 5c)².",
      options: [
        "16a² + 81b² + 25c² + 72ab + 90bc + 50ac",
        "16a² + 81b² + 25c² + 76ab + 90bc + 40ac",
        "16a² + 81b² + 25c² + 72ab + 85bc + 40ac",
        "16a² + 81b² + 25c² + 72ab + 90bc + 40ac",
      ],
      answer: "16a² + 81b² + 25c² + 72ab + 90bc + 40ac",
    },
    {
      id: 95,
      question:
        "What is the primary purpose of an electric fuse in a household circuit?",
      options: [
        "To prevent overloading and short circuits",
        "To increase current flow",
        "To regulate voltage supply",
        "To reduce resistance in the circuit",
      ],
      answer: "To prevent overloading and short circuits",
    },
    {
      id: 96,
      question: "Why is bleaching powder used for disinfecting drinking water?",
      options: [
        "It releases chlorine, which kills germs.",
        "It neutralises the water.",
        "It reduces the hardness of water.",
        "It provides an acidic medium.",
      ],
      answer: "It releases chlorine, which kills germs.",
    },
    {
      id: 97,
      question:
        "Which of the following is a viral infection that can be transmitted through sexual contact?",
      options: ["Tuberculosis", "Gonorrhoea", "Syphilis", "HIV-AIDS"],
      answer: "HIV-AIDS",
    },
    {
      id: 98,
      question:
        "The area of a square plot is 289 m². The length of each side of the plot (in m) is:",
      options: ["11", "17", "7", "27"],
      answer: "17",
    },
    {
      id: 99,
      question:
        "An electric pole casts a shadow of length 42 m at a time when a tree 12 m high casts a shadow of length 16 m. Find the height of the pole.",
      options: ["29 m", "30.5 m", "33 m", "31.5 m"],
      answer: "31.5 m",
    },
    {
      id: 100,
      question:
        "In the following number-pairs, the second number is obtained by applying certain mathematical operations to the first number. Select the set in which the numbers are related in the same way as are the numbers of the following sets. (NOTE: Operations should be performed on the whole numbers, without breaking down the numbers into its constituent digits. E.g. 13 - Operations on 13 such as adding / submitting the number of the number is 13 such as adding / then performing mathematical operations on 1 and 3 is not allowed.) 37.4, 34.6; 45, 42.2",
      options: ["32.9, 29.1", "69, 66.2", "21.5, 17.7", "58, 56.2"],
      answer: "69, 66.2",
    },
  ],
};

export default rrbJeMockTest1;
