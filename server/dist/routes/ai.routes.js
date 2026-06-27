"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("../controllers/ai.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All AI routes require authentication
router.use(auth_middleware_1.protect);
// POST /api/ai/analyze-food - Analyze food image
router.post('/analyze-food', ai_controller_1.analyzeFood);
// POST /api/ai/quick-log - Quick log meal from text
router.post('/quick-log', ai_controller_1.quickLogMeal);
// GET /api/ai/nutrition - Search nutrition database
router.get('/nutrition', ai_controller_1.searchNutrition);
// GET /api/ai/nutrition/:foodName - Get nutrition info
router.get('/nutrition/:foodName', ai_controller_1.getNutritionInfo);
exports.default = router;
//# sourceMappingURL=ai.routes.js.map