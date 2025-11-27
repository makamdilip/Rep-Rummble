import { Router } from 'express'
import { getLeaderboard } from '../controllers/leaderboard.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

router.use(protect) // All routes require authentication

router.get('/', getLeaderboard)

export default router
