"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exercise_controller_1 = require("../controllers/exercise.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_middleware_1.protect);
// ==================== WORKOUT PLANS ====================
// GET /api/workout-plans - Get user's workout plans
router.get('/', exercise_controller_1.getWorkoutPlans);
// POST /api/workout-plans/generate - Generate AI workout plan
router.post('/generate', exercise_controller_1.generateWorkoutPlanController);
// GET /api/workout-plans/:id - Get single workout plan
router.get('/:id', exercise_controller_1.getWorkoutPlan);
// DELETE /api/workout-plans/:id - Delete workout plan
router.delete('/:id', exercise_controller_1.deleteWorkoutPlan);
// ==================== WORKOUT SESSIONS ====================
// GET /api/workout-plans/sessions - Get workout session history
router.get('/sessions/history', exercise_controller_1.getWorkoutSessions);
// POST /api/workout-plans/sessions - Start a workout session
router.post('/sessions', exercise_controller_1.startWorkoutSession);
// PUT /api/workout-plans/sessions/:id - Update workout session
router.put('/sessions/:id', exercise_controller_1.updateWorkoutSession);
exports.default = router;
//# sourceMappingURL=workoutPlan.routes.js.map