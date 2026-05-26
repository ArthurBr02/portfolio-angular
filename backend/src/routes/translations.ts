import { Router } from 'express';
import { z } from 'zod';
import * as translationController from '../controllers/translationController';
import { validate } from '../middleware/validate';
import { auth } from '../middleware/auth';

const router = Router();

const translationsSchema = z.record(z.string(), z.string());

router.get('/translations/:lang', translationController.getTranslations);
router.put('/admin/translations/:lang', auth, validate(translationsSchema), translationController.updateTranslations);

export default router;
