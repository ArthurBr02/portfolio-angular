import { Router } from 'express';
import { z } from 'zod';
import * as messageController from '../controllers/messageController';
import { validate } from '../middleware/validate';
import { contactLimiter } from '../middleware/rateLimiter';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional().default(''),
  message: z.string().min(10, 'Message must be at least 10 characters long')
});

router.post('/contact', contactLimiter, validate(contactSchema), messageController.createMessage);

export default router;
