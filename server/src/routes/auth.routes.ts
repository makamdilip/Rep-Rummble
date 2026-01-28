import { Router } from 'express'
import { register, login, getMe } from '../controllers/auth.controller'
import { oauthCallback, startOAuth } from '../controllers/oauth.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.get('/oauth/:provider', startOAuth)
router.get('/oauth/:provider/callback', oauthCallback)

export default router
