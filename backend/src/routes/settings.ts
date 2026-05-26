import { Router } from 'express';
import { z } from 'zod';
import * as settingsController from '../controllers/settingsController';
import { validate } from '../middleware/validate';
import { auth } from '../middleware/auth';

const router = Router();

const settingsSchema = z.record(z.string(), z.string());

// Public settings (needed by frontend to know what to display)
router.get('/settings', settingsController.getAllSettings);

// Admin only
router.put('/admin/settings', auth, validate(settingsSchema), settingsController.updateSettings);

export default router;
