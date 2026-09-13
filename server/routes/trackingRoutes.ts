import { Router } from 'express';
import * as trackingController from '../controllers/trackingController.js';

const router = Router();

// Public endpoint for customer package tracking
router.get('/track/:trackingToken', trackingController.getPublicTracking);

export default router;
