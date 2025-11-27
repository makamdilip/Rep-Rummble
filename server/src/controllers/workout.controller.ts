import { Response } from 'express'
import { Workout } from '../models/Workout.model'
import { AuthRequest } from '../middleware/auth.middleware'

// @desc    Get all workouts for user
// @route   GET /api/workouts
// @access  Private
export const getWorkouts = async (req: AuthRequest, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .limit(100)

    res.json({
      success: true,
      count: workouts.length,
      data: workouts
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}

// @desc    Create new workout
// @route   POST /api/workouts
// @access  Private
export const createWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const workoutData = {
      ...req.body,
      userId: req.user.id
    }

    const workout = await Workout.create(workoutData)

    res.status(201).json({
      success: true,
      data: workout
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}

// @desc    Get single workout
// @route   GET /api/workouts/:id
// @access  Private
export const getWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      userId: req.user.id
    })

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      })
    }

    res.json({
      success: true,
      data: workout
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}

// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Private
export const deleteWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    })

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
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
