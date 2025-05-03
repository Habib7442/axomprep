import { createClient } from '@/lib/supabase/server-client'
import Link from 'next/link'
import Header from '@/components/Header'
import ProblemSolver from '@/components/ProblemSolver'
import MathRenderer from '@/components/MathRenderer'

export default async function LessonPage({ params }: { params: { id: string } }) {
  const lessonId = params.id
  const supabase = await createClient()

  // This is a placeholder for actual lesson data that would come from Supabase
  const mockLessons = [
    {
      id: 1,
      title: 'Introduction to Linear Equations',
      content: 'Linear equations are equations where the variable has a power of 1. They take the form of ax + b = c, where a, b, and c are constants.\n\nExample: Let\'s solve 2x + 3 = 7\n\n1. Subtract 3 from both sides: 2x = 4\n2. Divide both sides by 2: x = 2\n\nTherefore, x = 2 is the solution.',
      problems: [
        { id: 1, question: 'Solve for x: 2x + 3 = 7', answer: '2', type: 'input' as const, hints: ['Subtract 3 from both sides', 'Divide both sides by 2'] },
        { id: 2, question: 'Which of the following is equivalent to 3(x + 2)?', options: ['3x + 2', '3x + 6', '3x + 5', '3 + 2x'], answer: '3x + 6', type: 'mcq' as const, hints: ['Use the distributive property'] },
      ]
    },
    {
      id: 2,
      title: 'Solving Systems of Equations',
      content: 'A system of equations consists of two or more equations with the same variables. We can solve them using substitution or elimination.\n\nExample: Let\'s solve the system:\nx + y = 5\nx - y = 1\n\nUsing elimination:\nAdd the two equations: 2x = 6\nTherefore, x = 3\n\nSubstitute back: 3 + y = 5\nTherefore, y = 2\n\nThe solution is (3, 2).',
      problems: [
        { id: 3, question: 'If x + y = 5 and x - y = 3, what is the value of x?', answer: '4', type: 'input' as const, hints: ['Add the two equations', 'Divide by 2'] },
        { id: 4, question: 'Which method can be used to solve a system of linear equations?', options: ['Substitution', 'Elimination', 'Graphing', 'All of the above'], answer: 'All of the above', type: 'mcq' as const },
      ]
    },
    {
      id: 3,
      title: 'Graphing Linear Equations',
      content: 'Linear equations can be graphed on a coordinate plane. The graph of a linear equation is a straight line.\n\nExample: Let\'s graph y = 2x + 1\n\n1. Find the y-intercept: When x = 0, y = 1\n2. Find another point: When x = 1, y = 3\n3. Plot these points and draw a line through them.\n\nThe line represents all solutions to the equation.',
      problems: [
        { id: 5, question: 'What is the y-intercept of the line y = 3x + 4?', options: ['0', '3', '4', '-4'], answer: '4', type: 'mcq' as const, hints: ['The y-intercept is where x = 0'] },
        { id: 6, question: 'What is the slope of the line passing through the points (2, 3) and (4, 7)?', answer: '2', type: 'input' as const, hints: ['Use the slope formula: (y₂ - y₁)/(x₂ - x₁)'] },
      ]
    },
    {
      id: 4,
      title: 'Introduction to Quadratic Equations',
      content: 'Quadratic equations are equations where the highest power of the variable is 2. They take the form of ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0.\n\nExample: Let\'s solve x² - 5x + 6 = 0\n\nUsing factoring: (x - 2)(x - 3) = 0\nTherefore, x = 2 or x = 3\n\nThe solutions are x = 2 and x = 3.',
      problems: [
        { id: 7, question: 'Solve for x: x² - 5x + 6 = 0', answer: '2, 3', type: 'input' as const, hints: ['Try factoring the expression', 'Look for factors of 6 that add up to -5'] },
        { id: 8, question: 'What is the discriminant of x² - 6x + 9 = 0?', options: ['0', '36', '-36', '6'], answer: '0', type: 'mcq' as const, hints: ['The discriminant is b² - 4ac', 'a = 1, b = -6, c = 9'] },
      ]
    },
    {
      id: 5,
      title: 'Factoring Polynomials',
      content: 'Factoring is the process of finding expressions that multiply together to give a polynomial.\n\nExample: Let\'s factor x² + 5x + 6\n\nWe need to find two numbers that multiply to give 6 and add to give 5.\nThese numbers are 2 and 3.\n\nTherefore, x² + 5x + 6 = (x + 2)(x + 3)',
      problems: [
        { id: 9, question: 'Which of the following is the factored form of x² + 7x + 12?', options: ['(x + 3)(x + 4)', '(x + 6)(x + 2)', '(x + 3)(x - 4)', '(x - 3)(x - 4)'], answer: '(x + 3)(x + 4)', type: 'mcq' as const, hints: ['Look for factors of 12 that add up to 7'] },
        { id: 10, question: 'Factor completely: x² - 16', answer: '(x+4)(x-4)', type: 'input' as const, hints: ['This is a difference of squares', 'a² - b² = (a+b)(a-b)'] },
      ]
    },
  ]

  const lesson = mockLessons.find(l => l.id === parseInt(lessonId)) || {
    id: parseInt(lessonId),
    title: `Lesson ${lessonId}`,
    content: `This is the content for lesson ${lessonId}. In a real implementation, this would be rich content with math equations rendered using KaTeX.`,
    problems: [
      { id: 1, question: 'Solve for x: 2x + 3 = 7', answer: '2', type: 'input' as const },
      { id: 2, question: 'Which of the following is equivalent to 3(x + 2)?', options: ['3x + 2', '3x + 6', '3x + 5', '3 + 2x'], answer: '3x + 6', type: 'mcq' as const },
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main content */}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
                  <Link
                    href="/lessons"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Back to Lessons
                  </Link>
                </div>

                <div className="prose max-w-none">
                  <div className="whitespace-pre-line">{lesson.content}</div>

                  <h2 className="text-xl font-bold mt-8 mb-4">Practice Problems</h2>

                  <div className="space-y-6 mt-4">
                    {lesson.problems.map((problem) => (
                      <ProblemSolver key={problem.id} problem={problem} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
