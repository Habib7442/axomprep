import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { transcript, interviewType, topic, jobDescription } = await request.json();
    
    // Initialize Google GenAI with the API key from environment variables
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" });
    
    // Create the prompt for analysis
    let prompt = `Analyze the following interview transcript and provide a detailed report with the following information:
    
    Interview Type: ${interviewType}
    ${interviewType === "resume-based" ? `Job Description: ${jobDescription}` : `Topic: ${topic}`}
    
    Transcript:
    ${transcript}
    
    Please provide the analysis in the following JSON format:
    {
      "strengths": ["List of strengths demonstrated in the interview"],
      "weaknesses": ["List of weaknesses or areas that need improvement"],
      "improvements": ["Specific suggestions for improvement"],
      "score": 75,
      "feedback": "Overall feedback about the interview performance",
      "recommendations": ["List of recommendations for future interviews"]
    }
    
    Make sure the score is between 0-100. The feedback should be detailed and personalized based on the transcript. All lists should have 3-5 items each.`;
    
    // Generate content using Google GenAI
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [prompt],
    });
    
    // Parse the response
    const analysisText = response.text;
    
    // Try to extract JSON from the response
    let analysis;
    try {
      // Extract JSON from the response text
      const jsonStart = analysisText.indexOf('{');
      const jsonEnd = analysisText.lastIndexOf('}') + 1;
      const jsonString = analysisText.substring(jsonStart, jsonEnd);
      analysis = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Error parsing JSON from AI response:', parseError);
      // Return a default analysis if parsing fails
      analysis = {
        strengths: ["Good communication skills", "Relevant experience mentioned"],
        weaknesses: ["Could provide more specific examples", "Needed more technical details"],
        improvements: ["Use STAR method for behavioral questions", "Prepare specific examples"],
        score: 70,
        feedback: "Overall, you demonstrated good communication skills. To improve, focus on providing more specific examples and technical details.",
        recommendations: ["Practice with a friend or mentor", "Prepare questions to ask the interviewer"]
      };
    }
    
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error generating interview report:", error);
    return NextResponse.json({ error: "Failed to generate interview report" }, { status: 500 });
  }
}