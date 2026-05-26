import { Request, Response, NextFunction } from 'express';
import * as profileService from '../services/profileService';

export function getProfile(req: Request, res: Response, next: NextFunction): void {
  try {
    const profile = profileService.getProfile();
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
}

export function updateProfile(req: Request, res: Response, next: NextFunction): void {
  try {
    const updated = profileService.updateProfile(req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}
