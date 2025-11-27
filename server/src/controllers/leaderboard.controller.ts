import { Response } from 'express'
import { User } from '../models/User.model'
import { AuthRequest } from '../middleware/auth.middleware'

// @desc    Get leaderboard
// @route   GET /api/leaderboard
// @access  Private
export const getLeaderboard = async (req: AuthRequest, res: Response) => {
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

    res.json({
      success: true,
      count: leaderboard.length,
      data: leaderboard
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}
