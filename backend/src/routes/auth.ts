import { Router } from 'express';
import { z } from 'zod';
import * as authController from '../controllers/authController';
import { validate } from '../middleware/validate';
import { authLimiter } from '../middleware/rateLimiter';
import { auth } from '../middleware/auth';

const router = Router();

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
});

router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.get('/me', auth, authController.getMe);

export default router;
