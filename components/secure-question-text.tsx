'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface SecureQuestionTextProps {
  text: string
  userId?: string
  questionNumber: number
  totalQuestions: number
}

export function SecureQuestionText({ 
  text, 
  userId = 'MockWizard User', 
  questionNumber,
  totalQuestions
}: SecureQuestionTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const containerWidth = canvas.parentElement?.clientWidth || 600
    canvas.width = containerWidth
    
    // Calculate required height based on text wrapping
    const fontSize = 16
    const lineHeight = fontSize * 1.5
    const maxWidth = containerWidth - 40 // Padding
    
    ctx.font = `${fontSize}px 'Segoe UI', system-ui, sans-serif`
    
    // Wrap text and calculate height
    const lines = []
    const words = text.split(' ')
    let currentLine = words[0]
    
    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = ctx.measureText(`${currentLine} ${word}`).width
      
      if (width < maxWidth) {
        currentLine += ` ${word}`
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    lines.push(currentLine)
    
    // Set canvas height based on number of lines
    const canvasHeight = (lines.length * lineHeight) + 40 // Add padding
    canvas.height = canvasHeight
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Set background color
    ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#fef6e6' // Match amber-50/80
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw border
    ctx.strokeStyle = '#92400e33' // amber-800/30
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2)
    
    // Draw text
    ctx.fillStyle = '#78350f' // amber-900
    ctx.font = `${fontSize}px 'Segoe UI', system-ui, sans-serif`
    
    lines.forEach((line, index) => {
      ctx.fillText(line, 20, 30 + (index * lineHeight))
    })
    
    // Add watermark
    ctx.save()
    ctx.globalAlpha = 0.1
    ctx.font = '14px Arial'
    ctx.fillStyle = '#78350f' // amber-900
    
    // Create diagonal watermark with user ID
    const watermarkText = `${userId} - Q${questionNumber}/${totalQuestions} - MockWizard`
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(-Math.PI / 6) // Rotate -30 degrees
    ctx.fillText(watermarkText, -ctx.measureText(watermarkText).width / 2, 0)
    ctx.restore()
    
  }, [text, userId, theme, questionNumber, totalQuestions])
  
  return (
    <div className="select-none">
      <canvas 
        ref={canvasRef} 
        className="w-full rounded-md"
        aria-label={`Question ${questionNumber}: ${text}`}
      />
    </div>
  )
}
