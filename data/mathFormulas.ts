// Math formulas for the Formula Memorization Game
// Organized by categories for different subjects

export type Formula = {
  id: number
  name: string
  formula: string
  description: string
  category: string
}

// Percentage formulas
export const percentageFormulas: Formula[] = [
  {
    id: 1,
    name: "Percentage",
    formula: "P = (Value / Total) × 100",
    description: "Calculates what percent one value is of a total",
    category: "percentage"
  },
  {
    id: 2,
    name: "Value from Percentage",
    formula: "Value = (Percentage × Total) / 100",
    description: "Finds a value when you know the percentage and total",
    category: "percentage"
  },
  {
    id: 3,
    name: "Percentage Increase",
    formula: "Increase % = ((New - Original) / Original) × 100",
    description: "Calculates the percentage increase from original to new value",
    category: "percentage"
  },
  {
    id: 4,
    name: "Percentage Decrease",
    formula: "Decrease % = ((Original - New) / Original) × 100",
    description: "Calculates the percentage decrease from original to new value",
    category: "percentage"
  },
  {
    id: 5,
    name: "Successive Percentage Change",
    formula: "Net % Change = a + b + (a × b / 100)",
    description: "Calculates the combined effect of two successive percentage changes",
    category: "percentage"
  },
  {
    id: 6,
    name: "Discount Price",
    formula: "Sale Price = Original Price × (1 - Discount% / 100)",
    description: "Calculates the final price after applying a percentage discount",
    category: "percentage"
  },
  {
    id: 7,
    name: "Markup Price",
    formula: "Selling Price = Cost Price × (1 + Markup% / 100)",
    description: "Calculates the selling price after adding a percentage markup",
    category: "percentage"
  },
  {
    id: 8,
    name: "Percentage Point Change",
    formula: "PP Change = New% - Original%",
    description: "Calculates the absolute difference between two percentages",
    category: "percentage"
  }
]

// Algebra formulas
export const algebraFormulas: Formula[] = [
  {
    id: 101,
    name: "Linear Equation",
    formula: "y = mx + b",
    description: "Represents a straight line where m is slope and b is y-intercept",
    category: "algebra"
  },
  {
    id: 102,
    name: "Quadratic Formula",
    formula: "x = (-b ± √(b² - 4ac)) / 2a",
    description: "Solves a quadratic equation in the form ax² + bx + c = 0",
    category: "algebra"
  },
  {
    id: 103,
    name: "Slope Formula",
    formula: "m = (y₂ - y₁) / (x₂ - x₁)",
    description: "Calculates the slope between two points (x₁,y₁) and (x₂,y₂)",
    category: "algebra"
  },
  {
    id: 104,
    name: "Distance Formula",
    formula: "d = √((x₂ - x₁)² + (y₂ - y₁)²)",
    description: "Calculates the distance between two points in a coordinate plane",
    category: "algebra"
  },
  {
    id: 105,
    name: "Midpoint Formula",
    formula: "(x,y) = ((x₁ + x₂)/2, (y₁ + y₂)/2)",
    description: "Finds the coordinates of the midpoint between two points",
    category: "algebra"
  }
]

// Geometry formulas
export const geometryFormulas: Formula[] = [
  {
    id: 201,
    name: "Area of Rectangle",
    formula: "A = l × w",
    description: "Calculates the area of a rectangle with length l and width w",
    category: "geometry"
  },
  {
    id: 202,
    name: "Area of Triangle",
    formula: "A = (1/2) × b × h",
    description: "Calculates the area of a triangle with base b and height h",
    category: "geometry"
  },
  {
    id: 203,
    name: "Area of Circle",
    formula: "A = πr²",
    description: "Calculates the area of a circle with radius r",
    category: "geometry"
  },
  {
    id: 204,
    name: "Circumference of Circle",
    formula: "C = 2πr",
    description: "Calculates the circumference of a circle with radius r",
    category: "geometry"
  },
  {
    id: 205,
    name: "Pythagorean Theorem",
    formula: "a² + b² = c²",
    description: "Relates the sides of a right triangle where c is the hypotenuse",
    category: "geometry"
  }
]

// Number system formulas
export const numberSystemFormulas: Formula[] = [
  {
    id: 301,
    name: "Average (Mean)",
    formula: "Mean = Sum of Values / Number of Values",
    description: "Calculates the arithmetic mean of a set of numbers",
    category: "number"
  },
  {
    id: 302,
    name: "Simple Interest",
    formula: "SI = P × R × T / 100",
    description: "Calculates simple interest where P is principal, R is rate, T is time",
    category: "number"
  },
  {
    id: 303,
    name: "Compound Interest",
    formula: "A = P(1 + r/n)^(nt)",
    description: "Calculates compound interest where P is principal, r is rate, n is frequency, t is time",
    category: "number"
  },
  {
    id: 304,
    name: "Profit Percentage",
    formula: "Profit% = (Profit / Cost Price) × 100",
    description: "Calculates profit as a percentage of the cost price",
    category: "number"
  },
  {
    id: 305,
    name: "Loss Percentage",
    formula: "Loss% = (Loss / Cost Price) × 100",
    description: "Calculates loss as a percentage of the cost price",
    category: "number"
  }
]

// Get formulas by category
export function getFormulasByCategory(category: string): Formula[] {
  switch (category) {
    case 'percentage':
      return percentageFormulas
    case 'algebra':
      return algebraFormulas
    case 'geometry':
      return geometryFormulas
    case 'number':
      return numberSystemFormulas
    default:
      return []
  }
}

// Get all formulas
export function getAllFormulas(): Formula[] {
  return [
    ...percentageFormulas,
    ...algebraFormulas,
    ...geometryFormulas,
    ...numberSystemFormulas
  ]
}
