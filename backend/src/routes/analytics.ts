import { Router } from 'express';
import { z } from 'zod';
import * as analyticsController from '../controllers/analyticsController';
import { validate } from '../middleware/validate';
import { trackLimiter } from '../middleware/rateLimiter';
import { auth } from '../middleware/auth';

const router = Router();

const trackSchema = z.object({
  path: z.string().min(1)
});

router.post('/track', trackLimiter, validate(trackSchema), analyticsController.trackView);
router.get('/admin/analytics', auth, analyticsController.getDashboardStats);

export default router;
