import { Router } from 'express';
import { z } from 'zod';
import * as educationController from '../controllers/educationController';
import { validate } from '../middleware/validate';
import { auth } from '../middleware/auth';

const router = Router();

const educationSchema = z.object({
  school: z.string().min(1),
  degree_fr: z.string().min(1),
  degree_en: z.string().min(1),
  description_fr: z.string().optional().default(''),
  description_en: z.string().optional().default(''),
  start_date: z.string().min(1),
  end_date: z.string().nullable().optional(),
  sort_order: z.number().int().default(0)
});

router.get('/education', educationController.getAllEducation);

router.post('/admin/education', auth, validate(educationSchema), educationController.createEducation);
router.put('/admin/education/:id', auth, validate(educationSchema.partial()), educationController.updateEducation);
router.delete('/admin/education/:id', auth, educationController.deleteEducation);

export default router;
