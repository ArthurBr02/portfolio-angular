import getDb from '../config/database';

export interface Translation {
  id: number;
  lang: 'fr' | 'en';
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export function getTranslationsByLang(lang: 'fr' | 'en'): Record<string, string> {
  const db = getDb();
  const rows = db.prepare('SELECT key, value FROM translations WHERE lang = ?').all(lang) as { key: string, value: string }[];
  
  const translations: Record<string, string> = {};
  for (const row of rows) {
    translations[row.key] = row.value;
  }
  return translations;
}

export function setTranslation(lang: 'fr' | 'en', key: string, value: string): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO translations (lang, key, value) 
    VALUES (?, ?, ?)
    ON CONFLICT(lang, key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
  `).run(lang, key, value);
}

export function deleteTranslation(lang: 'fr' | 'en', key: string): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM translations WHERE lang = ? AND key = ?').run(lang, key);
  return result.changes > 0;
}
