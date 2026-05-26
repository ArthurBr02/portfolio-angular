import getDb from '../config/database';

export interface Experience {
  id: number;
  company: string;
  role_fr: string;
  role_en: string;
  description_fr: string;
  description_en: string;
  start_date: string;
  end_date: string | null;
  current: number; // 0 or 1
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function getAllExperiences(): Experience[] {
  const db = getDb();
  return db.prepare('SELECT * FROM experiences ORDER BY sort_order ASC').all() as Experience[];
}

export function getExperienceById(id: number): Experience | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM experiences WHERE id = ?').get(id) as Experience | undefined;
}

export function createExperience(data: Omit<Experience, 'id' | 'created_at' | 'updated_at'>): Experience {
  const db = getDb();
  const fields = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);

  const result = db.prepare(`INSERT INTO experiences (${fields}) VALUES (${placeholders})`).run(...values);
  return getExperienceById(result.lastInsertRowid as number)!;
}

export function updateExperience(id: number, data: Partial<Omit<Experience, 'id' | 'created_at' | 'updated_at'>>): Experience | undefined {
  const db = getDb();
  const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(data), id];

  const result = db.prepare(`UPDATE experiences SET ${fields}, updated_at = datetime('now') WHERE id = ?`).run(...values);
  if (result.changes === 0) return undefined;
  return getExperienceById(id);
}

export function deleteExperience(id: number): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM experiences WHERE id = ?').run(id);
  return result.changes > 0;
}
