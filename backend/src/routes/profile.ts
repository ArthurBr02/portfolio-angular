import { Router } from 'express';
import { z } from 'zod';
import * as profileController from '../controllers/profileController';
import { validate } from '../middleware/validate';
import { auth } from '../middleware/auth';

const router = Router();

const profileUpdateSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  avatar_url: z.string().optional(),
  cv_url: z.string().optional(),
  available_for_work: z.number().int().min(0).max(1).optional(),
  github_url: z.string().optional(),
  linkedin_url: z.string().optional(),
  twitter_url: z.string().optional()
});

router.get('/profile', profileController.getProfile);
router.put('/admin/profile', auth, validate(profileUpdateSchema), profileController.updateProfile);

export default router;
