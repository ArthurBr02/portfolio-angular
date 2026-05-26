import getDb from '../config/database';

export interface Skill {
  id: number;
  name: string;
  icon: string;
  category_fr: string;
  category_en: string;
  level: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function getAllSkills(): Skill[] {
  const db = getDb();
  return db.prepare('SELECT * FROM skills ORDER BY sort_order ASC').all() as Skill[];
}

export function getSkillById(id: number): Skill | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM skills WHERE id = ?').get(id) as Skill | undefined;
}

export function createSkill(data: Omit<Skill, 'id' | 'created_at' | 'updated_at'>): Skill {
  const db = getDb();
  const fields = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);

  const result = db.prepare(`INSERT INTO skills (${fields}) VALUES (${placeholders})`).run(...values);
  return getSkillById(result.lastInsertRowid as number)!;
}

export function updateSkill(id: number, data: Partial<Omit<Skill, 'id' | 'created_at' | 'updated_at'>>): Skill | undefined {
  const db = getDb();
  const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(data), id];

  const result = db.prepare(`UPDATE skills SET ${fields}, updated_at = datetime('now') WHERE id = ?`).run(...values);
  if (result.changes === 0) return undefined;
  return getSkillById(id);
}

export function deleteSkill(id: number): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM skills WHERE id = ?').run(id);
  return result.changes > 0;
}
