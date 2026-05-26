import { Request, Response, NextFunction } from 'express';
import * as settingsService from '../services/settingsService';

export function getAllSettings(req: Request, res: Response, next: NextFunction): void {
  try {
    const settings = settingsService.getAllSettings();
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
}

export function updateSettings(req: Request, res: Response, next: NextFunction): void {
  try {
    const settings = settingsService.updateSettings(req.body);
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
}
