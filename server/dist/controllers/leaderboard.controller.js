"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboard = void 0;
const User_model_1 = require("../models/User.model");
// @desc    Get leaderboard
// @route   GET /api/leaderboard
// @access  Private
const getLeaderboard = async (_req, res) => {
    try {
        const users = await User_model_1.User.find()
            .select('email displayName streak xp level')
            .sort({ xp: -1 })
            .limit(100);
        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            userId: user._id,
            userName: user.displayName || user.email.split('@')[0],
            email: user.email,
            streak: user.streak,
            xp: user.xp,
            level: user.level
        }));
        return res.json({
            success: true,
            count: leaderboard.length,
            data: leaderboard
        });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({
            success: false,
            message: err.message || 'Server error'
        });
    }
};
exports.getLeaderboard = getLeaderboard;
//# sourceMappingURL=leaderboard.controller.js.map