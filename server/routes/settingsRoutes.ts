import { Router } from 'express';
import * as settingsController from '../controllers/settingsController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public read for settings (used by tracking header if needed)
router.get('/settings', settingsController.getSettings);

// Protected update
router.put('/settings', requireAdminAuth, settingsController.updateSettings);

export default router;
