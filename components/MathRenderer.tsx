'use client'

// Note: This component requires KaTeX to be installed:
// npm install katex react-katex
// Also add the KaTeX CSS in layout.tsx:
// import 'katex/dist/katex.min.css'

import React from 'react'

// This is a placeholder component until KaTeX is installed
export default function MathRenderer({ math, inline = false }: { math: string; inline?: boolean }) {
  return (
    <div className="math-renderer">
      {inline ? (
        <span className="inline-math">{math}</span>
      ) : (
        <div className="block-math">{math}</div>
      )}
      <p className="text-red-500 text-xs mt-1">
        Note: KaTeX needs to be installed to render math equations properly.
      </p>
    </div>
  )
}

// Once KaTeX is installed, uncomment and use this implementation:
/*
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function MathRenderer({ math, inline = false }: { math: string; inline?: boolean }) {
  return inline ? <InlineMath math={math} /> : <BlockMath math={math} />
}
*/
