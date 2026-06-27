"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agent_controller_1 = require("../controllers/agent.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All agent routes require authentication and agent role
router.use(auth_middleware_1.protect);
router.use(auth_middleware_1.agentOnly);
// Dashboard and stats
router.get('/dashboard', agent_controller_1.getDashboard);
router.get('/analytics', agent_controller_1.getAnalytics);
// Queue management
router.get('/queue', agent_controller_1.getQueue);
router.get('/active', agent_controller_1.getActiveChats);
// Conversation management
router.get('/conversation/:id', agent_controller_1.getAgentConversation);
router.post('/claim/:conversationId', agent_controller_1.claimConversation);
router.post('/transfer/:conversationId', agent_controller_1.transferConversation);
// Agent status
router.put('/status', agent_controller_1.updateStatus);
exports.default = router;
//# sourceMappingURL=agent.routes.js.map