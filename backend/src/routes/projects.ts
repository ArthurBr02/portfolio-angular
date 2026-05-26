import { Router } from 'express';
import { z } from 'zod';
import * as projectController from '../controllers/projectController';
import { validate } from '../middleware/validate';
import { auth } from '../middleware/auth';

const router = Router();

const projectSchema = z.object({
  title_fr: z.string().min(1),
  title_en: z.string().min(1),
  description_fr: z.string().optional().default(''),
  description_en: z.string().optional().default(''),
  short_description_fr: z.string().optional().default(''),
  short_description_en: z.string().optional().default(''),
  image_url: z.string().optional().default(''),
  demo_url: z.string().optional().default(''),
  repo_url: z.string().optional().default(''),
  technologies: z.union([z.string(), z.array(z.string())]).optional().default('[]'),
  category: z.string().optional().default(''),
  sort_order: z.number().int().default(0)
});

const imageSchema = z.object({
    image_url: z.string().min(1),
    sort_order: z.number().int().default(0)
});

router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);

router.post('/admin/projects', auth, validate(projectSchema), projectController.createProject);
router.put('/admin/projects/:id', auth, validate(projectSchema.partial()), projectController.updateProject);
router.delete('/admin/projects/:id', auth, projectController.deleteProject);

router.post('/admin/projects/:id/images', auth, validate(imageSchema), projectController.addImage);
router.delete('/admin/projects/:id/images/:imageId', auth, projectController.deleteImage);

export default router;
