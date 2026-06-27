import { Router } from 'express'
import { getProfile, updateProfile } from '../controllers/user.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

router.use(protect) // All routes require authentication

router.get('/profile', getProfile)
router.put('/profile', updateProfile)

export default router
