
import { GoogleGenAI, Chat } from '@google/genai';

const getGenAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    // In a real application, you'd want to handle this more gracefully.
    // For this context, we assume the key is present.
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey });
}

export async function analyzeImage(
  imageData: string,
  mimeType: string
): Promise<string> {
  try {
    const ai = getGenAI();
    const textPart = {
      text: `You are an expert in home organization and interior design.
      Analyze this image of a room and provide detailed, actionable, and encouraging suggestions for organization and decluttering.
      Provide specific ideas for storage solutions, furniture arrangement, and how to deal with common clutter items visible in the photo.
      Format your response in clear, easy-to-read markdown. Use headings, bullet points, and bold text to structure your advice.`,
    };
    const imagePart = {
      inlineData: {
        data: imageData,
        mimeType: mimeType,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [textPart, imagePart] },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error analyzing image:", error);
    if (error instanceof Error) {
        return `An error occurred while analyzing the image: ${error.message}. Please try again.`;
    }
    return "An unknown error occurred while analyzing the image.";
  }
}

export function createChat(): Chat {
  const ai = getGenAI();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are a friendly and helpful chatbot specializing in home organization, decluttering, and interior design tips. Provide concise and practical advice.',
    },
  });
}
