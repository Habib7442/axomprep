"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";
import LessonDetail from "@/components/dashboard/LessonDetail";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { use } from "react";

// Mock lesson data
const mockLessons = {
  1: {
    id: 1,
    title: "Understanding Percentages",
    description:
      "Master the fundamental concepts of percentages and their applications in everyday magic.",
    difficulty: "beginner" as const,
    duration: "30 min",
    content: `
      <h2 class="text-amber-500 font-serif text-2xl mb-4 border-b-2 border-amber-800/50 pb-2">The Magical Essence of Percentages</h2>
      <p class="text-amber-300 text-lg font-serif leading-relaxed">In the magical world, percentages are powerful enchantments that represent parts of a whole. The term "percent" means "per hundred" and is denoted by the mystical symbol "%".</p>

      <div class="my-5 p-4 bg-amber-900/30 border-2 border-amber-600 rounded-lg text-center shadow-md">
        <strong class="text-amber-400 text-2xl font-serif">100% = 1 whole</strong>
        <p class="text-amber-300 mt-2">50% = 1/2 of the whole</p>
        <p class="text-amber-300">25% = 1/4 of the whole</p>
        <p class="text-amber-300">10% = 1/10 of the whole</p>
        <p class="text-amber-300">1% = 1/100 of the whole</p>
      </div>

      <h2 class="text-amber-500 font-serif text-2xl mt-8 mb-4 border-b-2 border-amber-800/50 pb-2">The Ancient Scroll of Magical Conversions</h2>

      <div class="my-8 p-6 bg-amber-900/30 border-2 border-amber-600 rounded-lg shadow-md overflow-x-auto">
        <h3 class="text-amber-400 font-serif text-xl mb-3">The Sacred Conversion Table</h3>
        <p class="text-amber-300 text-lg font-serif mb-4">This ancient table, discovered in the restricted section of the Hogwarts library, shows the mystical relationships between fractions, percentages, and decimals:</p>

        <table class="w-full border-collapse text-amber-200 font-serif">
          <thead>
            <tr class="border-b-2 border-amber-600">
              <th class="py-2 px-4 text-left text-amber-400">Fraction</th>
              <th class="py-2 px-4 text-left text-amber-400">Percentage</th>
              <th class="py-2 px-4 text-left text-amber-400">Decimal</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/1</td>
              <td class="py-2 px-4">100%</td>
              <td class="py-2 px-4">1.00</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/2</td>
              <td class="py-2 px-4">50%</td>
              <td class="py-2 px-4">0.50</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/3</td>
              <td class="py-2 px-4">33<sup>1</sup>⁄<sub>3</sub>%</td>
              <td class="py-2 px-4">0.33</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/4</td>
              <td class="py-2 px-4">25%</td>
              <td class="py-2 px-4">0.25</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/5</td>
              <td class="py-2 px-4">20%</td>
              <td class="py-2 px-4">0.20</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/6</td>
              <td class="py-2 px-4">16<sup>2</sup>⁄<sub>3</sub>%</td>
              <td class="py-2 px-4">0.167</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/8</td>
              <td class="py-2 px-4">12.5%</td>
              <td class="py-2 px-4">0.125</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/10</td>
              <td class="py-2 px-4">10%</td>
              <td class="py-2 px-4">0.10</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/11</td>
              <td class="py-2 px-4">9<sup>1</sup>⁄<sub>11</sub>%</td>
              <td class="py-2 px-4">0.091</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/12</td>
              <td class="py-2 px-4">8<sup>1</sup>⁄<sub>3</sub>%</td>
              <td class="py-2 px-4">0.083</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/13</td>
              <td class="py-2 px-4">7<sup>9</sup>⁄<sub>13</sub>%</td>
              <td class="py-2 px-4">0.077</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/14</td>
              <td class="py-2 px-4">7<sup>1</sup>⁄<sub>7</sub>%</td>
              <td class="py-2 px-4">0.071</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/15</td>
              <td class="py-2 px-4">6<sup>2</sup>⁄<sub>3</sub>%</td>
              <td class="py-2 px-4">0.067</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/16</td>
              <td class="py-2 px-4">6<sup>1</sup>⁄<sub>4</sub>%</td>
              <td class="py-2 px-4">0.063</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/17</td>
              <td class="py-2 px-4">5<sup>15</sup>⁄<sub>17</sub>%</td>
              <td class="py-2 px-4">0.059</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/18</td>
              <td class="py-2 px-4">5<sup>5</sup>⁄<sub>9</sub>%</td>
              <td class="py-2 px-4">0.056</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/19</td>
              <td class="py-2 px-4">5<sup>5</sup>⁄<sub>19</sub>%</td>
              <td class="py-2 px-4">0.053</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/20</td>
              <td class="py-2 px-4">5%</td>
              <td class="py-2 px-4">0.05</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/25</td>
              <td class="py-2 px-4">4%</td>
              <td class="py-2 px-4">0.04</td>
            </tr>
            <tr class="border-b border-amber-800/30">
              <td class="py-2 px-4">1/40</td>
              <td class="py-2 px-4">2.5%</td>
              <td class="py-2 px-4">0.025</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-amber-500 font-serif text-2xl mt-8 mb-4 border-b-2 border-amber-800/50 pb-2">Essential Magical Formulas</h2>

      <div class="my-8 p-6 bg-amber-900/30 border-2 border-amber-600 rounded-lg shadow-md">
        <h3 class="text-amber-400 font-serif text-xl mb-3">Percentage Increase Enchantment</h3>
        <div class="p-4 bg-amber-900/40 rounded-lg border border-amber-700 text-center">
          <p class="text-amber-300 text-lg font-serif">Increase % = <span class="text-amber-200">(New Value - Original Value) / Original Value × 100</span></p>
        </div>
        <p class="text-amber-300 text-lg font-serif mt-4">This spell calculates how much a value has grown, expressed as a percentage of the original value.</p>
      </div>

      <div class="my-8 p-6 bg-amber-900/30 border-2 border-amber-600 rounded-lg shadow-md">
        <h3 class="text-amber-400 font-serif text-xl mb-3">Percentage Decrease Charm</h3>
        <div class="p-4 bg-amber-900/40 rounded-lg border border-amber-700 text-center">
          <p class="text-amber-300 text-lg font-serif">Decrease % = <span class="text-amber-200">(Original Value - New Value) / Original Value × 100</span></p>
        </div>
        <p class="text-amber-300 text-lg font-serif mt-4">This charm reveals how much a value has diminished, expressed as a percentage of the original value.</p>
      </div>

      <div class="my-8 p-6 bg-amber-900/30 border-2 border-amber-600 rounded-lg shadow-md">
        <h3 class="text-amber-400 font-serif text-xl mb-3">Successive Percentage Change Incantation</h3>
        <div class="p-4 bg-amber-900/40 rounded-lg border border-amber-700 text-center">
          <p class="text-amber-300 text-lg font-serif">Net % Change = <span class="text-amber-200">a + b + (a × b / 100)</span></p>
        </div>
        <p class="text-amber-300 text-lg font-serif mt-4">When a value changes by a% and then by b%, this powerful incantation calculates the combined effect.</p>
      </div>

      <div class="my-8 p-6 bg-amber-900/30 border-2 border-amber-600 rounded-lg shadow-md">
        <h3 class="text-amber-400 font-serif text-xl mb-3">Magical Economics Principles</h3>
        <div class="p-4 bg-amber-900/40 rounded-lg border border-amber-700 mb-4">
          <p class="text-amber-300 text-lg font-serif">Price × Consumption = Expenditure</p>
          <p class="text-amber-300 text-lg font-serif mt-2">If Expenditure is constant then:</p>
          <p class="text-amber-300 text-lg font-serif mt-2">Price ∝ 1/Consumption</p>
        </div>
        <div class="p-4 bg-amber-900/40 rounded-lg border border-amber-700">
          <p class="text-amber-300 text-lg font-serif">Income = Expenditure + Savings</p>
        </div>
        <p class="text-amber-300 text-lg font-serif mt-4">These principles govern the flow of Galleons in the wizarding economy.</p>
      </div>

      <h2 class="text-amber-500 font-serif text-2xl mt-8 mb-4 border-b-2 border-amber-800/50 pb-2">Practical Applications in Wizardry</h2>

      <div class="my-8 p-6 bg-amber-900/30 border-2 border-amber-600 rounded-lg shadow-md">
        <h3 class="text-amber-400 font-serif text-xl mb-3">Finding Percentages of Quantities</h3>
        <p class="text-amber-300 text-lg font-serif">To find a percentage of a quantity, convert the percentage to a decimal and multiply:</p>
        <div class="space-y-3 text-amber-200 text-lg font-serif mt-4">
          <p><strong class="text-amber-400">Example:</strong> Find 15% of 80 Galleons</p>
          <p class="ml-6">15% = 0.15</p>
          <p class="ml-6">0.15 × 80 = 12</p>
          <p class="ml-6">Therefore, 15% of 80 Galleons is 12 Galleons</p>
        </div>
      </div>



      <p class="text-amber-400 italic mt-4 text-lg font-serif font-medium border-l-4 border-amber-600 pl-4 py-2">Remember: Percentages are essential for potion-making, spell effectiveness calculations, and magical commerce throughout the wizarding world!</p>
    `,
    problems: [
      {
        id: 101,
        question: `

`,
        type: "matching" as const,
        pairs: [
          { left: "1/2", right: "50%" },
          { left: "1/3", right: "33.33%" },
          { left: "1/4", right: "25%" },
          { left: "1/5", right: "20%" },
          { left: "1/6", right: "16.67%" },
          { left: "1/8", right: "12.5%" },
          { left: "1/10", right: "10%" },
          { left: "1/12", right: "8.33%" },
          { left: "1/15", right: "6.67%" },
          { left: "1/16", right: "6.25%" },
          { left: "1/20", right: "5%" },
          { left: "1/25", right: "4%" },
          { left: "1/50", right: "2%" },
          { left: "1/100", right: "1%" },
          { left: "3/4", right: "75%" },
        ],
      },
      {
        id: 102,
        question:
          "In Professor Slughorn's Potions class, you need to calculate 25% of 120 ml of dragon blood. How many milliliters should you use?",
        type: "multiple-choice" as const,
        options: ["25 ml", "30 ml", "40 ml", "45 ml"],
        answer: "30 ml",
      },
      {
        id: 103,
        question:
          "Convert the fraction 3/8 to a percentage for your Arithmancy homework.",
        type: "multiple-choice" as const,
        options: ["37.5%", "0.375%", "3.75%", "375%"],
        answer: "37.5%",
      },
      {
        id: 104,
        question:
          "Your wand's magical power increases by 15%. If its original power rating was 80 units, what is its new power rating?",
        type: "text" as const,
        answer: "92",
      },
      {
        id: 105,
        question:
          "At Gringotts, the exchange rate for Galleons to Muggle money decreased by 5%. If the original rate was 20 pounds per Galleon, what is the new exchange rate in pounds?",
        type: "multiple-choice" as const,
        options: ["15", "19", "21", "25"],
        answer: "19",
      },
      {
        id: 106,
        question:
          "In your Herbology exam, you need to convert 0.65 to a percentage. What is the correct percentage?",
        type: "multiple-choice" as const,
        options: ["0.65%", "6.5%", "65%", "650%"],
        answer: "65%",
      },
    ],
  },
};

export default function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const lessonId = parseInt(unwrappedParams.id);

  // Get the lesson data from our mock data
  const lessonData = mockLessons[lessonId as keyof typeof mockLessons];

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      }
      setLoading(false);
    }

    checkAuth();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 mx-auto mb-4">
            <svg
              className="h-full w-full text-amber-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.25 11.5L4.75 14.5L12 18.75L19.25 14.5L14.75 11.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="font-serif text-amber-200">Opening spellbook...</p>
        </div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="text-center py-12 max-w-md mx-auto">
        <div className="bg-[#1a2639] border-2 border-amber-800 rounded-lg p-8 shadow-lg relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none rounded-lg"></div>
          <div className="relative z-10">
            <svg
              className="h-16 w-16 text-amber-800 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-2xl font-bold text-amber-50 font-serif mb-4">
              Spellbook Missing
            </h2>
            <p className="text-amber-200 font-serif mb-6">
              This magical tome appears to have been misplaced in the Hogwarts
              library.
            </p>
            <Link href="/dashboard/lessons">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800">
                Return to Library
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <LessonDetail lesson={lessonData} />;
}
