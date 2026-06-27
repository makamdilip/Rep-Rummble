"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkoutStats = exports.deleteWorkout = exports.getWorkout = exports.createWorkout = exports.getWorkouts = void 0;
const Workout_model_1 = require("../models/Workout.model");
// @desc    Get all workouts for user
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout_model_1.Workout.find({ userId: req.user.id })
            .sort({ timestamp: -1 })
            .limit(100);
        return res.json({
            success: true,
            count: workouts.length,
            data: workouts
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
exports.getWorkouts = getWorkouts;
// @desc    Create new workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = async (req, res) => {
    try {
        const workoutData = {
            ...req.body,
            userId: req.user.id
        };
        const workout = await Workout_model_1.Workout.create(workoutData);
        return res.status(201).json({
            success: true,
            data: workout
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
exports.createWorkout = createWorkout;
// @desc    Get single workout
// @route   GET /api/workouts/:id
// @access  Private
const getWorkout = async (req, res) => {
    try {
        const workout = await Workout_model_1.Workout.findOne({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!workout) {
            return res.status(404).json({
                success: false,
                message: 'Workout not found'
            });
        }
        return res.json({
            success: true,
            data: workout
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
exports.getWorkout = getWorkout;
// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout_model_1.Workout.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!workout) {
            return res.status(404).json({
                success: false,
                message: 'Workout not found'
            });
        }
        return res.json({
            success: true,
            data: {}
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
exports.deleteWorkout = deleteWorkout;
// @desc    Get workout stats for user
// @route   GET /api/workouts/stats
// @access  Private
const getWorkoutStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - 6);
        weekStart.setHours(0, 0, 0, 0);
        const [total, thisWeek, recentWorkouts] = await Promise.all([
            Workout_model_1.Workout.countDocuments({ userId }),
            Workout_model_1.Workout.countDocuments({ userId, timestamp: { $gte: weekStart } }),
            Workout_model_1.Workout.find({ userId }).sort({ timestamp: -1 }).limit(7),
        ]);
        const totalCalories = recentWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0);
        const avgDuration = recentWorkouts.length
            ? Math.round(recentWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) / recentWorkouts.length)
            : 0;
        // Build weekly load array (last 7 days)
        const weeklyLoad = Array(7).fill(0);
        recentWorkouts.forEach((w) => {
            const daysAgo = Math.floor((now.getTime() - new Date(w.timestamp).getTime()) / 86400000);
            if (daysAgo < 7)
                weeklyLoad[6 - daysAgo] += w.duration || 0;
        });
        return res.json({
            success: true,
            data: {
                total,
                thisWeek,
                totalCalories,
                avgDuration,
                weeklyLoad,
                consistency: Math.min(100, Math.round((thisWeek / 5) * 100)),
            },
        });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ success: false, message: err.message || 'Server error' });
    }
};
exports.getWorkoutStats = getWorkoutStats;
//# sourceMappingURL=workout.controller.js.map