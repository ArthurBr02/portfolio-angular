import * as experienceModel from '../models/experienceModel';
import { createError } from '../middleware/errorHandler';

export function getAllExperiences(): experienceModel.Experience[] {
  return experienceModel.getAllExperiences();
}

export function getExperienceById(id: number): experienceModel.Experience {
  const experience = experienceModel.getExperienceById(id);
  if (!experience) {
    throw createError('Experience not found', 404);
  }
  return experience;
}

export function createExperience(data: Omit<experienceModel.Experience, 'id' | 'created_at' | 'updated_at'>): experienceModel.Experience {
  return experienceModel.createExperience(data);
}

export function updateExperience(id: number, data: Partial<Omit<experienceModel.Experience, 'id' | 'created_at' | 'updated_at'>>): experienceModel.Experience {
  const experience = experienceModel.updateExperience(id, data);
  if (!experience) {
    throw createError('Experience not found', 404);
  }
  return experience;
}

export function deleteExperience(id: number): void {
  const success = experienceModel.deleteExperience(id);
  if (!success) {
    throw createError('Experience not found', 404);
  }
}
