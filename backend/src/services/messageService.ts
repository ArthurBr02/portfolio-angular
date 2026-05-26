import * as messageModel from '../models/messageModel';
import { createError } from '../middleware/errorHandler';
import nodemailer from 'nodemailer';
import { env } from '../config/env';

export function getAllMessages(): messageModel.Message[] {
  return messageModel.getAllMessages();
}

export function getMessageById(id: number): messageModel.Message {
  const message = messageModel.getMessageById(id);
  if (!message) {
    throw createError('Message not found', 404);
  }
  return message;
}

export async function createMessage(data: Omit<messageModel.Message, 'id' | 'is_read' | 'created_at'>): Promise<messageModel.Message> {
  const message = messageModel.createMessage(data);
  
  // Try to send notification email, but don't fail if it doesn't work
  try {
      if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.NOTIFICATION_EMAIL) {
          const transporter = nodemailer.createTransport({
            host: env.SMTP_HOST,
            port: env.SMTP_PORT,
            secure: env.SMTP_SECURE,
            auth: {
                user: env.SMTP_USER,
                pass: env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
              from: `"Portfolio Contact" <${env.SMTP_USER}>`,
              to: env.NOTIFICATION_EMAIL,
              subject: `New Portfolio Message: ${message.subject || 'No Subject'}`,
              text: `You have received a new message from ${message.name} (${message.email}):\n\n${message.message}`
          });
      }
  } catch (err) {
      console.error('Failed to send notification email:', err);
  }

  return message;
}

export function markMessageAsRead(id: number): void {
  const success = messageModel.markMessageAsRead(id);
  if (!success) {
    throw createError('Message not found', 404);
  }
}

export function deleteMessage(id: number): void {
  const success = messageModel.deleteMessage(id);
  if (!success) {
    throw createError('Message not found', 404);
  }
}

export function getUnreadCount(): number {
    return messageModel.getUnreadCount();
}
