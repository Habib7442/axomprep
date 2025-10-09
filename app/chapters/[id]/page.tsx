import React from "react";
import { ChapterInterface } from "@/components/ChapterInterface";
import { currentUser } from "@clerk/nextjs/server";

// Mock data for Matter in Our Surroundings chapter
const matterInOurSurroundingsData = {
  id: "1",
  title: "Matter in Our Surroundings",
  subject: "science",
  class: "9",
  objective: "Understand concepts & solve NCERT-style questions for Matter in Our Surroundings",
  topics: [
    {
      id: "1-1",
      title: "What is Matter?",
      description: "Anything that has mass and occupies space is called matter",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "1 mark"
    },
    {
      id: "1-2",
      title: "Physical Nature of Matter",
      description: "Understanding particle nature of matter",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "2 marks"
    },
    {
      id: "1-3",
      title: "Characteristics of Particles of Matter",
      description: "Space, motion, and attraction between particles",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "2 marks"
    },
    {
      id: "1-4",
      title: "States of Matter",
      description: "Solid, liquid and gaseous states",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "2 marks"
    },
    {
      id: "1-5",
      title: "Solid State",
      description: "Properties of solids",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "1 mark"
    },
    {
      id: "1-6",
      title: "Liquid State",
      description: "Properties of liquids",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "1 mark"
    },
    {
      id: "1-7",
      title: "Gaseous State",
      description: "Properties of gases",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "1 mark"
    },
    {
      id: "1-8",
      title: "Comparison Between States of Matter",
      description: "Differences between solids, liquids, and gases",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "2 marks"
    },
    {
      id: "1-9",
      title: "Can Matter Change Its State?",
      description: "Changing states of matter",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "2 marks"
    },
    {
      id: "1-10",
      title: "Effect of Change of Temperature",
      description: "How temperature affects state changes",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "2 marks"
    },
    {
      id: "1-11",
      title: "Melting Point and Boiling Point",
      description: "Temperature at which state changes occur",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "1 mark"
    },
    {
      id: "1-12",
      title: "Effect of Change of Pressure",
      description: "How pressure affects state changes",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "1 mark"
    },
    {
      id: "1-13",
      title: "Latent Heat",
      description: "Heat energy during state changes",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "2 marks"
    },
    {
      id: "1-14",
      title: "Evaporation",
      description: "Process of liquid changing to vapour",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "2 marks"
    },
    {
      id: "1-15",
      title: "Factors Affecting Evaporation",
      description: "Surface area, temperature, humidity, and wind speed",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "1 mark"
    },
    {
      id: "1-16",
      title: "Cooling by Evaporation",
      description: "How evaporation causes cooling",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "1 mark"
    },
    {
      id: "1-17",
      title: "Sublimation",
      description: "Direct conversion between solid and gas",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "1 mark"
    },
    {
      id: "1-18",
      title: "Interconversion of States of Matter",
      description: "Reversible changes between states",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "1 mark"
    },
    {
      id: "1-19",
      title: "Important Terms and Definitions",
      description: "Key terms related to states of matter",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "1 mark"
    },
    {
      id: "1-20",
      title: "Summary",
      description: "Key points of the chapter",
      mastery: 0,
      lastPracticed: "Never",
      weightage: "2 marks"
    }
  ],
  weakestTopics: [
    {
      id: "1-2",
      title: "Physical Nature of Matter",
      description: "Understanding particle nature of matter",
      mastery: 0
    },
    {
      id: "1-3",
      title: "Characteristics of Particles of Matter",
      description: "Space, motion, and attraction between particles",
      mastery: 0
    },
    {
      id: "1-13",
      title: "Latent Heat",
      description: "Heat energy during state changes",
      mastery: 0
    }
  ],
  masteryPercentage: 0,
  totalTime: 0 // minutes
};

const ChapterPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await currentUser();
  
  // In a real app, you would fetch the chapter data based on the ID
  // const chapterData = await fetchChapterData(id);
  
  // For now, we'll use mock data based on chapter ID
  let chapterData;
  if (id === "1") {
    chapterData = matterInOurSurroundingsData;
  } else {
    // Default to Matter in Our Surroundings for any other ID
    chapterData = matterInOurSurroundingsData;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ChapterInterface chapterData={chapterData} userId={user?.id || "anonymous"} />
    </div>
  );
};

export default ChapterPage;