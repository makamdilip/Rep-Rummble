import { Router } from 'express'
import { getWorkouts, createWorkout, getWorkout, deleteWorkout } from '../controllers/workout.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

router.use(protect) // All routes require authentication

router.route('/')
  .get(getWorkouts)
  .post(createWorkout)

router.route('/:id')
  .get(getWorkout)
  .delete(deleteWorkout)

export default router
