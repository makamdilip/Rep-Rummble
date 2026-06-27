"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const wearable_controller_1 = require("../controllers/wearable.controller");
const router = (0, express_1.Router)();
// All wearable routes require authentication
router.use(auth_middleware_1.protect);
// Sync wearable data from mobile app
router.post('/sync', wearable_controller_1.syncWearableData);
// Get wearable data history
router.get('/data', wearable_controller_1.getWearableData);
// Get latest health metrics
router.get('/metrics', wearable_controller_1.getLatestHealthMetrics);
exports.default = router;
//# sourceMappingURL=wearable.routes.js.map