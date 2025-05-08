'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface Lesson {
  id: number
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  completed: boolean
}

// Extended lesson interface with magical properties
interface MagicalLesson extends Lesson {
  magicalTitle?: string
  magicalDescription?: string
  housePoints?: number
}

interface LessonsListProps {
  lessons: Lesson[]
}

export default function LessonsList({ lessons }: LessonsListProps) {
  // Convert regular lessons to magical lessons
  const magicalLessons: MagicalLesson[] = lessons.map(lesson => {
    // Generate magical titles and descriptions based on the original content
    const magicalTitles: Record<string, string> = {
      'beginner': 'Fundamentals of Arithmancy',
      'intermediate': 'Advanced Magical Calculations',
      'advanced': 'N.E.W.T. Level Numerical Enchantments'
    };

    const magicalDescriptions: Record<string, string> = {
      'beginner': 'Master the basic spells of Arithmancy to unravel the mysteries of equations.',
      'intermediate': 'Learn powerful incantations to solve complex magical equations.',
      'advanced': 'Delve into the deepest secrets of magical mathematics known only to the most skilled wizards.'
    };

    return {
      ...lesson,
      magicalTitle: `${magicalTitles[lesson.difficulty] || 'Magical'}: ${lesson.title}`,
      magicalDescription: magicalDescriptions[lesson.difficulty] || 'Discover the magical properties of mathematics.',
      housePoints: lesson.difficulty === 'beginner' ? 15 : lesson.difficulty === 'intermediate' ? 25 : 40
    };
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-900 text-green-300'
      case 'intermediate':
        return 'bg-amber-900 text-amber-300'
      case 'advanced':
        return 'bg-red-900 text-red-300'
      default:
        return 'bg-gray-800 text-gray-300'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif mb-2">Available Spellbooks</h1>
        <p className="text-gray-600 font-serif">Choose a magical lesson to begin your training</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {magicalLessons.map((lesson) => (
          <Card
            key={lesson.id}
            className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>

            {/* Wax seal decoration for completed lessons */}
            {lesson.completed && (
              <div className="absolute -top-3 -right-3 h-16 w-16 rotate-12">
                <div className="h-12 w-12 rounded-full bg-red-700 flex items-center justify-center shadow-lg">
                  <svg className="h-6 w-6 text-amber-200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
              </div>
            )}

            <CardHeader className="relative z-10 border-b border-amber-800/30">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-serif">{lesson.magicalTitle || lesson.title}</CardTitle>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getDifficultyColor(lesson.difficulty)}`}>
                  {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                </span>
              </div>
              <CardDescription className="text-amber-200 font-serif">
                {lesson.duration} • {lesson.completed ? 'Mastered' : 'Not started'} • {lesson.housePoints} House Points
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-4">
              <p className="text-amber-100 font-serif">{lesson.magicalDescription || lesson.description}</p>
            </CardContent>
            <CardFooter className="relative z-10 border-t border-amber-800/30 pt-4">
              <Link href={`/dashboard/lesson/${lesson.id}`} className="w-full">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium">
                  {lesson.completed ? 'Review Spellbook' : 'Open Spellbook'}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Mini-Games Section */}
      <div className="mt-12 border-t-2 border-amber-800 pt-6">
        <div className="flex items-center mb-4">
          <svg className="h-6 w-6 text-amber-800 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <h2 className="text-xl font-bold font-serif">Magical Training Games</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>

            <CardHeader className="relative z-10 border-b border-amber-800/30">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-serif">Formula Memorization Training</CardTitle>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-amber-900 text-amber-300">
                  All Levels
                </span>
              </div>
              <CardDescription className="text-amber-200 font-serif">
                10-15 min • Interactive • 25 House Points
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 pt-4">
              <p className="text-amber-100 font-serif">
                Train your memory to instantly recall important magical formulas through an enchanted memory game.
              </p>
            </CardContent>

            <CardFooter className="relative z-10 border-t border-amber-800/30 pt-4">
              <Link href="/dashboard/spellbooks/formula-mastery" className="w-full">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium">
                  Start Training
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden opacity-80">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>

            <CardHeader className="relative z-10 border-b border-amber-800/30">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-serif">Speed Calculation Challenge</CardTitle>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-800 text-gray-300">
                  Coming Soon
                </span>
              </div>
              <CardDescription className="text-amber-200 font-serif">
                5-10 min • Interactive • 20 House Points
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 pt-4">
              <p className="text-amber-100 font-serif">
                Test your speed and accuracy with magical calculations in this timed challenge.
              </p>
            </CardContent>

            <CardFooter className="relative z-10 border-t border-amber-800/30 pt-4">
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-amber-200 border border-amber-800" disabled>
                Coming Soon
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Restricted Section */}
      <div className="mt-12 border-t-2 border-amber-800 pt-6">
        <div className="flex items-center mb-4">
          <svg className="h-6 w-6 text-amber-800 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <h2 className="text-xl font-bold font-serif">The Restricted Section</h2>
        </div>
        <Card className="bg-[#1a2639] border-2 border-amber-800 text-amber-50 shadow-lg overflow-hidden opacity-80">
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-amber-200 font-serif italic mb-4">Advanced magical lessons require a permission slip from Professor Vector.</p>
              <Button className="bg-gray-700 hover:bg-gray-600 text-amber-200 border border-amber-800" disabled>
                Request Permission
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
