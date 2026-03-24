import { Response } from 'express'
import { User } from '../models/User.model'
import { AuthRequest } from '../middleware/auth.middleware'
import { ApiError } from '../types'

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id)

    return res.json({
      success: true,
      data: user
    })
  } catch (error) {
    const err = error as ApiError
    return res.status(500).json({
      success: false,
      message: err.message || 'Server error'
    })
  }
}

// @desc    Search users
// @route   GET /api/users/search
// @access  Private
export const searchUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query;
    const currentUserId = req.user?.id;

    if (!q || typeof q !== "string" || q.length < 2) {
      return res.json({
        success: true,
        users: [],
      });
    }

    // Search users by display name or email, excluding current user
    const users = await User.find({
      _id: { $ne: currentUserId },
      $or: [
        { displayName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    })
      .select("displayName email")
      .limit(20);

    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    const err = error as ApiError;
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};
