import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { transcript, storyTitle } = await request.json();
    
    // Debug: Log what we're receiving
    console.log('Received transcript in API:', transcript);
    console.log('Received storyTitle in API:', storyTitle);
    console.log('Transcript type:', typeof transcript);
    console.log('Transcript length:', Array.isArray(transcript) ? transcript.length : 'Not an array');
    
    // Initialize Google GenAI with the API key from environment variables
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" });
    
    // Validate input
    if (!transcript || !Array.isArray(transcript) || transcript.length === 0) {
      throw new Error('Invalid or empty transcript provided');
    }
    
    if (!storyTitle || typeof storyTitle !== 'string') {
      throw new Error('Invalid story title provided');
    }
    
    // Create a transcript string for analysis
    const transcriptText = transcript.map((msg: { role: string; content: string }) => 
      `${msg.role === 'assistant' ? 'Storyteller' : 'Listener'}: ${msg.content}`
    ).join('\n\n');
    
    // Create the prompt for analysis
    const prompt = `Analyze the following story listening session transcript and provide a detailed report with the following information:
    
    Story Title: ${storyTitle}
    
    Transcript:
    ${transcriptText}
    
    Please provide the analysis in the following JSON format:
    {
      "strengths": ["List of strengths demonstrated in the story listening session"],
      "weaknesses": ["List of weaknesses or areas that need improvement"],
      "improvements": ["Specific suggestions for improvement in English listening skills"],
      "score": 75,
      "feedback": "Overall feedback about the story listening performance",
      "recommendations": ["List of recommendations for future story listening practice"]
    }
    
    Focus on English learning aspects such as:
    - Listening comprehension
    - Vocabulary understanding
    - Ability to follow narrative structure
    - Engagement with the story content
    - Understanding of moral/messages
    
    Make sure the score is between 0-100. The feedback should be detailed and personalized based on the transcript. All lists should have 3-5 items each.`;
    
    // Generate content using Google GenAI
    const genResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [prompt],
    });
    
    // Parse the response
    const analysisText = genResponse.text;
    
    // Check if we have a response
    if (!analysisText) {
      throw new Error('No response from AI model');
    }
    
    // Log the raw response for debugging
    console.log('Raw AI response:', analysisText);
    
    // Try to extract JSON from the response text
    let analysis;
    try {
      // Extract JSON from the response text
      const jsonStart = analysisText.indexOf('{');
      const jsonEnd = analysisText.lastIndexOf('}') + 1;
      
      // Check if we found valid JSON brackets
      if (jsonStart === -1 || jsonEnd <= jsonStart) {
        throw new Error('No valid JSON found in AI response');
      }
      
      const jsonString = analysisText.substring(jsonStart, jsonEnd);
      console.log('Extracted JSON string:', jsonString);
      analysis = JSON.parse(jsonString);
      
      // Validate that the analysis has the required properties
      if (!analysis.strengths || !analysis.weaknesses || !analysis.improvements || 
          analysis.score === undefined || !analysis.feedback || !analysis.recommendations) {
        throw new Error('Analysis missing required properties');
      }
      
      // Validate that score is between 0-100
      if (typeof analysis.score !== 'number' || analysis.score < 0 || analysis.score > 100) {
        throw new Error('Score must be a number between 0-100');
      }
      
      return NextResponse.json({ analysis });
    } catch (parseError: unknown) {
      console.error('Error parsing JSON from AI response:', parseError);
      console.error('Full AI response:', analysisText);
      // Return an error response so the frontend knows to use mock data
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }
    
  } catch (error: unknown) {
    console.error("Error generating story report:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: "Failed to generate story report: " + errorMessage }, { status: 500 });
  }
}