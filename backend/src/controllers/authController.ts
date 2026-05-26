import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req: Request, res: Response): Promise<void> {
    // Requires auth middleware to be executed first
    res.json({
        success: true,
        data: {
            id: (req as any).userId,
            username: (req as any).username
        }
    });
}
