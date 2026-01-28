import { Router } from 'express'
import { analyzeFood, quickLogMeal, getNutritionInfo, searchNutrition } from '../controllers/ai.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

// All AI routes require authentication
router.use(protect)

// POST /api/ai/analyze-food - Analyze food image
router.post('/analyze-food', analyzeFood)

// POST /api/ai/quick-log - Quick log meal from text
router.post('/quick-log', quickLogMeal)

// GET /api/ai/nutrition - Search nutrition database
router.get('/nutrition', searchNutrition)

// GET /api/ai/nutrition/:foodName - Get nutrition info
router.get('/nutrition/:foodName', getNutritionInfo)

export default router
