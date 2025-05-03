import { createClient } from '@/lib/supabase/server-client'
import Header from '@/components/Header'
import LessonCard from '@/components/LessonCard'

export default async function Lessons() {
  const supabase = await createClient()

  // This is a placeholder for actual lesson data that would come from Supabase
  const mockLessons = [
    { id: 1, title: 'Introduction to Linear Equations', grade: 8, topic: 'Algebra', description: 'Learn the basics of linear equations and how to solve them.' },
    { id: 2, title: 'Solving Systems of Equations', grade: 8, topic: 'Algebra', description: 'Discover methods for solving systems of linear equations.' },
    { id: 3, title: 'Graphing Linear Equations', grade: 8, topic: 'Algebra', description: 'Visualize linear equations on the coordinate plane.' },
    { id: 4, title: 'Introduction to Quadratic Equations', grade: 9, topic: 'Algebra', description: 'Explore quadratic equations and their properties.' },
    { id: 5, title: 'Factoring Polynomials', grade: 9, topic: 'Algebra', description: 'Learn techniques for factoring polynomial expressions.' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main content */}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-2xl font-bold mb-6">Available Lessons</h1>
            <div className="space-y-6">
              {mockLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  id={lesson.id}
                  title={lesson.title}
                  description={lesson.description}
                  grade={lesson.grade}
                  topic={lesson.topic}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
