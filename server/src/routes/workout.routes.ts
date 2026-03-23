import { Router } from 'express'
import { getWorkouts, createWorkout, getWorkout, deleteWorkout, getWorkoutStats } from '../controllers/workout.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

router.use(protect) // All routes require authentication

router.route('/')
  .get(getWorkouts)
  .post(createWorkout)

router.get('/stats', getWorkoutStats)

router.route('/:id')
  .get(getWorkout)
  .delete(deleteWorkout)

export default router
