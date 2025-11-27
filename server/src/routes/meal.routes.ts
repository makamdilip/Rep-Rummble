import { Router } from 'express'
import { getMeals, createMeal, getMeal, deleteMeal } from '../controllers/meal.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

router.use(protect) // All routes require authentication

router.route('/')
  .get(getMeals)
  .post(createMeal)

router.route('/:id')
  .get(getMeal)
  .delete(deleteMeal)

export default router
