import { Router } from 'express'
import { register, login, getMe, getOAuthUrl, logout, updateProfile } from '../controllers/auth.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

// Public routes
router.post('/register', register)
router.post('/login', login)

// OAuth routes (Supabase handles the callback)
router.get('/oauth/:provider', getOAuthUrl)

// Protected routes
router.get('/me', protect, getMe)
router.post('/logout', protect, logout)
router.put('/profile', protect, updateProfile)

export default router
