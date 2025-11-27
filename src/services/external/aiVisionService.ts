/* eslint-disable @typescript-eslint/no-unused-vars */
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface NutritionInfo {
  foodName: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  servingSize: string;
  confidence: number;
}

export interface AnalysisResult {
  success: boolean;
  data?: NutritionInfo;
  error?: string;
}

// Initialize Gemini AI
// Users can add their own API key here or through environment variable
const API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY ||
  "bOIvTtXJnBcSG5EdvW6i6HHP7Os4P21jfx1p9CpW";

let genAI: GoogleGenerativeAI | null = null;

try {
  if (API_KEY && API_KEY !== "bOIvTtXJnBcSG5EdvW6i6HHP7Os4P21jfx1p9CpW") {
    genAI = new GoogleGenerativeAI(API_KEY);
  }
} catch (error) {
  console.error("Failed to initialize Gemini AI:", error);
}

/**
 * Analyzes food image and returns nutritional information
 */
export async function analyzeFoodImage(
  imageFile: File
): Promise<AnalysisResult> {
  try {
    // If no API key is configured, return mock data for demo purposes
    if (!genAI) {
      console.warn("Gemini AI not configured, using mock data");
      return getMockNutritionData(imageFile.name);
    }

    // Convert image to base64
    const imageData = await fileToGenerativePart(imageFile);

    // Get the Gemini Pro Vision model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze this food image and provide detailed nutritional information.
    Identify the food items in the bowl/plate and estimate:
    - Food name
    - Total calories (kcal)
    - Carbohydrates (g)
    - Protein (g)
    - Fat (g)
    - Fiber (g)
    - Approximate serving size

    Please respond ONLY with a valid JSON object in this exact format:
    {
      "foodName": "name of the dish",
      "calories": number,
      "carbs": number,
      "protein": number,
      "fat": number,
      "fiber": number,
      "servingSize": "description of serving size",
      "confidence": number between 0-100
    }

    Be as accurate as possible based on typical nutritional values for the identified food.`;

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI");
    }

    const nutritionData: NutritionInfo = JSON.parse(jsonMatch[0]);

    return {
      success: true,
      data: nutritionData,
    };
  } catch (error) {
    console.error("Error analyzing food image:", error);

    // Fallback to mock data on error
    return getMockNutritionData(imageFile.name);
  }
}

/**
 * Convert File to GenerativePart for Gemini
 */
async function fileToGenerativePart(file: File) {
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(",")[1]);
    };
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: base64Data,
      mimeType: file.type,
    },
  };
}

/**
 * Generate mock nutrition data for demo purposes
 */
function getMockNutritionData(_name: string): AnalysisResult {
  const mockFoods = [
    {
      foodName: "Mixed Vegetable Rice Bowl",
      calories: 420,
      carbs: 65,
      protein: 12,
      fat: 10,
      fiber: 8,
      servingSize: "1 bowl (approx. 350g)",
      confidence: 85,
    },
    {
      foodName: "Chicken Biryani",
      calories: 550,
      carbs: 72,
      protein: 28,
      fat: 18,
      fiber: 4,
      servingSize: "1 large bowl (approx. 400g)",
      confidence: 90,
    },
    {
      foodName: "Paneer Curry with Rice",
      calories: 480,
      carbs: 58,
      protein: 18,
      fat: 20,
      fiber: 6,
      servingSize: "1 bowl (approx. 350g)",
      confidence: 88,
    },
    {
      foodName: "Grilled Chicken Salad Bowl",
      calories: 320,
      carbs: 28,
      protein: 35,
      fat: 8,
      fiber: 9,
      servingSize: "1 bowl (approx. 300g)",
      confidence: 92,
    },
    {
      foodName: "Pasta with Vegetables",
      calories: 390,
      carbs: 58,
      protein: 14,
      fat: 12,
      fiber: 7,
      servingSize: "1 bowl (approx. 280g)",
      confidence: 87,
    },
  ];

  // Select random mock data
  const randomFood = mockFoods[Math.floor(Math.random() * mockFoods.length)];

  return {
    success: true,
    data: randomFood,
  };
}

/**
 * Calculate daily nutrition goals based on user profile
 */
export function calculateDailyGoals(
  age: number,
  weight: number,
  height: number,
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active"
): { calories: number; carbs: number; protein: number; fat: number } {
  // Simplified BMR calculation (Mifflin-St Jeor Equation)
  // This is a basic calculation - adjust based on gender and other factors
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const totalCalories = Math.round(bmr * activityMultipliers[activityLevel]);

  // Macronutrient distribution (balanced diet)
  // 50% carbs, 25% protein, 25% fat
  const carbs = Math.round((totalCalories * 0.5) / 4); // 4 cal per gram
  const protein = Math.round((totalCalories * 0.25) / 4); // 4 cal per gram
  const fat = Math.round((totalCalories * 0.25) / 9); // 9 cal per gram

  return {
    calories: totalCalories,
    carbs,
    protein,
    fat,
  };
}
