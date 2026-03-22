import { Router, Request, Response } from 'express'
import {
  startConversation,
  getConversation,
  getChatHistory,
  sendMessage,
  rateConversation,
  closeConversation
} from '../controllers/chat.controller'
import { protect, optionalAuth } from '../middleware/auth.middleware'
import { generateAIChatResponse, ChatHistoryMessage } from '../services/support-ai.service'

const router = Router()

// ── Simple AI chat endpoint (no DB, no socket) ──────────────
router.post('/ai', async (req: Request, res: Response) => {
  try {
    const { message, history = [] } = req.body as {
      message: string
      history: ChatHistoryMessage[]
    }

    if (!message?.trim()) {
      return res.status(400).json({ success: false, message: 'message is required' })
    }

    const result = await generateAIChatResponse(message.trim(), history.slice(-12))
    return res.json({ success: true, data: result })
  } catch (err: any) {
    console.error('Chat AI error:', err)
    return res.status(500).json({ success: false, message: 'AI service error' })
  }
})

// Legacy routes kept for compatibility
router.post('/start', optionalAuth, startConversation)
router.get('/conversation/:id', optionalAuth, getConversation)
router.post('/message', optionalAuth, sendMessage)
router.post('/rate/:conversationId', optionalAuth, rateConversation)
router.post('/close/:conversationId', optionalAuth, closeConversation)
router.get('/history', protect, getChatHistory)

export default router
