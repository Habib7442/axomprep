import React from "react";
import { ChapterInterface } from "@/components/ChapterInterface";
import { currentUser } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

// Define types
interface Topic {
  id: string;
  title: string;
  description: string;
  mastery: number;
  lastPracticed: string;
  weightage: string;
}

interface WeakestTopic {
  id: string;
  title: string;
  description: string;
  mastery: number;
}

interface ChapterData {
  id: string;
  title: string;
  subject: string;
  class: string;
  objective: string;
  topics: Topic[];
  weakestTopics: WeakestTopic[];
  masteryPercentage: number;
  totalTime: number;
}

// Function to fetch chapter data from Supabase
async function fetchChapterData(chapterId: string, userId: string) {
  const supabase = createSupabaseClient();
  
  // Fetch chapter information (this would typically come from a chapters table)
  // For now, we'll use a basic structure and populate it with real data
  const chapterData: ChapterData = {
    id: chapterId,
    title: "Matter in Our Surroundings",
    subject: "science",
    class: "9",
    objective: "Understand concepts & solve NCERT-style questions for Matter in Our Surroundings",
    topics: [],
    weakestTopics: [],
    masteryPercentage: 0,
    totalTime: 0
  };
  
  // Fetch student progress for this chapter
  // First, get the chapter name from the chapter ID
  const chapterName = "Matter in Our Surroundings"; // Hardcoded for now, should be fetched from a chapters table
  
  const { data: progressData, error: progressError } = await supabase
    .from("student_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("chapter_id", chapterName)
    .maybeSingle();
  
  // Fetch chapter topics (this would come from a topics table in a real implementation)
  // For now, we'll define the topics statically but with dynamic mastery values
  const topics: Topic[] = [
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
  ];
  
  // If we have progress data, update the mastery values
  if (progressData && !progressError) {
    // Update overall mastery
    chapterData.masteryPercentage = progressData.mastery_percentage || 0;
    
    // Update individual topic mastery if available
    if (progressData.subtopic_mastery) {
      topics.forEach(topic => {
        if (progressData.subtopic_mastery[topic.title] !== undefined) {
          topic.mastery = progressData.subtopic_mastery[topic.title];
        }
      });
    }
  }
  
  // Set topics in chapter data
  chapterData.topics = topics;
  
  // Determine weakest topics (mastery < 30%)
  const weakestTopics = topics
    .filter(topic => topic.mastery < 30)
    .slice(0, 3)
    .map(topic => ({
      id: topic.id,
      title: topic.title,
      description: topic.description,
      mastery: topic.mastery
    }));
  
  chapterData.weakestTopics = weakestTopics;
  
  return chapterData;
}

const ChapterPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await currentUser();
  
  if (!user) {
    // Handle unauthenticated user
    return <div>Please sign in to view this chapter.</div>;
  }
  
  // Fetch real chapter data from Supabase
  const chapterData = await fetchChapterData(id, user.id);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ChapterInterface chapterData={chapterData} userId={user.id} />
    </div>
  );
};

export default ChapterPage;