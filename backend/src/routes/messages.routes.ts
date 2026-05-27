import { Router } from 'express';
import { z } from 'zod';
import { auth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { contactRateLimit } from '../middleware/contactRateLimit';
import { contactController, listMessages, markReadController, deleteMessageController } from '../controllers/messages.controller';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

router.post('/contact', contactRateLimit, validate(contactSchema), contactController);
router.get('/admin/messages', auth, listMessages);
router.put('/admin/messages/:id/read', auth, markReadController);
router.delete('/admin/messages/:id', auth, deleteMessageController);

export default router;
