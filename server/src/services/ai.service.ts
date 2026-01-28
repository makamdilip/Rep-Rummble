import OpenAI from 'openai'
import axios from 'axios'

// Initialize OpenAI client (optional for development)
let openai: OpenAI | null = null

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
} else {
  console.warn('⚠️  WARNING: OPENAI_API_KEY is not set. AI features will be disabled.')
}

// Nutritionix API configuration
const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID
const NUTRITIONIX_API_KEY = process.env.NUTRITIONIX_API_KEY
const NUTRITIONIX_API_URL = 'https://trackapi.nutritionix.com/v2'

// Types
export interface DetectedFood {
  name: string
  confidence: number
  portion: 'small' | 'medium' | 'large' | 'xl'
  estimatedCalories?: number
  estimatedProtein?: number
  estimatedCarbs?: number
  estimatedFat?: number
}

export interface NutritionData {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  sugar?: number
  sodium?: number
  micronutrients?: {
    vitaminA?: number
    vitaminC?: number
    vitaminD?: number
    calcium?: number
    iron?: number
    potassium?: number
  }
}

export interface FoodAlternative {
  name: string
  calories: number
  reason: string
}

export interface FoodAnalysisResult {
  detectedFoods: DetectedFood[]
  totalNutrition: NutritionData
  healthScore: number
  suggestions: string[]
  alternatives: FoodAlternative[]
  confidence: number
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
}

// Indian food database with nutrition info (fallback)
const INDIAN_FOOD_DATABASE: Record<string, NutritionData> = {
  'biryani': { calories: 350, protein: 12, carbs: 45, fat: 14, fiber: 2, sodium: 600 },
  'chicken biryani': { calories: 400, protein: 18, carbs: 45, fat: 16, fiber: 2, sodium: 650 },
  'mutton biryani': { calories: 450, protein: 20, carbs: 45, fat: 20, fiber: 2, sodium: 700 },
  'dosa': { calories: 120, protein: 3, carbs: 20, fat: 3, fiber: 1, sodium: 200 },
  'masala dosa': { calories: 250, protein: 6, carbs: 35, fat: 10, fiber: 3, sodium: 350 },
  'idli': { calories: 60, protein: 2, carbs: 12, fat: 0.5, fiber: 0.5, sodium: 150 },
  'sambar': { calories: 80, protein: 4, carbs: 12, fat: 2, fiber: 3, sodium: 400 },
  'paneer butter masala': { calories: 350, protein: 14, carbs: 15, fat: 28, fiber: 2, sodium: 500 },
  'dal tadka': { calories: 150, protein: 8, carbs: 20, fat: 5, fiber: 4, sodium: 400 },
  'roti': { calories: 70, protein: 2, carbs: 15, fat: 0.5, fiber: 1, sodium: 100 },
  'chapati': { calories: 70, protein: 2, carbs: 15, fat: 0.5, fiber: 1, sodium: 100 },
  'naan': { calories: 260, protein: 8, carbs: 45, fat: 5, fiber: 2, sodium: 400 },
  'rice': { calories: 130, protein: 2.5, carbs: 28, fat: 0.5, fiber: 0.5, sodium: 5 },
  'jeera rice': { calories: 150, protein: 3, carbs: 30, fat: 2, fiber: 1, sodium: 200 },
  'chole': { calories: 180, protein: 9, carbs: 25, fat: 6, fiber: 6, sodium: 450 },
  'chole bhature': { calories: 450, protein: 12, carbs: 55, fat: 20, fiber: 6, sodium: 600 },
  'pav bhaji': { calories: 350, protein: 8, carbs: 45, fat: 15, fiber: 5, sodium: 550 },
  'vada pav': { calories: 300, protein: 6, carbs: 40, fat: 13, fiber: 3, sodium: 450 },
  'poha': { calories: 180, protein: 4, carbs: 35, fat: 4, fiber: 2, sodium: 300 },
  'upma': { calories: 200, protein: 5, carbs: 30, fat: 7, fiber: 3, sodium: 400 },
  'paratha': { calories: 200, protein: 4, carbs: 25, fat: 10, fiber: 2, sodium: 250 },
  'aloo paratha': { calories: 280, protein: 6, carbs: 35, fat: 13, fiber: 3, sodium: 350 },
  'butter chicken': { calories: 400, protein: 25, carbs: 12, fat: 28, fiber: 2, sodium: 600 },
  'chicken tikka': { calories: 200, protein: 25, carbs: 5, fat: 10, fiber: 1, sodium: 400 },
  'tandoori chicken': { calories: 220, protein: 28, carbs: 4, fat: 10, fiber: 1, sodium: 450 },
  'fish curry': { calories: 250, protein: 22, carbs: 8, fat: 15, fiber: 2, sodium: 500 },
  'egg curry': { calories: 200, protein: 12, carbs: 8, fat: 14, fiber: 2, sodium: 450 },
  'raita': { calories: 60, protein: 3, carbs: 5, fat: 3, fiber: 0.5, sodium: 200 },
  'lassi': { calories: 150, protein: 5, carbs: 20, fat: 5, fiber: 0, sodium: 100 },
  'mango lassi': { calories: 200, protein: 5, carbs: 35, fat: 5, fiber: 1, sodium: 100 },
  'gulab jamun': { calories: 150, protein: 2, carbs: 25, fat: 6, fiber: 0, sugar: 20, sodium: 50 },
  'jalebi': { calories: 150, protein: 1, carbs: 30, fat: 5, fiber: 0, sugar: 25, sodium: 30 },
  'kheer': { calories: 200, protein: 5, carbs: 30, fat: 7, fiber: 0.5, sugar: 18, sodium: 80 },
}

/**
 * Analyze food image using OpenAI GPT-4 Vision
 */
export async function analyzeFoodImage(
  imageBase64: string,
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack'
): Promise<FoodAnalysisResult> {
  try {
    // Check if OpenAI is available
    if (!openai) {
      return getMockFoodAnalysis()
    }

    // Call GPT-4 Vision API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are an expert nutritionist and food recognition AI. Analyze food images and provide detailed nutrition information.

Your response must be a valid JSON object with this exact structure:
{
  "detectedFoods": [
    {
      "name": "food name (use common names, including Indian food names)",
      "confidence": 0.0-1.0,
      "portion": "small|medium|large|xl",
      "estimatedCalories": number,
      "estimatedProtein": number (grams),
      "estimatedCarbs": number (grams),
      "estimatedFat": number (grams)
    }
  ],
  "totalNutrition": {
    "calories": total number,
    "protein": total grams,
    "carbs": total grams,
    "fat": total grams,
    "fiber": estimated grams,
    "sugar": estimated grams,
    "sodium": estimated mg
  },
  "healthScore": 0-100 (based on nutritional balance),
  "suggestions": ["suggestion 1", "suggestion 2"],
  "alternatives": [
    {
      "name": "healthier alternative food",
      "calories": number,
      "reason": "why this is healthier"
    }
  ],
  "overallConfidence": 0.0-1.0
}

Guidelines:
- Identify ALL visible food items in the image
- Be especially accurate with Indian cuisine (biryani, dosa, curry, etc.)
- Estimate portion sizes based on visual cues
- Provide realistic calorie and macro estimates
- Health score should consider: protein content, fiber, processed vs whole foods, sodium, sugar
- Suggestions should be actionable and specific
- Alternatives should be similar but healthier options`
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this ${mealType || 'meal'} image and identify all foods with their nutrition information. Respond only with valid JSON.`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
                detail: 'high'
              }
            }
          ]
        }
      ],
      max_tokens: 1500,
      temperature: 0.3
    })

    // Parse the response
    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from AI')
    }

    // Extract JSON from response (handle potential markdown code blocks)
    let jsonStr = content
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch) {
      jsonStr = jsonMatch[1]
    }

    const analysisData = JSON.parse(jsonStr)

    // Enhance with Nutritionix data if available
    const enhancedFoods = await enhanceWithNutritionixData(analysisData.detectedFoods)

    // Calculate totals from enhanced data
    const totalNutrition = calculateTotalNutrition(enhancedFoods)

    return {
      detectedFoods: enhancedFoods,
      totalNutrition: totalNutrition,
      healthScore: analysisData.healthScore || calculateHealthScore(totalNutrition),
      suggestions: analysisData.suggestions || [],
      alternatives: analysisData.alternatives || [],
      confidence: analysisData.overallConfidence || 0.85,
      mealType: mealType || detectMealType()
    }
  } catch (error: any) {
    console.error('AI Food Analysis Error:', error)

    // Return a fallback response for demo/testing
    if (error.message?.includes('API key') || error.code === 'invalid_api_key') {
      return getFallbackAnalysis(mealType)
    }

    throw new Error(`Food analysis failed: ${error.message}`)
  }
}

/**
 * Enhance detected foods with Nutritionix API data
 */
async function enhanceWithNutritionixData(foods: DetectedFood[]): Promise<DetectedFood[]> {
  if (!NUTRITIONIX_APP_ID || !NUTRITIONIX_API_KEY) {
    // Use local database fallback
    return foods.map(food => {
      const localData = findInLocalDatabase(food.name)
      if (localData) {
        return {
          ...food,
          estimatedCalories: adjustForPortion(localData.calories, food.portion),
          estimatedProtein: adjustForPortion(localData.protein, food.portion),
          estimatedCarbs: adjustForPortion(localData.carbs, food.portion),
          estimatedFat: adjustForPortion(localData.fat, food.portion)
        }
      }
      return food
    })
  }

  try {
    const enhancedFoods = await Promise.all(
      foods.map(async (food) => {
        try {
          const response = await axios.post(
            `${NUTRITIONIX_API_URL}/natural/nutrients`,
            { query: `${food.portion} serving of ${food.name}` },
            {
              headers: {
                'x-app-id': NUTRITIONIX_APP_ID,
                'x-app-key': NUTRITIONIX_API_KEY,
                'Content-Type': 'application/json'
              }
            }
          )

          const nutrient = response.data.foods?.[0]
          if (nutrient) {
            return {
              ...food,
              estimatedCalories: Math.round(nutrient.nf_calories),
              estimatedProtein: Math.round(nutrient.nf_protein),
              estimatedCarbs: Math.round(nutrient.nf_total_carbohydrate),
              estimatedFat: Math.round(nutrient.nf_total_fat)
            }
          }
          return food
        } catch {
          // Fallback to local database
          const localData = findInLocalDatabase(food.name)
          if (localData) {
            return {
              ...food,
              estimatedCalories: adjustForPortion(localData.calories, food.portion),
              estimatedProtein: adjustForPortion(localData.protein, food.portion),
              estimatedCarbs: adjustForPortion(localData.carbs, food.portion),
              estimatedFat: adjustForPortion(localData.fat, food.portion)
            }
          }
          return food
        }
      })
    )
    return enhancedFoods
  } catch (error) {
    console.error('Nutritionix API error:', error)
    return foods
  }
}

/**
 * Find food in local Indian food database
 */
function findInLocalDatabase(foodName: string): NutritionData | null {
  const normalizedName = foodName.toLowerCase().trim()

  // Direct match
  if (INDIAN_FOOD_DATABASE[normalizedName]) {
    return INDIAN_FOOD_DATABASE[normalizedName]
  }

  // Partial match
  for (const [key, value] of Object.entries(INDIAN_FOOD_DATABASE)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return value
    }
  }

  return null
}

/**
 * Adjust nutrition values based on portion size
 */
function adjustForPortion(value: number, portion: string): number {
  const multipliers: Record<string, number> = {
    'small': 0.7,
    'medium': 1.0,
    'large': 1.4,
    'xl': 1.8
  }
  return Math.round(value * (multipliers[portion] || 1.0))
}

/**
 * Calculate total nutrition from all detected foods
 */
function calculateTotalNutrition(foods: DetectedFood[]): NutritionData {
  return foods.reduce(
    (total, food) => ({
      calories: total.calories + (food.estimatedCalories || 0),
      protein: total.protein + (food.estimatedProtein || 0),
      carbs: total.carbs + (food.estimatedCarbs || 0),
      fat: total.fat + (food.estimatedFat || 0),
      fiber: total.fiber,
      sugar: total.sugar,
      sodium: total.sodium
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 5, sugar: 10, sodium: 500 }
  )
}

/**
 * Calculate health score based on nutrition data
 */
function calculateHealthScore(nutrition: NutritionData): number {
  let score = 70 // Base score

  // Protein bonus (up to +15)
  const proteinRatio = nutrition.protein / (nutrition.calories / 100)
  score += Math.min(proteinRatio * 5, 15)

  // Fiber bonus (up to +10)
  if (nutrition.fiber) {
    score += Math.min(nutrition.fiber * 2, 10)
  }

  // High sodium penalty (up to -15)
  if (nutrition.sodium && nutrition.sodium > 600) {
    score -= Math.min((nutrition.sodium - 600) / 100, 15)
  }

  // High sugar penalty (up to -10)
  if (nutrition.sugar && nutrition.sugar > 20) {
    score -= Math.min((nutrition.sugar - 20) / 5, 10)
  }

  // Fat ratio consideration
  const fatCalories = nutrition.fat * 9
  const fatRatio = fatCalories / nutrition.calories
  if (fatRatio > 0.4) {
    score -= 10
  }

  return Math.max(0, Math.min(100, Math.round(score)))
}

/**
 * Detect meal type based on current time
 */
function detectMealType(): 'breakfast' | 'lunch' | 'dinner' | 'snack' {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 11) return 'breakfast'
  if (hour >= 11 && hour < 15) return 'lunch'
  if (hour >= 15 && hour < 18) return 'snack'
  return 'dinner'
}

/**
 * Fallback analysis for demo/testing without API key
 */
function getFallbackAnalysis(mealType?: string): FoodAnalysisResult {
  return {
    detectedFoods: [
      {
        name: 'Mixed Meal',
        confidence: 0.75,
        portion: 'medium',
        estimatedCalories: 400,
        estimatedProtein: 15,
        estimatedCarbs: 45,
        estimatedFat: 18
      }
    ],
    totalNutrition: {
      calories: 400,
      protein: 15,
      carbs: 45,
      fat: 18,
      fiber: 5,
      sugar: 8,
      sodium: 450
    },
    healthScore: 65,
    suggestions: [
      'Add more vegetables for fiber and vitamins',
      'Consider a side of protein for better satiety'
    ],
    alternatives: [
      {
        name: 'Grilled chicken salad',
        calories: 300,
        reason: 'Lower calories with more protein'
      }
    ],
    confidence: 0.75,
    mealType: (mealType as any) || detectMealType()
  }
}

/**
 * Mock food analysis for development when OpenAI API key is not available
 */
function getMockFoodAnalysis(): FoodAnalysisResult {
  const mockFoods: DetectedFood[] = [
    {
      name: 'Sample Food Item',
      confidence: 0.8,
      portion: 'medium',
      estimatedCalories: 350,
      estimatedProtein: 15,
      estimatedCarbs: 45,
      estimatedFat: 12
    }
  ]

  return {
    detectedFoods: mockFoods,
    totalNutrition: {
      calories: 350,
      protein: 15,
      carbs: 45,
      fat: 12,
      fiber: 4,
      sugar: 8,
      sodium: 500
    },
    healthScore: 70,
    suggestions: [
      'This is mock data. Configure OPENAI_API_KEY for real AI analysis.',
      'Set OPENAI_API_KEY environment variable to enable meal recognition'
    ],
    alternatives: [
      {
        name: 'Grilled chicken with vegetables',
        calories: 280,
        reason: 'Lower calories with more nutrients'
      }
    ],
    confidence: 0.5,
    mealType: 'lunch'
  }
}

export default {
  analyzeFoodImage
}
