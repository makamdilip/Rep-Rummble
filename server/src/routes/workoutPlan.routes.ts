import { Router } from 'express'
import {
  getWorkoutPlans,
  getWorkoutPlan,
  generateWorkoutPlanController,
  deleteWorkoutPlan,
  startWorkoutSession,
  updateWorkoutSession,
  getWorkoutSessions
} from '../controllers/exercise.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

// All routes require authentication
router.use(protect)

// ==================== WORKOUT PLANS ====================

// GET /api/workout-plans - Get user's workout plans
router.get('/', getWorkoutPlans)

// POST /api/workout-plans/generate - Generate AI workout plan
router.post('/generate', generateWorkoutPlanController)

// GET /api/workout-plans/:id - Get single workout plan
router.get('/:id', getWorkoutPlan)

// DELETE /api/workout-plans/:id - Delete workout plan
router.delete('/:id', deleteWorkoutPlan)

// ==================== WORKOUT SESSIONS ====================

// GET /api/workout-plans/sessions - Get workout session history
router.get('/sessions/history', getWorkoutSessions)

// POST /api/workout-plans/sessions - Start a workout session
router.post('/sessions', startWorkoutSession)

// PUT /api/workout-plans/sessions/:id - Update workout session
router.put('/sessions/:id', updateWorkoutSession)

export default router
