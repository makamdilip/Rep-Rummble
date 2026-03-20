import { Router } from 'express'
import {
  startConversation,
  getConversation,
  getChatHistory,
  sendMessage,
  rateConversation,
  closeConversation
} from '../controllers/chat.controller'
import { protect, optionalAuth } from '../middleware/auth.middleware'

const router = Router()

// Public routes (optional auth - works for both guests and logged-in users)
router.post('/start', optionalAuth, startConversation)
router.get('/conversation/:id', optionalAuth, getConversation)
router.post('/message', optionalAuth, sendMessage)
router.post('/rate/:conversationId', optionalAuth, rateConversation)
router.post('/close/:conversationId', optionalAuth, closeConversation)

// Protected routes (require authentication)
router.get('/history', protect, getChatHistory)

export default router
