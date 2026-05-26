import { Router } from 'express';
import * as uploadController from '../controllers/uploadController';
import { auth } from '../middleware/auth';

const router = Router();

// Only admin can upload
router.post('/admin/upload', auth, uploadController.uploadFile);

export default router;
