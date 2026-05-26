import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { getUploadsDir } from '../services/uploadService';
import { createError } from '../middleware/errorHandler';

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, getUploadsDir());
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed.'));
        }
    }
}).single('file');

export function uploadFile(req: Request, res: Response, next: NextFunction): void {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(createError(err.message, 400));
    } else if (err) {
      return next(createError(err.message, 400));
    }

    if (!req.file) {
      return next(createError('No file provided', 400));
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ success: true, data: { url: fileUrl } });
  });
}
