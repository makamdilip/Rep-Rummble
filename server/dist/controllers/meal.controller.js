"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMealStats = exports.deleteMeal = exports.getMeal = exports.createMeal = exports.getMeals = void 0;
const Meal_model_1 = require("../models/Meal.model");
// @desc    Get all meals for user
// @route   GET /api/meals
// @access  Private
const getMeals = async (req, res) => {
    try {
        const meals = await Meal_model_1.Meal.find({ userId: req.user.id })
            .sort({ timestamp: -1 })
            .limit(100);
        return res.json({
            success: true,
            count: meals.length,
            data: meals
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
exports.getMeals = getMeals;
// @desc    Create new meal
// @route   POST /api/meals
// @access  Private
const createMeal = async (req, res) => {
    try {
        const mealData = {
            ...req.body,
            userId: req.user.id
        };
        const meal = await Meal_model_1.Meal.create(mealData);
        return res.status(201).json({
            success: true,
            data: meal
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
exports.createMeal = createMeal;
// @desc    Get single meal
// @route   GET /api/meals/:id
// @access  Private
const getMeal = async (req, res) => {
    try {
        const meal = await Meal_model_1.Meal.findOne({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!meal) {
            return res.status(404).json({
                success: false,
                message: 'Meal not found'
            });
        }
        return res.json({
            success: true,
            data: meal
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
exports.getMeal = getMeal;
// @desc    Delete meal
// @route   DELETE /api/meals/:id
// @access  Private
const deleteMeal = async (req, res) => {
    try {
        const meal = await Meal_model_1.Meal.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!meal) {
            return res.status(404).json({
                success: false,
                message: 'Meal not found'
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
exports.deleteMeal = deleteMeal;
// @desc    Get meal stats for user
// @route   GET /api/meals/stats
// @access  Private
const getMealStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 6);
        const [todayMeals, weekMeals, totalMeals] = await Promise.all([
            Meal_model_1.Meal.find({ userId, timestamp: { $gte: today, $lt: tomorrow } }),
            Meal_model_1.Meal.find({ userId, timestamp: { $gte: weekStart } }),
            Meal_model_1.Meal.countDocuments({ userId }),
        ]);
        const todayCalories = todayMeals.reduce((s, m) => s + (m.calories || 0), 0);
        const todayProtein = todayMeals.reduce((s, m) => s + (m.protein || 0), 0);
        const todayCarbs = todayMeals.reduce((s, m) => s + (m.carbs || 0), 0);
        const todayFat = todayMeals.reduce((s, m) => s + (m.fat || 0), 0);
        const weekCalories = weekMeals.reduce((s, m) => s + (m.calories || 0), 0);
        const avgDailyCalories = weekMeals.length ? Math.round(weekCalories / 7) : 0;
        const totalMacros = todayCalories
            ? {
                protein: Math.round((todayProtein * 4 / todayCalories) * 100),
                carbs: Math.round((todayCarbs * 4 / todayCalories) * 100),
                fat: Math.round((todayFat * 9 / todayCalories) * 100),
            }
            : { protein: 35, carbs: 40, fat: 25 };
        return res.json({
            success: true,
            data: {
                todayCalories,
                todayProtein: Math.round(todayProtein),
                todayCarbs: Math.round(todayCarbs),
                todayFat: Math.round(todayFat),
                todayMealCount: todayMeals.length,
                avgDailyCalories,
                totalMeals,
                macroSplit: totalMacros,
            },
        });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ success: false, message: err.message || 'Server error' });
    }
};
exports.getMealStats = getMealStats;
//# sourceMappingURL=meal.controller.js.map