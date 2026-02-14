
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, SearchFilters } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const recipeSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      prepTime: { type: Type.STRING },
      cookTime: { type: Type.STRING },
      servings: { type: Type.NUMBER },
      difficulty: { type: Type.STRING },
      ingredients: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            item: { type: Type.STRING },
            amount: { type: Type.STRING }
          },
          required: ["item", "amount"]
        }
      },
      instructions: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      kidFriendlyTip: { type: Type.STRING },
      nutritionalHighlights: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      tags: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    },
    required: ["id", "title", "description", "prepTime", "cookTime", "servings", "difficulty", "ingredients", "instructions", "kidFriendlyTip"]
  }
};

export const generateRecipes = async (filters: SearchFilters): Promise<Recipe[]> => {
  const prompt = `Generate 3 delicious, nutritious, and very easy family-friendly recipes suitable for children aged 3 and above. 
    
    STRICTLY USE THE METRIC SYSTEM for all measurements (grams, kilograms, milliliters, liters, degrees Celsius). 
    Do NOT use imperial units like cups, ounces, or Fahrenheit. 
    
    Context: ${filters.dietary ? `Dietary needs: ${filters.dietary}.` : ''} 
    ${filters.maxTime ? `Max total time: ${filters.maxTime} minutes.` : ''}
    ${filters.ingredients ? `Try to include these ingredients: ${filters.ingredients}.` : ''}
    
    Focus on soft textures, mild but flavorful tastes, and quick cleanup. 
    Each recipe must include a 'kidFriendlyTip' on how to present the food or involve the child.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional nutritionist and family chef specializing in easy, nutritious meals for families with small children (ages 3+). You strictly use metric measurements. You do not provide image prompts or image URLs.",
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const recipes: Recipe[] = JSON.parse(response.text || '[]');
    return recipes;
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
};
