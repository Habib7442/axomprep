'use client'

import { useState } from 'react'
import MathRenderer from './MathRenderer'

type Problem = {
  id: number
  type: 'input' | 'mcq'
  question: string
  answer: string
  options?: string[]
  hints?: string[]
}

export default function ProblemSolver({ problem }: { problem: Problem }) {
  const [userAnswer, setUserAnswer] = useState('')
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)

  const checkAnswer = () => {
    const answer = problem.type === 'input' ? userAnswer.trim() : selectedOption
    
    if (!answer) {
      setFeedback({ correct: false, message: 'Please provide an answer.' })
      return
    }
    
    const isCorrect = problem.type === 'input' 
      ? userAnswer.trim().toLowerCase() === problem.answer.toLowerCase()
      : selectedOption === problem.answer
    
    setFeedback({
      correct: isCorrect,
      message: isCorrect 
        ? 'Correct! Well done.' 
        : 'Incorrect. Try again or use a hint.'
    })
  }

  const showNextHint = () => {
    if (problem.hints && hintIndex < problem.hints.length - 1) {
      setHintIndex(hintIndex + 1)
    }
    setShowHint(true)
  }

  return (
    <div className="border border-gray-200 rounded-md p-4">
      <div className="mb-4">
        <p className="font-medium">{problem.question}</p>
      </div>
      
      {problem.type === 'input' ? (
        <div>
          <label htmlFor={`problem-${problem.id}`} className="sr-only">Answer</label>
          <input
            type="text"
            id={`problem-${problem.id}`}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter your answer"
          />
        </div>
      ) : problem.type === 'mcq' && problem.options ? (
        <div className="space-y-2">
          {problem.options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                id={`problem-${problem.id}-option-${index}`}
                name={`problem-${problem.id}`}
                type="radio"
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor={`problem-${problem.id}-option-${index}`} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                {option}
              </label>
            </div>
          ))}
        </div>
      ) : null}
      
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={checkAnswer}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Check Answer
        </button>
        
        {problem.hints && problem.hints.length > 0 && (
          <button
            type="button"
            onClick={showNextHint}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-600 hover:bg-indigo-50"
          >
            {showHint ? 'Next Hint' : 'Show Hint'}
          </button>
        )}
      </div>
      
      {feedback && (
        <div className={`mt-4 p-3 rounded-md ${feedback.correct ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {feedback.message}
        </div>
      )}
      
      {showHint && problem.hints && problem.hints.length > 0 && (
        <div className="mt-4 p-3 rounded-md bg-yellow-50 text-yellow-700">
          <p className="font-medium">Hint {hintIndex + 1}:</p>
          <p>{problem.hints[hintIndex]}</p>
        </div>
      )}
    </div>
  )
}
