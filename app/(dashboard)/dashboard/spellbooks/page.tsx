'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Wand2 } from 'lucide-react'
import WordBalloonPop from '@/components/games/WordBalloonPop'

export default function SpellbooksPage() {
  const [loading, setLoading] = useState(true)
  const [userHouse, setUserHouse] = useState<string>('slytherin')
  const [gameCompleted, setGameCompleted] = useState(false)
  const [gameScore, setGameScore] = useState({ score: 0, total: 0 })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Get user profile to determine house
        const { data: profile } = await supabase
          .from('users')
          .select('house')
          .eq('id', user.id)
          .single()

        if (profile?.house) {
          setUserHouse(profile.house)
        }
      } else {
        router.push('/login')
      }

      setLoading(false)
    }

    checkAuth()
  }, [router, supabase])

  // Handle game completion
  const handleGameComplete = (score: number, totalPossible: number) => {
    setGameCompleted(true)
    setGameScore({ score, total: totalPossible })

    // Save score to user profile (optional)
    saveGameScore(score)
  }

  // Reset game
  const resetGame = () => {
    setGameCompleted(false)
    setGameScore({ score: 0, total: 0 })
  }

  // Save game score to user profile
  const saveGameScore = async (score: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Update user XP
        const xpGained = Math.floor(score / 10) // 1 XP for every 10 points

        const { data: profile } = await supabase
          .from('users')
          .select('xp')
          .eq('id', user.id)
          .single()

        if (profile) {
          const newXp = (profile.xp || 0) + xpGained

          await supabase
            .from('users')
            .update({ xp: newXp })
            .eq('id', user.id)
        }
      }
    } catch (error) {
      console.error('Error saving game score:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 mx-auto mb-4">
            <svg className="h-full w-full text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.25 11.5L4.75 14.5L12 18.75L19.25 14.5L14.75 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-serif text-amber-200">Summoning spellbooks...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <svg className="h-6 w-6 text-amber-800 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
          </svg>
          <h2 className="text-xl font-bold font-serif">Magical Spellbooks</h2>
        </div>
        <p className="text-gray-600 font-serif italic">
          "The wand chooses the wizard, but the spellbook guides their magic." — Ollivander
        </p>
      </div>

      {/* Word Balloon Pop Game */}
      <Card className="bg-[#1a2639] border-2 border-amber-600 text-amber-50 shadow-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>

        <CardHeader className="relative z-10 border-b border-amber-800/30">
          <div className="flex items-center">
            <div className="bg-amber-900/60 rounded-full p-2 mr-3 border border-amber-600">
              <Wand2 className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-2xl font-serif text-amber-400">Word Balloon Pop</CardTitle>
              <CardDescription className="text-amber-200 font-serif">
                Test your vocabulary knowledge by popping the correct balloons
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 p-4 sm:p-6">
          {gameCompleted ? (
            <div className="text-center py-6">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-12 w-12 text-amber-400 mr-3" />
                <h3 className="text-2xl font-serif text-amber-400">Game Results</h3>
              </div>

              <div className="text-5xl font-bold text-amber-300 mb-4">
                {gameScore.score} points
              </div>

              <p className="text-amber-200 mb-6">
                {gameScore.score >= 80
                  ? 'Outstanding! You\'ve mastered these magical words!'
                  : gameScore.score >= 50
                    ? 'Good work! With more practice, you\'ll become a vocabulary master.'
                    : 'Keep practicing! These words take time to master.'}
              </p>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={resetGame}
                  className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800"
                >
                  Play Again
                </Button>
              </div>
            </div>
          ) : (
            <WordBalloonPop onComplete={handleGameComplete} />
          )}
        </CardContent>

        <CardFooter className="relative z-10 border-t border-amber-800/30 pt-4">
          <p className="text-amber-200 text-sm italic">
            "Words are, in my not-so-humble opinion, our most inexhaustible source of magic." — Albus Dumbledore
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
