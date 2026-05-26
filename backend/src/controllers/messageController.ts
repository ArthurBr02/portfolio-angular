import { Request, Response, NextFunction } from 'express';
import * as messageService from '../services/messageService';

export function getAllMessages(req: Request, res: Response, next: NextFunction): void {
  try {
    const messages = messageService.getAllMessages();
    res.json({ success: true, data: messages });
  } catch (err) {
    next(err);
  }
}

export async function createMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const message = await messageService.createMessage(req.body);
    res.status(201).json({ success: true, data: message });
  } catch (err) {
    next(err);
  }
}

export function markAsRead(req: Request, res: Response, next: NextFunction): void {
  try {
    messageService.markMessageAsRead(Number(req.params.id));
    res.json({ success: true, message: 'Message marked as read' });
  } catch (err) {
    next(err);
  }
}

export function deleteMessage(req: Request, res: Response, next: NextFunction): void {
  try {
    messageService.deleteMessage(Number(req.params.id));
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
}

export function getUnreadCount(req: Request, res: Response, next: NextFunction): void {
    try {
        const count = messageService.getUnreadCount();
        res.json({ success: true, data: count });
    } catch (err) {
        next(err);
    }
}
