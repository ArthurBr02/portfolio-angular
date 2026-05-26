import getDb from '../config/database';

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: number; // 0 or 1
  created_at: string;
}

export function getAllMessages(): Message[] {
  const db = getDb();
  return db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all() as Message[];
}

export function getMessageById(id: number): Message | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM messages WHERE id = ?').get(id) as Message | undefined;
}

export function getUnreadCount(): number {
  const db = getDb();
  const row = db.prepare('SELECT COUNT(*) as count FROM messages WHERE is_read = 0').get() as { count: number };
  return row.count;
}

export function createMessage(data: Omit<Message, 'id' | 'is_read' | 'created_at'>): Message {
  const db = getDb();
  const fields = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);

  const result = db.prepare(`INSERT INTO messages (${fields}) VALUES (${placeholders})`).run(...values);
  return getMessageById(result.lastInsertRowid as number)!;
}

export function markMessageAsRead(id: number): boolean {
  const db = getDb();
  const result = db.prepare('UPDATE messages SET is_read = 1 WHERE id = ?').run(id);
  return result.changes > 0;
}

export function deleteMessage(id: number): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM messages WHERE id = ?').run(id);
  return result.changes > 0;
}
