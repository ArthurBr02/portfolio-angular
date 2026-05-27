import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { auth } from '../middleware/auth';
import { uploadController } from '../controllers/upload.controller';
import { env } from '../config/env';

const UPLOADS_DIR = env.UPLOADS_DIR || path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    const uuid = crypto.randomUUID();
    cb(null, `${uuid}${path.extname(file.originalname).toLowerCase()}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|pdf/;
    cb(null, allowed.test(path.extname(file.originalname).toLowerCase()));
  },
});

const router = Router();

router.post('/admin/upload', auth, upload.single('file'), uploadController);

const FILE_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[a-z]+$/;

router.get('/media/:file', (req, res) => {
  const { file } = req.params;
  if (!FILE_PATTERN.test(file)) {
    res.status(400).json({ error: 'Invalid file name' });
    return;
  }
  const filePath = path.join(UPLOADS_DIR, file);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  res.sendFile(filePath);
});

export default router;
