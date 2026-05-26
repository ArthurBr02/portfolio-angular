import * as skillModel from '../models/skillModel';
import { createError } from '../middleware/errorHandler';

export function getAllSkills(): skillModel.Skill[] {
  return skillModel.getAllSkills();
}

export function getSkillById(id: number): skillModel.Skill {
  const skill = skillModel.getSkillById(id);
  if (!skill) {
    throw createError('Skill not found', 404);
  }
  return skill;
}

export function createSkill(data: Omit<skillModel.Skill, 'id' | 'created_at' | 'updated_at'>): skillModel.Skill {
  return skillModel.createSkill(data);
}

export function updateSkill(id: number, data: Partial<Omit<skillModel.Skill, 'id' | 'created_at' | 'updated_at'>>): skillModel.Skill {
  const skill = skillModel.updateSkill(id, data);
  if (!skill) {
    throw createError('Skill not found', 404);
  }
  return skill;
}

export function deleteSkill(id: number): void {
  const success = skillModel.deleteSkill(id);
  if (!success) {
    throw createError('Skill not found', 404);
  }
}
