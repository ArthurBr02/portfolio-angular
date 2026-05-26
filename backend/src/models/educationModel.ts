import getDb from '../config/database';

export interface Education {
  id: number;
  school: string;
  degree_fr: string;
  degree_en: string;
  description_fr: string;
  description_en: string;
  start_date: string;
  end_date: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function getAllEducation(): Education[] {
  const db = getDb();
  return db.prepare('SELECT * FROM education ORDER BY sort_order ASC').all() as Education[];
}

export function getEducationById(id: number): Education | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM education WHERE id = ?').get(id) as Education | undefined;
}

export function createEducation(data: Omit<Education, 'id' | 'created_at' | 'updated_at'>): Education {
  const db = getDb();
  const fields = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);

  const result = db.prepare(`INSERT INTO education (${fields}) VALUES (${placeholders})`).run(...values);
  return getEducationById(result.lastInsertRowid as number)!;
}

export function updateEducation(id: number, data: Partial<Omit<Education, 'id' | 'created_at' | 'updated_at'>>): Education | undefined {
  const db = getDb();
  const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(data), id];

  const result = db.prepare(`UPDATE education SET ${fields}, updated_at = datetime('now') WHERE id = ?`).run(...values);
  if (result.changes === 0) return undefined;
  return getEducationById(id);
}

export function deleteEducation(id: number): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM education WHERE id = ?').run(id);
  return result.changes > 0;
}
