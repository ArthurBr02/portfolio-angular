import { Request, Response, NextFunction } from 'express';
import * as experienceService from '../services/experienceService';

export function getAllExperiences(req: Request, res: Response, next: NextFunction): void {
  try {
    const experiences = experienceService.getAllExperiences();
    res.json({ success: true, data: experiences });
  } catch (err) {
    next(err);
  }
}

export function createExperience(req: Request, res: Response, next: NextFunction): void {
  try {
    const experience = experienceService.createExperience(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (err) {
    next(err);
  }
}

export function updateExperience(req: Request, res: Response, next: NextFunction): void {
  try {
    const experience = experienceService.updateExperience(Number(req.params.id), req.body);
    res.json({ success: true, data: experience });
  } catch (err) {
    next(err);
  }
}

export function deleteExperience(req: Request, res: Response, next: NextFunction): void {
  try {
    experienceService.deleteExperience(Number(req.params.id));
    res.json({ success: true, message: 'Experience deleted' });
  } catch (err) {
    next(err);
  }
}
