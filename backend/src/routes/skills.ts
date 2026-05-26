import { Router } from 'express';
import { z } from 'zod';
import * as skillController from '../controllers/skillController';
import { validate } from '../middleware/validate';
import { auth } from '../middleware/auth';

const router = Router();

const skillSchema = z.object({
  name: z.string().min(1),
  icon: z.string().optional().default(''),
  category_fr: z.string().min(1),
  category_en: z.string().min(1),
  level: z.number().int().min(0).max(100).default(50),
  sort_order: z.number().int().default(0)
});

router.get('/skills', skillController.getAllSkills);

router.post('/admin/skills', auth, validate(skillSchema), skillController.createSkill);
router.put('/admin/skills/:id', auth, validate(skillSchema.partial()), skillController.updateSkill);
router.delete('/admin/skills/:id', auth, skillController.deleteSkill);

export default router;
