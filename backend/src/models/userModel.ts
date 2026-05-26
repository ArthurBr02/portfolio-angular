import getDb from '../config/database';

export interface User {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

export function findUserByUsername(username: string): User | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User | undefined;
}

export function findUserById(id: number): User | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;
}

export function createUser(username: string, passwordHash: string): User {
  const db = getDb();
  const result = db
    .prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)')
    .run(username, passwordHash);
  return findUserById(result.lastInsertRowid as number)!;
}

export function userExists(): boolean {
  const db = getDb();
  const row = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  return row.count > 0;
}
