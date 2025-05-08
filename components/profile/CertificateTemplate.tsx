'use client'

import React from 'react'

interface CertificateTemplateProps {
  userName: string
  testName: string
  score: number
  totalMarks: number
  date: string
  house: string
}

// Create a completely isolated component with no external styles
export default function CertificateTemplate({
  userName,
  testName,
  score,
  totalMarks,
  date,
  house
}: CertificateTemplateProps) {
  // House colors for the certificate border - using hex colors directly
  const houseColors: Record<string, { border: string, primary: string }> = {
    gryffindor: { border: '#740001', primary: '#D3A625' },
    slytherin: { border: '#1A472A', primary: '#5D5D5D' },
    ravenclaw: { border: '#0E1A40', primary: '#946B2D' },
    hufflepuff: { border: '#ECB939', primary: '#372E29' }
  }

  const houseColor = houseColors[house] || { border: '#B45309', primary: '#92400E' }

  // Create a static HTML string that doesn't rely on any external styles
  const certificateHtml = `
    <div style="
      width: 1000px;
      height: 700px;
      padding: 32px;
      background-color: #FFFBEB;
      border: 8px solid ${houseColor.border};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: serif;
      box-sizing: border-box;
      color: #000000;
    ">
      <div style="
        width: 96px;
        height: 96px;
        background-color: #92400E;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 24px;
      ">
        MQ
      </div>

      <h1 style="
        font-size: 36px;
        color: #92400E;
        margin-bottom: 16px;
        font-weight: bold;
        margin-top: 0;
      ">Certificate of Achievement</h1>

      <p style="
        font-size: 20px;
        margin-bottom: 32px;
        margin-top: 0;
      ">This certifies that</p>

      <p style="
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 32px;
        margin-top: 0;
      ">${userName}</p>

      <p style="
        font-size: 20px;
        margin-bottom: 32px;
        margin-top: 0;
      ">has successfully passed</p>

      <p style="
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 32px;
        margin-top: 0;
      ">${testName}</p>

      <p style="
        font-size: 20px;
        margin-bottom: 16px;
        margin-top: 0;
      ">with a score of</p>

      <p style="
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 32px;
        margin-top: 0;
      ">${score}/${totalMarks}</p>

      <p style="
        font-size: 18px;
        font-style: italic;
        margin-bottom: 8px;
        margin-top: 0;
      ">Hogwarts School of Mathematics</p>

      <p style="
        font-size: 18px;
        margin-top: 0;
        margin-bottom: 0;
      ">${date}</p>
    </div>
  `

  // Use dangerouslySetInnerHTML to render the static HTML
  return (
    <div dangerouslySetInnerHTML={{ __html: certificateHtml }} />
  )
}
