import { Request, Response, NextFunction } from 'express';
import * as educationService from '../services/educationService';

export function getAllEducation(req: Request, res: Response, next: NextFunction): void {
  try {
    const education = educationService.getAllEducation();
    res.json({ success: true, data: education });
  } catch (err) {
    next(err);
  }
}

export function createEducation(req: Request, res: Response, next: NextFunction): void {
  try {
    const education = educationService.createEducation(req.body);
    res.status(201).json({ success: true, data: education });
  } catch (err) {
    next(err);
  }
}

export function updateEducation(req: Request, res: Response, next: NextFunction): void {
  try {
    const education = educationService.updateEducation(Number(req.params.id), req.body);
    res.json({ success: true, data: education });
  } catch (err) {
    next(err);
  }
}

export function deleteEducation(req: Request, res: Response, next: NextFunction): void {
  try {
    educationService.deleteEducation(Number(req.params.id));
    res.json({ success: true, message: 'Education deleted' });
  } catch (err) {
    next(err);
  }
}
