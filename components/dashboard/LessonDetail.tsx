'use client'

import { useState } from 'react'
import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

interface LessonDetailProps {
  lesson: {
    id: number
    title: string
    description: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    duration: string
    content: string
    problems: {
      id: number
      question: string
      options?: string[]
      answer?: string
      pairs?: { left: string, right: string }[]
      type: 'multiple-choice' | 'text' | 'math' | 'matching'
    }[]
  }
}

export default function LessonDetail({ lesson }: LessonDetailProps) {
  const [activeTab, setActiveTab] = useState('content')
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, string | { left: string, right: string }[]>>({})
  const [showResults, setShowResults] = useState(false)
  const [draggedItem, setDraggedItem] = useState<{ type: 'left' | 'right', value: string } | null>(null)

  // Magical names for difficulty levels
  const difficultyNames = {
    'beginner': 'First Year',
    'intermediate': 'O.W.L. Level',
    'advanced': 'N.E.W.T. Level'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-900 text-green-100'
      case 'intermediate':
        return 'bg-amber-900 text-amber-100'
      case 'advanced':
        return 'bg-red-900 text-red-100'
      default:
        return 'bg-gray-800 text-gray-100'
    }
  }

  const handleAnswerSelect = (problemId: number, answer: string | { left: string, right: string }[]) => {
    setUserAnswers(prev => ({
      ...prev,
      [problemId]: answer
    }))
  }

  const handleNextProblem = () => {
    if (currentProblemIndex < lesson.problems.length - 1) {
      setCurrentProblemIndex(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(prev => prev - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    lesson.problems.forEach(problem => {
      if (problem.type === 'matching' && problem.pairs) {
        // For matching problems, check if all pairs match
        const userPairs = userAnswers[problem.id] as { left: string, right: string }[] || [];

        // Check if all required pairs are matched correctly
        if (userPairs.length === problem.pairs.length) {
          const allCorrect = problem.pairs.every(correctPair =>
            userPairs.some(userPair =>
              userPair.left === correctPair.left && userPair.right === correctPair.right
            )
          );

          if (allCorrect) {
            correct++;
          }
        }
      } else {
        // For other problem types
        if (userAnswers[problem.id] === problem.answer) {
          correct++;
        }
      }
    })
    return {
      correct,
      total: lesson.problems.length,
      percentage: Math.round((correct / lesson.problems.length) * 100)
    }
  }

  const renderProblem = () => {
    const problem = lesson.problems[currentProblemIndex]

    if (!problem) return null

    return (
      <div className="space-y-6">
        <div className="bg-amber-900/20 border-2 border-amber-800/70 rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-medium text-amber-400 font-serif mb-3">Magical Challenge {currentProblemIndex + 1}</h3>
          <div
            className="text-amber-300 font-serif text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: problem.question }}
          ></div>
        </div>

        {problem.type === 'multiple-choice' && problem.options && (
          <div className="space-y-3 mt-4">
            {problem.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 rounded-md border-2 cursor-pointer transition-colors shadow-md ${
                  userAnswers[problem.id] === option
                    ? 'bg-amber-700/40 border-amber-500 text-amber-200 font-medium'
                    : 'bg-[#1a2639] border-amber-800/50 text-amber-300 hover:bg-[#243040] hover:border-amber-600'
                }`}
                onClick={() => handleAnswerSelect(problem.id, option)}
              >
                <span className="font-serif text-lg">{option}</span>
              </div>
            ))}
          </div>
        )}

        {problem.type === 'text' && (
          <div className="mt-4">
            <input
              type="text"
              className="w-full bg-[#1a2639] border-2 border-amber-700 rounded-md py-3 px-4 text-amber-200 text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-md"
              value={typeof userAnswers[problem.id] === 'string' ? userAnswers[problem.id] as string : ''}
              onChange={(e) => handleAnswerSelect(problem.id, e.target.value)}
              placeholder="Cast your spell here..."
            />
          </div>
        )}

        {problem.type === 'matching' && problem.pairs && (
          <div className="mt-6 space-y-6">
            <div className="p-4 bg-amber-900/20 border-2 border-amber-800/70 rounded-lg mb-4">
              <p className="text-amber-300 font-serif text-lg">
                Match each fraction on the left with its correct percentage on the right by clicking on a fraction and then clicking on the corresponding percentage.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-amber-400 font-serif text-xl font-medium mb-4 text-center border-b border-amber-600 pb-2">Magical Fractions</h4>
                {problem.pairs.map((pair, index) => {
                  // Check if this left item is already paired
                  const userPairs = (userAnswers[problem.id] as { left: string, right: string }[]) || [];
                  const isPaired = userPairs.some(p => p.left === pair.left);
                  const matchedRight = userPairs.find(p => p.left === pair.left)?.right;

                  return (
                    <div
                      key={`left-${index}`}
                      className={`p-4 rounded-md border-2 text-center font-serif text-lg shadow-md cursor-pointer transition-colors ${
                        isPaired
                          ? 'bg-amber-700/40 border-amber-500 text-amber-200'
                          : draggedItem && draggedItem.type === 'left' && draggedItem.value === pair.left
                            ? 'bg-amber-900/30 border-green-500 text-amber-200 hover:bg-amber-900/50'
                            : 'bg-amber-900/30 border-amber-700 text-amber-200 hover:bg-amber-900/50'
                      }`}
                      onClick={() => {
                        // Set this as the currently selected left item
                        setDraggedItem({ type: 'left', value: pair.left });
                      }}
                    >
                      <span className="text-xl">{pair.left}</span>
                      {isPaired && (
                        <div className="mt-2 text-amber-400 flex items-center justify-center">
                          <span>→ {matchedRight}</span>
                          <button
                            className="ml-3 text-amber-400 hover:text-amber-200 bg-amber-900/50 rounded-full h-6 w-6 flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Remove this pair
                              const newPairs = userPairs.filter(p => p.left !== pair.left);
                              handleAnswerSelect(problem.id, newPairs);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3">
                <h4 className="text-amber-400 font-serif text-xl font-medium mb-4 text-center border-b border-amber-600 pb-2">Magical Percentages</h4>
                {/* Shuffle the right items for the matching exercise */}
                {[...problem.pairs].sort(() => Math.random() - 0.5).map((pair, index) => {
                  // Check if this right item is already paired
                  const userPairs = (userAnswers[problem.id] as { left: string, right: string }[]) || [];
                  const isPaired = userPairs.some(p => p.right === pair.right);
                  const matchedLeft = userPairs.find(p => p.right === pair.right)?.left;

                  return (
                    <div
                      key={`right-${index}`}
                      className={`p-4 rounded-md border-2 text-center font-serif text-lg shadow-md cursor-pointer transition-colors ${
                        isPaired
                          ? 'bg-amber-700/40 border-amber-500 text-amber-200'
                          : 'bg-amber-900/30 border-amber-700 text-amber-200 hover:bg-amber-900/50'
                      }`}
                      onClick={() => {
                        // If we have a left item selected, pair it with this right item
                        if (draggedItem && draggedItem.type === 'left') {
                          // Remove any existing pairs with this right item
                          const filteredPairs = userPairs.filter(p => p.right !== pair.right);

                          // Add the new pair
                          const newPairs = [...filteredPairs, { left: draggedItem.value, right: pair.right }];
                          handleAnswerSelect(problem.id, newPairs);

                          // Clear the dragged item
                          setDraggedItem(null);
                        }
                      }}
                    >
                      <span className="text-xl">{pair.right}</span>
                      {isPaired && (
                        <div className="mt-2 text-amber-400 flex items-center justify-center">
                          <span>{matchedLeft} →</span>
                          <button
                            className="ml-3 text-amber-400 hover:text-amber-200 bg-amber-900/50 rounded-full h-6 w-6 flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Remove this pair
                              const newPairs = userPairs.filter(p => p.right !== pair.right);
                              handleAnswerSelect(problem.id, newPairs);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-amber-900/20 border-2 border-amber-800/70 rounded-lg mt-4">
              <p className="text-amber-300 font-serif text-lg text-center">
                {draggedItem ?
                  <span>Now select the matching percentage for <strong className="text-amber-400">{draggedItem.value}</strong></span> :
                  <span>Select a fraction to begin matching</span>
                }
              </p>
              <p className="text-amber-300 font-serif text-lg text-center mt-2">
                Matched pairs: {((userAnswers[problem.id] as { left: string, right: string }[]) || []).length} of {problem.pairs.length}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handlePrevProblem}
            disabled={currentProblemIndex === 0}
            className="border-2 border-amber-600 text-amber-400 hover:text-amber-200 hover:bg-amber-900/30 px-6 py-2 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            Previous Spell
          </Button>
          <Button
            onClick={handleNextProblem}
            className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 px-6 py-2 text-lg font-medium shadow-md"
          >
            {currentProblemIndex === lesson.problems.length - 1 ? 'Complete Spellwork' : 'Next Spell'}
          </Button>
        </div>
      </div>
    )
  }

  const renderResults = () => {
    const score = calculateScore()

    // Magical feedback based on score
    const getFeedback = () => {
      if (score.percentage >= 90) return "Outstanding! Professor McGonagall would be impressed!";
      if (score.percentage >= 80) return "Exceeds Expectations! Well done, wizard!";
      if (score.percentage >= 70) return "Acceptable. You're on your way to becoming a skilled wizard.";
      if (score.percentage >= 60) return "Poor. Perhaps a bit more practice in the common room?";
      return "Dreadful. Don't worry, even Neville struggled at first!";
    }

    // Get grade badge color
    const getGradeColor = () => {
      if (score.percentage >= 90) return "bg-green-800 border-green-500 text-green-200";
      if (score.percentage >= 80) return "bg-blue-800 border-blue-500 text-blue-200";
      if (score.percentage >= 70) return "bg-amber-800 border-amber-500 text-amber-200";
      if (score.percentage >= 60) return "bg-orange-800 border-orange-500 text-orange-200";
      return "bg-red-800 border-red-500 text-red-200";
    }

    // Get grade letter
    const getGrade = () => {
      if (score.percentage >= 90) return "O";
      if (score.percentage >= 80) return "E";
      if (score.percentage >= 70) return "A";
      if (score.percentage >= 60) return "P";
      return "D";
    }

    return (
      <div className="space-y-8 text-center">
        <div className="bg-amber-900/20 border-2 border-amber-800/70 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-bold text-amber-400 font-serif mb-2">Magical Assessment Results</h3>

          <div className="py-8 flex justify-center">
            <div className="relative h-48 w-48">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-amber-400">{score.percentage}%</span>
                <div className="mt-2 bg-amber-900/60 border-2 border-amber-600 rounded-full h-14 w-14 flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-200">{getGrade()}</span>
                </div>
              </div>
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="text-[#0c1220]"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="44"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-amber-500"
                  strokeWidth="8"
                  strokeDasharray={276.46}
                  strokeDashoffset={276.46 - (276.46 * score.percentage) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="44"
                  cx="50"
                  cy="50"
                />
              </svg>
            </div>
          </div>

          <div className={`${getGradeColor()} border-2 rounded-lg p-4 max-w-md mx-auto shadow-md mb-6`}>
            <p className="text-lg font-serif font-medium">
              {getFeedback()}
            </p>
          </div>

          <p className="text-amber-300 font-serif text-lg mt-4">
            You correctly cast <span className="font-bold text-amber-400">{score.correct}</span> out of <span className="font-bold">{score.total}</span> spells.
          </p>
        </div>

        <div className="pt-4 flex justify-center space-x-6">
          <Button
            variant="outline"
            onClick={() => {
              setShowResults(false)
              setCurrentProblemIndex(0)
              setUserAnswers({})
            }}
            className="border-2 border-amber-600 text-amber-400 hover:text-amber-200 hover:bg-amber-900/30 px-6 py-2 text-lg font-medium shadow-md"
          >
            Practice Again
          </Button>
          <Link href="/dashboard/lessons">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 px-6 py-2 text-lg font-medium shadow-md">
              Back to Spellbooks
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Generate a magical title based on the original title
  const getMagicalTitle = () => {
    const magicalTitles: Record<string, string> = {
      'Linear Equations': 'Arithmantic Linear Incantations',
      'Systems of Equations': 'Conjunctive Equation Systems',
      'Quadratic': 'Transfiguration of Quadratic Formulas',
      'Polynomial': 'Advanced Polynomial Charms',
      'Calculus': 'Ancient Runes of Calculus'
    };

    // Find if any key is in the lesson title
    for (const [key, value] of Object.entries(magicalTitles)) {
      if (lesson.title.includes(key)) {
        return value;
      }
    }

    return `Magical Study of ${lesson.title}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-500 font-serif drop-shadow-md">{getMagicalTitle()}</h1>
          <div className="flex items-center mt-2 space-x-3">
            <Badge className={`${getDifficultyColor(lesson.difficulty)} text-lg px-3 py-1 shadow-md`}>
              {difficultyNames[lesson.difficulty as keyof typeof difficultyNames] ||
                lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
            </Badge>
            <span className="text-amber-300 font-serif text-lg">{lesson.duration}</span>
          </div>
        </div>
        <Link href="/dashboard/lessons">
          <Button variant="outline" className="border-2 border-amber-500 text-amber-400 hover:text-amber-50 hover:bg-amber-900/50 font-medium text-lg shadow-md">
            Back to Spellbooks
          </Button>
        </Link>
      </div>

      <Card className="bg-[#1a2639] border-2 border-amber-600 text-amber-50 shadow-lg overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>

        <CardHeader className="relative z-10">
          <Tabs defaultValue="content" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="bg-[#0c1220] border-2 border-amber-600 p-1">
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white data-[state=inactive]:text-amber-400 font-serif text-lg px-6 py-2 font-medium"
              >
                Lesson Content
              </TabsTrigger>
              <TabsTrigger
                value="practice"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white data-[state=inactive]:text-amber-400 font-serif text-lg px-6 py-2 font-medium"
              >
                Practice Problems
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-6">
              <div className="prose prose-amber max-w-none">
                <p className="text-amber-300 font-serif text-lg">{lesson.description}</p>
                <div
                  className="text-amber-100 font-serif leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setActiveTab('practice')}
                  className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 text-lg font-medium shadow-md"
                >
                  Practice Spellcasting
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="practice" className="mt-6">
              {!showResults ? renderProblem() : renderResults()}
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  )
}
