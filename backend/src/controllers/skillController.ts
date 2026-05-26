import { Request, Response, NextFunction } from 'express';
import * as skillService from '../services/skillService';

export function getAllSkills(req: Request, res: Response, next: NextFunction): void {
  try {
    const skills = skillService.getAllSkills();
    res.json({ success: true, data: skills });
  } catch (err) {
    next(err);
  }
}

export function createSkill(req: Request, res: Response, next: NextFunction): void {
  try {
    const skill = skillService.createSkill(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
}

export function updateSkill(req: Request, res: Response, next: NextFunction): void {
  try {
    const skill = skillService.updateSkill(Number(req.params.id), req.body);
    res.json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
}

export function deleteSkill(req: Request, res: Response, next: NextFunction): void {
  try {
    skillService.deleteSkill(Number(req.params.id));
    res.json({ success: true, message: 'Skill deleted' });
  } catch (err) {
    next(err);
  }
}
