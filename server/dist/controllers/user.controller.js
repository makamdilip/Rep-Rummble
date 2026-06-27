"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
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
        const { displayName, streak, xp } = req.body;
        const user = await User_model_1.User.findByIdAndUpdate(req.user?.id, { displayName, streak, xp }, { new: true, runValidators: true });
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
exports.updateProfile = updateProfile;
//# sourceMappingURL=user.controller.js.map