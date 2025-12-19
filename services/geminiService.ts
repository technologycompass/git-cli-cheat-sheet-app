import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askGitAssistant = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
            role: 'user',
            parts: [{ text: `You are a friendly and concise Git Expert Assistant. 
            The user is asking a question about Git. 
            Provide the exact command(s) needed if applicable, and a brief explanation.
            Format your response with Markdown (use code blocks for commands).
            Keep it short and helpful.
            
            User Question: ${question}` }]
        }
      ],
    });

    return response.text || "I couldn't generate a response. Please check your API key.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the Git Assistant.";
  }
};
