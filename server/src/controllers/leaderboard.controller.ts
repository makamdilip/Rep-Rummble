import { Response } from 'express'
import { User } from '../models/User.model'
import { AuthRequest } from '../middleware/auth.middleware'
import { ApiError } from '../types'

// @desc    Get leaderboard
// @route   GET /api/leaderboard
// @access  Private
export const getLeaderboard = async (_req: AuthRequest, res: Response) => {
  try {
    const users = await User.find()
      .select('email displayName streak xp level')
      .sort({ xp: -1 })
      .limit(100)

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      userId: user._id,
      userName: user.displayName || user.email.split('@')[0],
      email: user.email,
      streak: user.streak,
      xp: user.xp,
      level: user.level
    }))

    return res.json({
      success: true,
      count: leaderboard.length,
      data: leaderboard
    })
  } catch (error) {
    const err = error as ApiError
    return res.status(500).json({
      success: false,
      message: err.message || 'Server error'
    })
  }
}
