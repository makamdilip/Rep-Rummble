"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = exports.updateProfile = exports.getProfile = void 0;
const User_model_1 = require("../models/User.model");
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        const user = await User_model_1.User.findById(req.user?.id);
        return res.json({
            success: true,
            data: user
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
exports.getProfile = getProfile;
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const allowed = ['displayName', 'streak', 'xp', 'level'];
        const updates = {};
        for (const key of allowed) {
            if (req.body[key] !== undefined)
                updates[key] = req.body[key];
        }
        const user = await User_model_1.User.findByIdAndUpdate(req.user?.id, { $set: updates }, { new: true, runValidators: true });
        return res.json({ success: true, data: user });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ success: false, message: err.message || 'Server error' });
    }
};
exports.updateProfile = updateProfile;
// @desc    Search users
// @route   GET /api/users/search
// @access  Private
const searchUsers = async (req, res) => {
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
        const users = await User_model_1.User.find({
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
    }
    catch (error) {
        const err = error;
        return res.status(500).json({
            success: false,
            message: err.message || "Server error",
        });
    }
};
exports.searchUsers = searchUsers;
//# sourceMappingURL=user.controller.js.map