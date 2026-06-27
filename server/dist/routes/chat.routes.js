"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const support_ai_service_1 = require("../services/support-ai.service");
const router = (0, express_1.Router)();
// ── Simple AI chat endpoint (no DB, no socket) ──────────────
router.post('/ai', async (req, res) => {
    try {
        const { message, history = [] } = req.body;
        if (!message?.trim()) {
            return res.status(400).json({ success: false, message: 'message is required' });
        }
        const result = await (0, support_ai_service_1.generateAIChatResponse)(message.trim(), history.slice(-12));
        return res.json({ success: true, data: result });
    }
    catch (err) {
        console.error('Chat AI error:', err);
        return res.status(500).json({ success: false, message: 'AI service error' });
    }
});
// Legacy routes kept for compatibility
router.post('/start', auth_middleware_1.optionalAuth, chat_controller_1.startConversation);
router.get('/conversation/:id', auth_middleware_1.optionalAuth, chat_controller_1.getConversation);
router.post('/message', auth_middleware_1.optionalAuth, chat_controller_1.sendMessage);
router.post('/rate/:conversationId', auth_middleware_1.optionalAuth, chat_controller_1.rateConversation);
router.post('/close/:conversationId', auth_middleware_1.optionalAuth, chat_controller_1.closeConversation);
router.get('/history', auth_middleware_1.protect, chat_controller_1.getChatHistory);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map