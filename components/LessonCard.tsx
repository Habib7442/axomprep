import Link from 'next/link'

type LessonCardProps = {
  id: number
  title: string
  description: string
  grade: number
  topic: string
}

export default function LessonCard({ id, title, description, grade, topic }: LessonCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <div className="mt-1 flex items-center space-x-2">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                Grade {grade}
              </span>
              <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                {topic}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          </div>
          <Link
            href={`/lesson/${id}`}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Start Lesson
          </Link>
        </div>
      </div>
    </div>
  )
}
