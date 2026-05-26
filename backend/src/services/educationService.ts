import * as educationModel from '../models/educationModel';
import { createError } from '../middleware/errorHandler';

export function getAllEducation(): educationModel.Education[] {
  return educationModel.getAllEducation();
}

export function getEducationById(id: number): educationModel.Education {
  const education = educationModel.getEducationById(id);
  if (!education) {
    throw createError('Education not found', 404);
  }
  return education;
}

export function createEducation(data: Omit<educationModel.Education, 'id' | 'created_at' | 'updated_at'>): educationModel.Education {
  return educationModel.createEducation(data);
}

export function updateEducation(id: number, data: Partial<Omit<educationModel.Education, 'id' | 'created_at' | 'updated_at'>>): educationModel.Education {
  const education = educationModel.updateEducation(id, data);
  if (!education) {
    throw createError('Education not found', 404);
  }
  return education;
}

export function deleteEducation(id: number): void {
  const success = educationModel.deleteEducation(id);
  if (!success) {
    throw createError('Education not found', 404);
  }
}
