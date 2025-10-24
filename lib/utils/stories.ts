export interface Story {
  id: number;
  title: string;
  content: string;
  moral: string;
  vocabulary: {
    word: string;
    meaning: string;
    synonyms?: string[];
    antonyms?: string[];
  }[];
  phrases: {
    phrase: string;
    meaning: string;
    example: string;
  }[];
  questions: string[];
}

export const stories: Story[] = [
  {
    id: 1,
    title: "The Dream That Nobody Believed",
    content: `Arjun sat in his small room, working on his laptop. It was 2 AM. His eyes were red, but his heart was full of hope. He was building something. His own startup. His own dream.

But nobody believed in him.

Three years ago, Arjun graduated with good marks. His parents were proud. His relatives smiled and said, "Now you will get a good job and earn well."

Many of his friends joined big companies. They got salaries of thirty thousand, forty thousand, even fifty thousand rupees per month. They bought new clothes, new phones, and posted pictures on social media.

But Arjun chose a different path. He started his own business. A small tech startup from his bedroom.

His father was angry. "What nonsense is this? You studied so much, and now you waste time on this stupid idea? Go and get a proper job!"

His mother cried. "Look at Sharma's son. He is earning fifty thousand per month. And you? You earn nothing. People are laughing at us."

Relatives mocked him at family gatherings. "Still playing with computers? When will you grow up and do real work?"

Even his friends stopped calling him. They thought he was a failure.

Arjun felt the pain. Every day was hard. Some days he earned only five thousand rupees in a month. Barely enough to survive. He could not buy new clothes. He could not go out with friends. He ate simple food to save money.

His parents compared him with others constantly. "Rajesh bought a car. Priya is sending money to her parents. And you? You are just wasting time."

But Arjun did not give up. He knew something they did not understand.

He knew that a job meant working for someone else's dream. Eight hours a day, following orders, building someone else's company. That was not freedom. That was comfortable slavery.

He wanted to build his own empire. Even if it took years. Even if he had to struggle.

Late at night, when everyone slept, Arjun worked. He learned new skills. He talked to clients. He failed many times. But every failure taught him something new.

One day, his father shouted at him again. "How long will you continue this drama? You are 25 now! Get a job or leave this house!"

Arjun's eyes filled with tears, but he stayed calm. "Papa, I know you are worried. I know I am not earning much now. But please trust me. Just one more year. If I fail, I will do whatever you say."

His father walked away in anger.

That night, Arjun received an email. A big company wanted to use his software. They were ready to pay five lakh rupees for the project.

Arjun could not believe it. His hands were shaking. Years of struggle, sleepless nights, and rejected proposals... finally, something was working.

He completed the project with full dedication. The client was so happy that they gave him three more projects. Then they recommended him to other companies.

Within six months, Arjun was earning more than all his friends combined. His startup grew. He hired a small team. His bank account, which once had only two thousand rupees, now had lakhs.

But the biggest change was not in money.

One evening, Arjun's father received a call. It was from his boss. "I heard your son runs a tech company. We need someone like him. Can you ask if he can help us?"

Arjun's father was shocked. "My son?"

"Yes! Everyone is talking about his work. He is very talented."

That night, Arjun's father came to his room. He saw the workspace, the plans, the team calls on the screen. For the first time, he truly saw what his son was building.

Tears came to his eyes. "I am sorry, beta. I did not understand. I thought you were wasting time. But you were building an empire."

Arjun hugged his father. "Papa, you were not wrong to worry. You wanted the best for me. But I had to follow my path. Jobs give safety, but dreams give freedom."

News spread in the family and society. The same people who mocked him now wanted advice for their own children. "How did Arjun do it? Tell us his secret!"

But Arjun never became proud. He remembered the hard days. He remembered the nights when he cried alone. He remembered when nobody believed in him.

Today, Arjun runs a successful company. He has a team of 20 people. He earns more in a month than most people earn in a year.

But more than money, he has something priceless. Freedom.

Freedom to work on his own terms. Freedom to take vacations when he wants. Freedom to say no to things he does not like. Freedom to build his own future.

His parents are proud now. They tell everyone, "Our son is a businessman."

But Arjun knows the truth. Success did not come because he was lucky. It came because he refused to give up when the whole world doubted him.`,
    moral: `Not everyone who struggles is failing. Some are building empires in silence. Trust the process, not just the paycheck. Real success takes time, courage, and belief in yourself when nobody else does.`,
    vocabulary: [
      {
        word: "struggle",
        meaning: "to make forceful efforts to get free or make progress against something that is holding you back",
        synonyms: ["endeavor", "grapple", "battle"],
        antonyms: ["succeed", "prosper", "flourish"]
      },
      {
        word: "empire",
        meaning: "a group of countries or regions that are controlled by one ruler or government",
        synonyms: ["kingdom", "realm", "domain"],
        antonyms: ["colony", "dependency", "territory"]
      },
      {
        word: "freedom",
        meaning: "the state of being free or at liberty rather than in confinement or under physical restraint",
        synonyms: ["liberty", "independence", "autonomy"],
        antonyms: ["captivity", "confinement", "slavery"]
      },
      {
        word: "dedication",
        meaning: "the quality of being dedicated or committed to a task or purpose",
        synonyms: ["commitment", "devotion", "loyalty"],
        antonyms: ["negligence", "indifference", "apathy"]
      }
    ],
    phrases: [
      {
        phrase: "believe in",
        meaning: "to have trust or confidence in someone or something",
        example: "My parents didn't believe in my dream at first, but now they support me."
      },
      {
        phrase: "give up",
        meaning: "to stop trying; to surrender",
        example: "Even when times were tough, Arjun didn't give up on his dream."
      },
      {
        phrase: "work on",
        meaning: "to spend time and effort doing something",
        example: "Arjun worked on his startup every night after his regular job."
      }
    ],
    questions: [
      "What did Arjun's parents want him to do after graduation?",
      "Why did Arjun choose to start his own business instead of getting a job?",
      "How did Arjun's family react to his decision?",
      "What challenges did Arjun face in the beginning?",
      "What was the turning point in Arjun's journey?",
      "How did Arjun's father's attitude change towards him?",
      "What does the story teach us about following our dreams?",
      "What is the synonym of 'struggle'?",
      "What is the antonym of 'freedom'?"
    ]
  },
  {
    id: 2,
    title: "The Wise Old Farmer",
    content: `Long ago, there lived an old farmer in a village. He had spent his entire life working on his small piece of land. Though his farm was not large, he was known throughout the village for his wisdom and hard work.

The farmer had three sons who were lazy and always quarreled among themselves. They envied their neighbors who had bigger farms and more cattle. The young men often said, \"Our father is foolish. He does not know how to increase our wealth.\"

As the farmer grew older, he became worried about his sons. He feared that after his death, they would sell the farm and scatter in different directions.

One day, feeling his end was near, the old farmer called his sons to his bedside. \"My dear sons,\" he said, \"I have something to tell you. There is a great treasure buried in our farm.\"

The sons were surprised and excited. \"Where is it buried, Father?\" they asked eagerly.

\"I cannot tell you the exact spot,\" said the farmer. \"But if you work hard and dig the land thoroughly, you will find it.\"

Soon after, the old farmer passed away. The sons were very sad, but they could not forget what he had told them about the treasure.

The next morning, the eldest son took a spade and went to a corner of the field where he thought the treasure might be hidden. He dug and dug, but found nothing.

The second son went to another part of the field and began digging. He also found nothing.

The youngest son dug in a third place, but he too found nothing.

Day after day, the three brothers continued digging in different parts of the field. They turned over the soil again and again, but no treasure appeared.

However, when spring came, something wonderful happened. Because the land had been so well dug and turned over, it produced the finest crop the farm had ever seen.

The brothers sold the crop in the market and earned a lot of money. They finally understood what their father meant. The real treasure was not gold or silver, but the value of hard work.

From that time on, the three brothers worked together on their farm. They stopped quarreling and lived in peace. They became prosperous and respected in the village.

The neighbors were amazed at the change and asked the brothers about their success.

\"Our father was indeed wise,\" they said. \"He taught us that hard work is the greatest treasure.\"` ,
    moral: `True wealth comes from hard work and perseverance, not from shortcuts or easy gains. The greatest treasure is the value of labor and unity.`,
    vocabulary: [
      {
    word: "wisdom",
    meaning: "the quality of having experience, knowledge, and good judgment",
    synonyms: ["knowledge", "insight", "understanding"],
    antonyms: ["foolishness", "ignorance", "stupidity"]
  },
  {
    word: "prosperous",
    meaning: "successful in material terms; flourishing financially",
    synonyms: ["wealthy", "affluent", "successful"],
    antonyms: ["poor", "impoverished", "bankrupt"]
  },
  {
    word: "perseverance",
    meaning: "persistence in an action or endeavor despite difficulty or delay in achieving success",
    synonyms: ["persistence", "determination", "tenacity"],
    antonyms: ["giving up", "quitting", "surrender"]
  },
  {
    word: "quarrel",
    meaning: "a heated argument or disagreement",
    synonyms: ["dispute", "conflict", "argument"],
    antonyms: ["agreement", "harmony", "peace"]
  }
],
    phrases: [
      {
        phrase: "work hard",
        meaning: "to put in a lot of effort and energy into a task",
        example: "The farmer's sons learned to work hard after understanding their father's lesson."
      },
      {
        phrase: "in peace",
        meaning: "in a state of harmony without conflict",
        example: "After finding the treasure, the brothers lived in peace."
      },
      {
        phrase: "from that time on",
        meaning: "starting at a particular point in the past and continuing",
        example: "From that time on, the three brothers worked together on their farm."
      }
    ],
    questions: [
      "Why did the farmer's sons think their father was foolish?",
      "What did the father tell his sons before he died?",
      "What did the sons find when they dug the land?",
      "What was the real treasure according to the story?",
      "How did the brothers change after understanding their father's message?",
      "What is the synonym of 'prosperous'?",
      "What is the antonym of 'perseverance'?",
      "What lesson does the story teach us?"
    ]
  }
];