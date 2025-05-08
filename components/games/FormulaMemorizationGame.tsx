'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Sparkles, BookOpen, Wand2, Brain, Award } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Types for our formulas
type Formula = {
  id: number
  name: string
  formula: string
  description: string
  category: string
}

// Types for our game phases
type GamePhase = 'intro' | 'study' | 'challenge' | 'speed' | 'final' | 'results'

export default function FormulaMemorizationGame({
  formulas,
  onComplete
}: {
  formulas: Formula[]
  onComplete: (score: number, totalPossible: number) => void
}) {
  // Game state
  const [phase, setPhase] = useState<GamePhase>('intro')
  const [currentFormulaIndex, setCurrentFormulaIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [showAnswer, setShowAnswer] = useState(false)
  const [challengeFormulas, setChallengeFormulas] = useState<Formula[]>([])
  const [speedFormulas, setSpeedFormulas] = useState<Formula[]>([])
  const [finalPairs, setFinalPairs] = useState<{formulas: Formula[], descriptions: string[]}>({ formulas: [], descriptions: [] })
  const [userPairs, setUserPairs] = useState<Record<number, string>>({})
  const [selectedFormulaId, setSelectedFormulaId] = useState<number | null>(null)
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null)
  const [flashMessage, setFlashMessage] = useState<{message: string, type: 'success' | 'error'} | null>(null)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize the game
  useEffect(() => {
    if (phase === 'study') {
      setTimeLeft(formulas.length * 10) // 10 seconds per formula for study phase
    } else if (phase === 'challenge') {
      // Create challenge versions of formulas with blanks
      const challenges = formulas.map(formula => {
        // Create a version with blanks for challenge mode
        const parts = formula.formula.split('=')
        if (parts.length > 1) {
          return {
            ...formula,
            challengeFormula: `${parts[0]}= ?`
          }
        }
        return {
          ...formula,
          challengeFormula: formula.formula.replace(/[0-9]+|[+\-*/^()]+/g, '?')
        }
      })
      setChallengeFormulas(challenges)
      setTimeLeft(challenges.length * 15) // 15 seconds per challenge
    } else if (phase === 'speed') {
      // Shuffle formulas for speed round
      const shuffled = [...formulas].sort(() => Math.random() - 0.5)
      setSpeedFormulas(shuffled)
      setTimeLeft(shuffled.length * 5) // 5 seconds per formula in speed round
    } else if (phase === 'final') {
      // Create matching pairs for final test
      const shuffledFormulas = [...formulas].sort(() => Math.random() - 0.5)
      const shuffledDescriptions = shuffledFormulas.map(f => f.description).sort(() => Math.random() - 0.5)
      setFinalPairs({
        formulas: shuffledFormulas,
        descriptions: shuffledDescriptions
      })
      setTimeLeft(60) // 60 seconds for final matching
    }

    // Set up timer
    if (['study', 'challenge', 'speed', 'final'].includes(phase)) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            // Move to next phase when time runs out
            if (phase === 'study') setPhase('challenge')
            else if (phase === 'challenge') setPhase('speed')
            else if (phase === 'speed') setPhase('final')
            else if (phase === 'final') setPhase('results')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [phase, formulas])

  // Handle completion of the game
  useEffect(() => {
    if (phase === 'results') {
      const totalPossible = formulas.length * 3 // Points possible across all phases
      onComplete(score, totalPossible)
    }
  }, [phase, score, formulas.length, onComplete])

  // Handle formula navigation in study phase
  const nextFormula = () => {
    if (currentFormulaIndex < formulas.length - 1) {
      setCurrentFormulaIndex(prev => prev + 1)
      setShowAnswer(false)
    } else {
      // Move to next phase if we've seen all formulas
      setPhase('challenge')
      setCurrentFormulaIndex(0)
    }
  }

  const prevFormula = () => {
    if (currentFormulaIndex > 0) {
      setCurrentFormulaIndex(prev => prev - 1)
      setShowAnswer(false)
    }
  }

  // Handle challenge phase answer submission
  const submitChallengeAnswer = (formulaId: number, answer: string) => {
    setUserAnswers(prev => ({...prev, [formulaId]: answer}))

    // Check if answer is correct
    const formula = formulas.find(f => f.id === formulaId)
    if (formula && formula.formula.includes(answer)) {
      setScore(prev => prev + 1)
      setFlashMessage({message: 'Correct! +1 point', type: 'success'})
    } else {
      setFlashMessage({message: 'Incorrect! The correct answer is shown', type: 'error'})
    }

    // Show correct answer briefly
    setShowAnswer(true)
    setTimeout(() => {
      setShowAnswer(false)
      nextFormula()
    }, 2000)
  }

  // Handle speed round answer
  const submitSpeedAnswer = (selectedId: number, correctId: number) => {
    if (selectedId === correctId) {
      setScore(prev => prev + 1)
      setFlashMessage({message: 'Correct! +1 point', type: 'success'})
    } else {
      setFlashMessage({message: 'Incorrect!', type: 'error'})
    }

    // Move to next formula after brief delay
    setTimeout(() => {
      if (currentFormulaIndex < speedFormulas.length - 1) {
        setCurrentFormulaIndex(prev => prev + 1)
        setFlashMessage(null)
      } else {
        setPhase('final')
        setCurrentFormulaIndex(0)
        setFlashMessage(null)
      }
    }, 1000)
  }

  // Handle matching in final phase
  const handlePairSelection = (formulaId: number | null, description: string | null) => {
    if (formulaId !== null) {
      setSelectedFormulaId(formulaId)

      // If we already have a description selected, check the match
      if (selectedDescription) {
        const formula = formulas.find(f => f.id === formulaId)
        if (formula && formula.description === selectedDescription) {
          // Correct match
          setUserPairs(prev => ({...prev, [formulaId]: selectedDescription}))
          setScore(prev => prev + 1)
          setFlashMessage({message: 'Correct match! +1 point', type: 'success'})
        } else {
          setFlashMessage({message: 'Incorrect match!', type: 'error'})
        }

        // Reset selections
        setSelectedFormulaId(null)
        setSelectedDescription(null)

        // Clear flash message after delay
        setTimeout(() => {
          setFlashMessage(null)
        }, 1500)
      }
    } else if (description !== null) {
      setSelectedDescription(description)

      // If we already have a formula selected, check the match
      if (selectedFormulaId !== null) {
        const formula = formulas.find(f => f.id === selectedFormulaId)
        if (formula && formula.description === description) {
          // Correct match
          setUserPairs(prev => ({...prev, [selectedFormulaId]: description}))
          setScore(prev => prev + 1)
          setFlashMessage({message: 'Correct match! +1 point', type: 'success'})
        } else {
          setFlashMessage({message: 'Incorrect match!', type: 'error'})
        }

        // Reset selections
        setSelectedFormulaId(null)
        setSelectedDescription(null)

        // Clear flash message after delay
        setTimeout(() => {
          setFlashMessage(null)
        }, 1500)
      }
    }
  }

  // Render different phases of the game
  const renderGamePhase = () => {
    switch (phase) {
      case 'intro':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-serif text-amber-500 mb-4">Magical Formula Mastery</h2>
            <p className="text-amber-200 mb-6 font-serif">
              Welcome, young wizard! In this magical training exercise, you will master the essential formulas needed for your exams.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="bg-amber-900/30 border-amber-600 p-4">
                <div className="flex items-center mb-2">
                  <BookOpen className="text-amber-400 mr-2" />
                  <h3 className="text-amber-400 font-serif">Study Phase</h3>
                </div>
                <p className="text-amber-200 text-sm">Memorize the magical formulas presented to you</p>
              </Card>
              <Card className="bg-amber-900/30 border-amber-600 p-4">
                <div className="flex items-center mb-2">
                  <Wand2 className="text-amber-400 mr-2" />
                  <h3 className="text-amber-400 font-serif">Challenge Phase</h3>
                </div>
                <p className="text-amber-200 text-sm">Complete the formulas with missing parts</p>
              </Card>
              <Card className="bg-amber-900/30 border-amber-600 p-4">
                <div className="flex items-center mb-2">
                  <Brain className="text-amber-400 mr-2" />
                  <h3 className="text-amber-400 font-serif">Speed Round</h3>
                </div>
                <p className="text-amber-200 text-sm">Quickly identify formulas as they flash before you</p>
              </Card>
              <Card className="bg-amber-900/30 border-amber-600 p-4">
                <div className="flex items-center mb-2">
                  <Award className="text-amber-400 mr-2" />
                  <h3 className="text-amber-400 font-serif">Final Test</h3>
                </div>
                <p className="text-amber-200 text-sm">Match formulas to their correct applications</p>
              </Card>
            </div>
            <Button
              onClick={() => setPhase('study')}
              className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium"
            >
              Begin Training
            </Button>
          </div>
        )

      case 'study':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif text-amber-500">Study Phase</h2>
              <div className="text-amber-300">
                Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>
            <Progress value={(timeLeft / (formulas.length * 10)) * 100} className="mb-6 bg-amber-900/50" />

            <Card className="bg-amber-900/30 border-2 border-amber-600 p-6 mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-serif text-amber-400 mb-4">{formulas[currentFormulaIndex].name}</h3>
                <div className="p-4 bg-amber-900/40 rounded-lg border border-amber-700 text-center mb-4">
                  <p className="text-amber-200 text-xl font-serif">{formulas[currentFormulaIndex].formula}</p>
                </div>
                <p className="text-amber-300 font-serif">{formulas[currentFormulaIndex].description}</p>
              </div>
              <div className="absolute top-2 right-2">
                <Sparkles className="text-amber-400 animate-pulse" />
              </div>
            </Card>

            <div className="flex justify-between">
              <Button
                onClick={prevFormula}
                disabled={currentFormulaIndex === 0}
                className="bg-amber-700 hover:bg-amber-800 text-white border border-amber-600"
              >
                Previous
              </Button>
              <Button
                onClick={nextFormula}
                className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800"
              >
                {currentFormulaIndex < formulas.length - 1 ? 'Next' : 'Finish Study Phase'}
              </Button>
            </div>
          </div>
        )

      case 'challenge':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif text-amber-500">Challenge Phase</h2>
              <div className="text-amber-300">
                Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>
            <Progress value={(timeLeft / (challengeFormulas.length * 15)) * 100} className="mb-6 bg-amber-900/50" />

            <Card className="bg-amber-900/30 border-2 border-amber-600 p-6 mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-serif text-amber-400 mb-4">
                  {challengeFormulas[currentFormulaIndex]?.name || 'Formula Challenge'}
                </h3>

                <div className="p-4 bg-amber-900/40 rounded-lg border border-amber-700 text-center mb-4">
                  {showAnswer ? (
                    <p className="text-green-300 text-xl font-serif">
                      {formulas[currentFormulaIndex]?.formula || ''}
                    </p>
                  ) : (
                    <p className="text-amber-200 text-xl font-serif">
                      {challengeFormulas[currentFormulaIndex]?.challengeFormula || ''}
                    </p>
                  )}
                </div>

                {!showAnswer && (
                  <div className="mb-4">
                    <label className="block text-amber-300 mb-2 font-serif">Complete the formula:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 bg-amber-900/40 border border-amber-600 rounded p-2 text-amber-100"
                        placeholder="Enter the missing part"
                        value={userAnswers[challengeFormulas[currentFormulaIndex]?.id || 0] || ''}
                        onChange={(e) => setUserAnswers(prev => ({
                          ...prev,
                          [challengeFormulas[currentFormulaIndex]?.id || 0]: e.target.value
                        }))}
                      />
                      <Button
                        onClick={() => submitChallengeAnswer(
                          challengeFormulas[currentFormulaIndex]?.id || 0,
                          userAnswers[challengeFormulas[currentFormulaIndex]?.id || 0] || ''
                        )}
                        className="bg-amber-600 hover:bg-amber-700 text-white border border-amber-800"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}

                <p className="text-amber-300 font-serif">
                  {challengeFormulas[currentFormulaIndex]?.description || ''}
                </p>
              </div>
              <div className="absolute top-2 right-2">
                <Wand2 className="text-amber-400 animate-pulse" />
              </div>
            </Card>

            {showAnswer && (
              <div className="flex justify-center mb-4">
                <Button
                  onClick={() => {
                    if (currentFormulaIndex < challengeFormulas.length - 1) {
                      setCurrentFormulaIndex(prev => prev + 1)
                      setShowAnswer(false)
                    } else {
                      setPhase('speed')
                      setCurrentFormulaIndex(0)
                    }
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800"
                >
                  {currentFormulaIndex < challengeFormulas.length - 1 ? 'Next Challenge' : 'Continue to Speed Round'}
                </Button>
              </div>
            )}
          </div>
        )

      case 'speed':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif text-amber-500">Speed Round</h2>
              <div className="text-amber-300">
                Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>
            <Progress value={(timeLeft / (speedFormulas.length * 5)) * 100} className="mb-6 bg-amber-900/50" />

            <Card className="bg-amber-900/30 border-2 border-amber-600 p-6 mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-serif text-amber-400 mb-4">Identify the Formula</h3>

                <div className="p-4 bg-amber-900/40 rounded-lg border border-amber-700 text-center mb-6">
                  <p className="text-amber-200 text-xl font-serif">
                    {speedFormulas[currentFormulaIndex]?.formula || ''}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {speedFormulas.slice(0, 4).map((formula, index) => (
                    <Button
                      key={formula.id}
                      onClick={() => submitSpeedAnswer(formula.id, speedFormulas[currentFormulaIndex]?.id || 0)}
                      className="bg-amber-800/60 hover:bg-amber-700 text-amber-200 border border-amber-600 p-3 h-auto"
                    >
                      <div className="text-left">
                        <div className="font-medium mb-1">{formula.name}</div>
                        <div className="text-xs opacity-80">{formula.description.substring(0, 60)}...</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <Brain className="text-amber-400 animate-pulse" />
              </div>
            </Card>
          </div>
        )

      case 'final':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif text-amber-500">Final Test</h2>
              <div className="text-amber-300">
                Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>
            <Progress value={(timeLeft / 60) * 100} className="mb-6 bg-amber-900/50" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-serif text-amber-400 mb-3">Formulas</h3>
                <div className="space-y-2">
                  {finalPairs.formulas.map(formula => {
                    const isMatched = userPairs[formula.id] !== undefined
                    const isSelected = selectedFormulaId === formula.id

                    return (
                      <Button
                        key={formula.id}
                        onClick={() => !isMatched && handlePairSelection(formula.id, null)}
                        className={`w-full justify-start p-3 h-auto text-left ${
                          isMatched
                            ? 'bg-green-800/60 text-green-200 border-green-600 cursor-default'
                            : isSelected
                              ? 'bg-amber-600 text-amber-100 border-amber-400'
                              : 'bg-amber-900/40 text-amber-200 border-amber-700 hover:bg-amber-800'
                        }`}
                        disabled={isMatched}
                      >
                        <div>
                          <div className="font-medium">{formula.name}</div>
                          <div className="text-sm opacity-90">{formula.formula}</div>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-serif text-amber-400 mb-3">Descriptions</h3>
                <div className="space-y-2">
                  {finalPairs.descriptions.map((description, index) => {
                    const isMatched = Object.values(userPairs).includes(description)
                    const isSelected = selectedDescription === description

                    return (
                      <Button
                        key={index}
                        onClick={() => !isMatched && handlePairSelection(null, description)}
                        className={`w-full justify-start p-3 h-auto text-left ${
                          isMatched
                            ? 'bg-green-800/60 text-green-200 border-green-600 cursor-default'
                            : isSelected
                              ? 'bg-amber-600 text-amber-100 border-amber-400'
                              : 'bg-amber-900/40 text-amber-200 border-amber-700 hover:bg-amber-800'
                        }`}
                        disabled={isMatched}
                      >
                        {description}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>

            {Object.keys(userPairs).length === finalPairs.formulas.length && (
              <div className="text-center">
                <Button
                  onClick={() => setPhase('results')}
                  className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800"
                >
                  Complete Training
                </Button>
              </div>
            )}
          </div>
        )

      case 'results':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-serif text-amber-500 mb-4">Training Complete!</h2>

            <Card className="bg-amber-900/30 border-2 border-amber-600 p-6 mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <Award className="h-12 w-12 text-amber-400 mr-3" />
                  <h3 className="text-2xl font-serif text-amber-400">Your Results</h3>
                </div>

                <div className="text-5xl font-bold text-amber-300 mb-4">
                  {score} / {formulas.length * 3}
                </div>

                <div className="mb-6">
                  <Progress value={(score / (formulas.length * 3)) * 100} className="h-4 mb-2 bg-amber-900/50" />
                  <p className="text-amber-200">
                    {score >= formulas.length * 2
                      ? 'Outstanding! You\'ve mastered these magical formulas!'
                      : score >= formulas.length
                        ? 'Good work! With more practice, you\'ll become a formula master.'
                        : 'Keep practicing! These formulas take time to master.'}
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setPhase('intro')
                    setScore(0)
                    setCurrentFormulaIndex(0)
                    setUserAnswers({})
                    setUserPairs({})
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800"
                >
                  Train Again
                </Button>
              </div>
            </Card>
          </div>
        )

      default:
        return <div>Loading...</div>
    }
  }

  return (
    <div className="formula-game relative">
      {/* Flash message for feedback */}
      <AnimatePresence>
        {flashMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`absolute top-0 left-0 right-0 p-2 text-center z-20 ${
              flashMessage.type === 'success' ? 'bg-green-800/80 text-green-200' : 'bg-red-800/80 text-red-200'
            }`}
          >
            {flashMessage.message}
          </motion.div>
        )}
      </AnimatePresence>

      {renderGamePhase()}
    </div>
  )
}
