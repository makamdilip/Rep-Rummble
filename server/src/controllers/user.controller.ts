import { Response } from 'express'
import { User } from '../models/User.model'
import { AuthRequest } from '../middleware/auth.middleware'

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id)

    res.json({
      success: true,
      data: user
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { displayName, streak, xp } = req.body

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { displayName, streak, xp },
      { new: true, runValidators: true }
    )

    res.json({
      success: true,
      data: user
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}
