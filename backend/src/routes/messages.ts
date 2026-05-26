import { Router } from 'express';
import * as messageController from '../controllers/messageController';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/admin/messages', auth, messageController.getAllMessages);
router.get('/admin/messages/unread-count', auth, messageController.getUnreadCount);
router.put('/admin/messages/:id/read', auth, messageController.markAsRead);
router.delete('/admin/messages/:id', auth, messageController.deleteMessage);

export default router;
