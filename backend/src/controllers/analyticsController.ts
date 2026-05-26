import { Request, Response, NextFunction } from 'express';
import * as analyticsService from '../services/analyticsService';
import crypto from 'crypto';

export function trackView(req: Request, res: Response, next: NextFunction): void {
  try {
    const { path } = req.body;
    const userAgent = req.get('user-agent') || 'unknown';
    
    // Hash IP for GDPR compliance
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

    analyticsService.trackView(path, userAgent, ipHash);
    
    // Don't wait for db insert, respond immediately to client
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export function getDashboardStats(req: Request, res: Response, next: NextFunction): void {
  try {
    const stats = analyticsService.getDashboardStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
}
