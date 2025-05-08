'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Award, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import FormulaMemorizationGame from '@/components/games/FormulaMemorizationGame'
import { percentageFormulas, algebraFormulas, geometryFormulas, numberSystemFormulas } from '@/data/mathFormulas'

export default function FormulaMasteryPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('percentage')
  const [gameCompleted, setGameCompleted] = useState(false)
  const [gameScore, setGameScore] = useState({ score: 0, total: 0 })

  // Get formulas based on selected category
  const getFormulas = () => {
    switch (selectedCategory) {
      case 'percentage':
        return percentageFormulas
      case 'algebra':
        return algebraFormulas
      case 'geometry':
        return geometryFormulas
      case 'number':
        return numberSystemFormulas
      default:
        return percentageFormulas
    }
  }

  // Handle game completion
  const handleGameComplete = (score: number, totalPossible: number) => {
    setGameCompleted(true)
    setGameScore({ score, total: totalPossible })
  }

  // Reset game state
  const resetGame = () => {
    setGameCompleted(false)
    setGameScore({ score: 0, total: 0 })
  }

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-6">
        <Link href="/dashboard/spellbooks" className="inline-flex items-center text-amber-400 hover:text-amber-300">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to Spellbooks</span>
        </Link>
        <h1 className="text-3xl font-bold font-serif mt-2 text-amber-500">Magical Formula Mastery</h1>
        <p className="text-amber-300 font-serif">Train your memory to recall important formulas instantly</p>
      </div>

      <Card className="bg-[#1a2639] border-2 border-amber-600 text-amber-50 shadow-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>

        <CardHeader className="relative z-10 border-b border-amber-800/30">
          <div className="flex items-center">
            <div className="bg-amber-900/60 rounded-full p-2 mr-3 border border-amber-600">
              <BookOpen className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-2xl font-serif text-amber-400">Formula Memorization Training</CardTitle>
              <CardDescription className="text-amber-200 font-serif">
                Master the essential formulas needed for your magical exams
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 pt-6">
          <Tabs defaultValue="percentage" onValueChange={setSelectedCategory} className="mb-6">
            <TabsList className="bg-amber-900/30 border border-amber-700">
              <TabsTrigger
                value="percentage"
                className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-50 text-amber-300"
              >
                Percentage
              </TabsTrigger>
              <TabsTrigger
                value="algebra"
                className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-50 text-amber-300"
              >
                Algebra
              </TabsTrigger>
              <TabsTrigger
                value="geometry"
                className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-50 text-amber-300"
              >
                Geometry
              </TabsTrigger>
              <TabsTrigger
                value="number"
                className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-50 text-amber-300"
              >
                Number System
              </TabsTrigger>
            </TabsList>

            <TabsContent value="percentage" className="mt-6">
              <div className="mb-4">
                <h3 className="text-xl font-serif text-amber-400 mb-2">Percentage Formulas</h3>
                <p className="text-amber-200 font-serif">
                  Master these essential percentage formulas to excel in your exams. These formulas are crucial for solving problems related to percentages, profit and loss, and more.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="algebra" className="mt-6">
              <div className="mb-4">
                <h3 className="text-xl font-serif text-amber-400 mb-2">Algebra Formulas</h3>
                <p className="text-amber-200 font-serif">
                  These algebraic formulas are the foundation of many mathematical concepts. Master them to solve equations, find slopes, distances, and more.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="geometry" className="mt-6">
              <div className="mb-4">
                <h3 className="text-xl font-serif text-amber-400 mb-2">Geometry Formulas</h3>
                <p className="text-amber-200 font-serif">
                  Geometry formulas help you calculate areas, perimeters, and understand spatial relationships. These are essential for solving problems involving shapes and spaces.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="number" className="mt-6">
              <div className="mb-4">
                <h3 className="text-xl font-serif text-amber-400 mb-2">Number System Formulas</h3>
                <p className="text-amber-200 font-serif">
                  These formulas cover averages, interest calculations, and profit/loss scenarios. They are crucial for solving arithmetic and financial problems.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {gameCompleted ? (
            <div className="text-center py-6">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-12 w-12 text-amber-400 mr-3" />
                <h3 className="text-2xl font-serif text-amber-400">Training Results</h3>
              </div>

              <div className="text-5xl font-bold text-amber-300 mb-4">
                {gameScore.score} / {gameScore.total}
              </div>

              <p className="text-amber-200 mb-6">
                {gameScore.score >= gameScore.total * 0.8
                  ? 'Outstanding! You\'ve mastered these magical formulas!'
                  : gameScore.score >= gameScore.total * 0.6
                    ? 'Good work! With more practice, you\'ll become a formula master.'
                    : 'Keep practicing! These formulas take time to master.'}
              </p>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={resetGame}
                  className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800"
                >
                  Train Again
                </Button>
                <Link href="/dashboard/spellbooks">
                  <Button
                    variant="outline"
                    className="border-amber-600 text-amber-400 hover:bg-amber-900/50 hover:text-amber-300"
                  >
                    Return to Spellbooks
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <FormulaMemorizationGame
              formulas={getFormulas()}
              onComplete={handleGameComplete}
            />
          )}
        </CardContent>

        <CardFooter className="relative z-10 border-t border-amber-800/30 pt-4">
          <p className="text-amber-200 text-sm italic">
            "The ability to recall formulas instantly is a mark of a true wizard." — Professor Vector
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
