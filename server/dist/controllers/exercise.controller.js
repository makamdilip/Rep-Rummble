"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormFeedback = exports.analyzeExerciseForm = exports.getWorkoutSessions = exports.updateWorkoutSession = exports.startWorkoutSession = exports.deleteWorkoutPlan = exports.generateWorkoutPlanController = exports.getWorkoutPlan = exports.getWorkoutPlans = exports.seedDefaultExercises = exports.generateExercise = exports.getExercise = exports.getExercises = void 0;
const Exercise_model_1 = require("../models/Exercise.model");
const WorkoutPlan_model_1 = require("../models/WorkoutPlan.model");
const WorkoutSession_model_1 = require("../models/WorkoutSession.model");
const exercise_service_1 = require("../services/exercise.service");
const pose_service_1 = require("../services/pose.service");
/**
 * @route   GET /api/exercises
 * @desc    Get all exercises with optional filters
 * @access  Private
 */
const getExercises = async (req, res) => {
    try {
        const { category, difficulty, muscleGroup, equipment, search } = req.query;
        const filter = { isActive: true };
        if (category)
            filter.category = category;
        if (difficulty)
            filter.difficulty = difficulty;
        if (muscleGroup)
            filter.muscleGroups = { $in: [muscleGroup] };
        if (equipment)
            filter.equipment = { $in: [equipment] };
        if (search) {
            filter.$text = { $search: search };
        }
        const exercises = await Exercise_model_1.Exercise.find(filter)
            .select('-poseKeypoints -animationData')
            .sort({ name: 1 });
        res.status(200).json({
            success: true,
            count: exercises.length,
            data: exercises
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch exercises'
        });
    }
};
exports.getExercises = getExercises;
/**
 * @route   GET /api/exercises/:id
 * @desc    Get single exercise with full details
 * @access  Private
 */
const getExercise = async (req, res) => {
    try {
        const exercise = await Exercise_model_1.Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: exercise
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch exercise'
        });
    }
};
exports.getExercise = getExercise;
/**
 * @route   POST /api/exercises/generate
 * @desc    Generate a new exercise using AI
 * @access  Private (Admin)
 */
const generateExercise = async (req, res) => {
    try {
        const { name, category, difficulty, muscleGroups, equipment } = req.body;
        if (!name || !category || !difficulty || !muscleGroups) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: name, category, difficulty, muscleGroups'
            });
        }
        const exerciseData = await (0, exercise_service_1.generateExerciseWithAI)({
            name,
            category,
            difficulty,
            muscleGroups,
            equipment
        });
        const exercise = new Exercise_model_1.Exercise(exerciseData);
        await exercise.save();
        return res.status(201).json({
            success: true,
            data: exercise
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate exercise'
        });
    }
};
exports.generateExercise = generateExercise;
/**
 * @route   POST /api/exercises/seed
 * @desc    Seed default exercises into database
 * @access  Private (Admin)
 */
const seedDefaultExercises = async (_req, res) => {
    try {
        await (0, exercise_service_1.seedExercises)();
        const count = await Exercise_model_1.Exercise.countDocuments();
        res.status(200).json({
            success: true,
            message: `Database seeded with exercises`,
            count
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to seed exercises'
        });
    }
};
exports.seedDefaultExercises = seedDefaultExercises;
/**
 * @route   GET /api/workout-plans
 * @desc    Get user's workout plans
 * @access  Private
 */
const getWorkoutPlans = async (req, res) => {
    try {
        const userId = req.user._id;
        const plans = await WorkoutPlan_model_1.WorkoutPlan.find({ userId })
            .select('-schedule.exercises.repsAnalysis')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: plans.length,
            data: plans
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch workout plans'
        });
    }
};
exports.getWorkoutPlans = getWorkoutPlans;
/**
 * @route   GET /api/workout-plans/:id
 * @desc    Get single workout plan with full details
 * @access  Private
 */
const getWorkoutPlan = async (req, res) => {
    try {
        const userId = req.user._id;
        const plan = await WorkoutPlan_model_1.WorkoutPlan.findOne({
            _id: req.params.id,
            userId
        });
        if (!plan) {
            return res.status(404).json({
                success: false,
                message: 'Workout plan not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: plan
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch workout plan'
        });
    }
};
exports.getWorkoutPlan = getWorkoutPlan;
/**
 * @route   POST /api/workout-plans/generate
 * @desc    Generate a personalized workout plan using AI
 * @access  Private
 */
const generateWorkoutPlanController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { goal, fitnessLevel, durationWeeks, daysPerWeek, minutesPerWorkout, availableEquipment, focusAreas, injuries } = req.body;
        // Validate required fields
        if (!goal || !fitnessLevel) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: goal, fitnessLevel'
            });
        }
        const plan = await (0, exercise_service_1.generateWorkoutPlan)({
            userId: userId.toString(),
            goal,
            fitnessLevel,
            durationWeeks: durationWeeks || 4,
            daysPerWeek: daysPerWeek || 3,
            minutesPerWorkout: minutesPerWorkout || 45,
            availableEquipment: availableEquipment || ['bodyweight'],
            focusAreas,
            injuries
        });
        return res.status(201).json({
            success: true,
            data: plan
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate workout plan'
        });
    }
};
exports.generateWorkoutPlanController = generateWorkoutPlanController;
/**
 * @route   DELETE /api/workout-plans/:id
 * @desc    Delete a workout plan
 * @access  Private
 */
const deleteWorkoutPlan = async (req, res) => {
    try {
        const userId = req.user._id;
        const plan = await WorkoutPlan_model_1.WorkoutPlan.findOneAndDelete({
            _id: req.params.id,
            userId
        });
        if (!plan) {
            return res.status(404).json({
                success: false,
                message: 'Workout plan not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Workout plan deleted'
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete workout plan'
        });
    }
};
exports.deleteWorkoutPlan = deleteWorkoutPlan;
/**
 * @route   POST /api/workout-sessions
 * @desc    Start a new workout session
 * @access  Private
 */
const startWorkoutSession = async (req, res) => {
    try {
        const userId = req.user._id;
        const { workoutPlanId, name, exercises } = req.body;
        const session = new WorkoutSession_model_1.WorkoutSession({
            userId,
            workoutPlanId,
            name: name || 'Quick Workout',
            type: workoutPlanId ? 'planned' : 'quick',
            exercises: exercises || [],
            status: 'in_progress',
            startTime: new Date()
        });
        await session.save();
        res.status(201).json({
            success: true,
            data: session
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to start workout session'
        });
    }
};
exports.startWorkoutSession = startWorkoutSession;
/**
 * @route   PUT /api/workout-sessions/:id
 * @desc    Update workout session (add exercise, complete session)
 * @access  Private
 */
const updateWorkoutSession = async (req, res) => {
    try {
        const userId = req.user._id;
        const { exercises, status, userNotes } = req.body;
        const session = await WorkoutSession_model_1.WorkoutSession.findOne({
            _id: req.params.id,
            userId
        });
        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Workout session not found'
            });
        }
        if (exercises) {
            session.exercises = exercises;
        }
        if (status) {
            session.status = status;
            if (status === 'completed') {
                session.endTime = new Date();
                session.totalDuration = Math.round((session.endTime.getTime() - session.startTime.getTime()) / 60000);
            }
        }
        if (userNotes) {
            session.userNotes = userNotes;
        }
        await session.save();
        return res.status(200).json({
            success: true,
            data: session
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to update workout session'
        });
    }
};
exports.updateWorkoutSession = updateWorkoutSession;
/**
 * @route   GET /api/workout-sessions
 * @desc    Get user's workout session history
 * @access  Private
 */
const getWorkoutSessions = async (req, res) => {
    try {
        const userId = req.user._id;
        const { status, limit = 20 } = req.query;
        const filter = { userId };
        if (status)
            filter.status = status;
        const sessions = await WorkoutSession_model_1.WorkoutSession.find(filter)
            .select('-exercises.repsAnalysis')
            .sort({ startTime: -1 })
            .limit(Number(limit));
        res.status(200).json({
            success: true,
            count: sessions.length,
            data: sessions
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch workout sessions'
        });
    }
};
exports.getWorkoutSessions = getWorkoutSessions;
/**
 * @route   POST /api/exercises/analyze-form
 * @desc    Analyze exercise form from pose keypoints
 * @access  Private
 */
const analyzeExerciseForm = async (req, res) => {
    try {
        const { exerciseSlug, keypoints, phase } = req.body;
        if (!exerciseSlug || !keypoints) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: exerciseSlug, keypoints'
            });
        }
        const analysis = (0, pose_service_1.analyzeForm)(exerciseSlug, keypoints, phase || 'middle');
        return res.status(200).json({
            success: true,
            data: analysis
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to analyze form'
        });
    }
};
exports.analyzeExerciseForm = analyzeExerciseForm;
/**
 * @route   POST /api/exercises/form-feedback
 * @desc    Generate form feedback summary from multiple rep analyses
 * @access  Private
 */
const getFormFeedback = async (req, res) => {
    try {
        const { analyses } = req.body;
        if (!analyses || !Array.isArray(analyses)) {
            return res.status(400).json({
                success: false,
                message: 'Missing required field: analyses (array)'
            });
        }
        const feedback = (0, pose_service_1.generateFormFeedback)(analyses);
        return res.status(200).json({
            success: true,
            data: feedback
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate feedback'
        });
    }
};
exports.getFormFeedback = getFormFeedback;
//# sourceMappingURL=exercise.controller.js.map