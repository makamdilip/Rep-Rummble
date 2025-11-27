import { Response } from 'express'
import { Meal } from '../models/Meal.model'
import { AuthRequest } from '../middleware/auth.middleware'

// @desc    Get all meals for user
// @route   GET /api/meals
// @access  Private
export const getMeals = async (req: AuthRequest, res: Response) => {
  try {
    const meals = await Meal.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .limit(100)

    res.json({
      success: true,
      count: meals.length,
      data: meals
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}

// @desc    Create new meal
// @route   POST /api/meals
// @access  Private
export const createMeal = async (req: AuthRequest, res: Response) => {
  try {
    const mealData = {
      ...req.body,
      userId: req.user.id
    }

    const meal = await Meal.create(mealData)

    res.status(201).json({
      success: true,
      data: meal
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}

// @desc    Get single meal
// @route   GET /api/meals/:id
// @access  Private
export const getMeal = async (req: AuthRequest, res: Response) => {
  try {
    const meal = await Meal.findOne({
      _id: req.params.id,
      userId: req.user.id
    })

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      })
    }

    res.json({
      success: true,
      data: meal
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}

// @desc    Delete meal
// @route   DELETE /api/meals/:id
// @access  Private
export const deleteMeal = async (req: AuthRequest, res: Response) => {
  try {
    const meal = await Meal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    })

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      })
    }

    res.json({
      success: true,
      data: {}
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}
