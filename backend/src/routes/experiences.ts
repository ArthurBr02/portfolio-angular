import { Router } from 'express';
import { z } from 'zod';
import * as experienceController from '../controllers/experienceController';
import { validate } from '../middleware/validate';
import { auth } from '../middleware/auth';

const router = Router();

const experienceSchema = z.object({
  company: z.string().min(1),
  role_fr: z.string().min(1),
  role_en: z.string().min(1),
  description_fr: z.string().optional().default(''),
  description_en: z.string().optional().default(''),
  start_date: z.string().min(1),
  end_date: z.string().nullable().optional(),
  current: z.number().int().min(0).max(1).default(0),
  sort_order: z.number().int().default(0)
});

router.get('/experiences', experienceController.getAllExperiences);

router.post('/admin/experiences', auth, validate(experienceSchema), experienceController.createExperience);
router.put('/admin/experiences/:id', auth, validate(experienceSchema.partial()), experienceController.updateExperience);
router.delete('/admin/experiences/:id', auth, experienceController.deleteExperience);

export default router;
