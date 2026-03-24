import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  syncWearableData,
  getWearableData,
  getLatestHealthMetrics,
} from '../controllers/wearable.controller';

const router = Router();

// All wearable routes require authentication
router.use(authMiddleware);

// Sync wearable data from mobile app
router.post('/sync', syncWearableData);

// Get wearable data history
router.get('/data', getWearableData);

// Get latest health metrics
router.get('/metrics', getLatestHealthMetrics);

export default router;