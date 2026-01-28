import { Request, Response } from 'express'
import { analyzeFoodImage } from '../services/ai.service'

/**
 * @route   POST /api/ai/analyze-food
 * @desc    Analyze food image using AI
 * @access  Private
 */
export const analyzeFood = async (req: Request, res: Response) => {
  try {
    const { imageBase64, mealType } = req.body

    // Validate input
    if (!imageBase64) {
      return res.status(400).json({
        success: false,
        message: 'Image data is required'
      })
    }

    // Validate base64 format (basic check)
    if (typeof imageBase64 !== 'string' || imageBase64.length < 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image data format'
      })
    }

    // Validate meal type if provided
    const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack']
    if (mealType && !validMealTypes.includes(mealType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid meal type. Must be: breakfast, lunch, dinner, or snack'
      })
    }

    // Analyze the food image
    const analysisResult = await analyzeFoodImage(imageBase64, mealType)

    res.status(200).json({
      success: true,
      data: analysisResult
    })
  } catch (error: any) {
    console.error('Food analysis error:', error)

    // Handle specific errors
    if (error.message?.includes('API key')) {
      return res.status(503).json({
        success: false,
        message: 'AI service temporarily unavailable. Please try again later.'
      })
    }

    if (error.message?.includes('rate limit')) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a moment and try again.'
      })
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze food image'
    })
  }
}

/**
 * @route   POST /api/ai/quick-log
 * @desc    Quick log a meal from text description
 * @access  Private
 */
export const quickLogMeal = async (req: Request, res: Response) => {
  try {
    const { description, mealType } = req.body

    if (!description) {
      return res.status(400).json({
        success: false,
        message: 'Meal description is required'
      })
    }

    // For now, return a simple response
    // This can be enhanced with AI text-based food recognition
    res.status(200).json({
      success: true,
      message: 'Quick log feature coming soon',
      data: {
        description,
        mealType
      }
    })
  } catch (error: any) {
    console.error('Quick log error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process quick log'
    })
  }
}

/**
 * @route   GET /api/ai/nutrition/:foodName
 * @desc    Get nutrition info for a specific food
 * @access  Private
 */
export const getNutritionInfo = async (req: Request, res: Response) => {
  try {
    const { foodName } = req.params

    if (!foodName) {
      return res.status(400).json({
        success: false,
        message: 'Food name is required'
      })
    }

    // Placeholder - integrate with Nutritionix or local database
    res.status(200).json({
      success: true,
      message: 'Nutrition lookup feature coming soon',
      data: {
        foodName,
        // Will return detailed nutrition data
      }
    })
  } catch (error: any) {
    console.error('Nutrition lookup error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get nutrition info'
    })
  }
}
