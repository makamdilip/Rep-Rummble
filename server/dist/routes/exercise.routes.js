"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exercise_controller_1 = require("../controllers/exercise.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_middleware_1.protect);
// ==================== EXERCISES ====================
// GET /api/exercises - Get all exercises with filters
router.get('/', exercise_controller_1.getExercises);
// POST /api/exercises/seed - Seed default exercises (run once)
router.post('/seed', exercise_controller_1.seedDefaultExercises);
// POST /api/exercises/generate - Generate new exercise with AI
router.post('/generate', exercise_controller_1.generateExercise);
// POST /api/exercises/analyze-form - Analyze form from pose data
router.post('/analyze-form', exercise_controller_1.analyzeExerciseForm);
// POST /api/exercises/form-feedback - Get feedback summary
router.post('/form-feedback', exercise_controller_1.getFormFeedback);
// GET /api/exercises/:id - Get single exercise
router.get('/:id', exercise_controller_1.getExercise);
exports.default = router;
//# sourceMappingURL=exercise.routes.js.map