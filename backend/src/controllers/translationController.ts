import { Request, Response, NextFunction } from 'express';
import * as translationService from '../services/translationService';

export function getTranslations(req: Request, res: Response, next: NextFunction): void {
  try {
    const lang = req.params.lang as 'fr' | 'en';
    if (lang !== 'fr' && lang !== 'en') {
       res.status(400).json({ success: false, message: 'Invalid language' });
       return;
    }
    const translations = translationService.getTranslations(lang);
    res.json({ success: true, data: translations });
  } catch (err) {
    next(err);
  }
}

export function updateTranslations(req: Request, res: Response, next: NextFunction): void {
  try {
    const lang = req.params.lang as 'fr' | 'en';
    if (lang !== 'fr' && lang !== 'en') {
       res.status(400).json({ success: false, message: 'Invalid language' });
       return;
    }
    const translations = translationService.updateTranslations(lang, req.body);
    res.json({ success: true, data: translations });
  } catch (err) {
    next(err);
  }
}
