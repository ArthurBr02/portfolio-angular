import getDb from '../config/database';

export interface Setting {
  key: string;
  value: string;
  updated_at: string;
}

export function getAllSettings(): Record<string, string> {
  const db = getDb();
  const rows = db.prepare('SELECT key, value FROM settings').all() as { key: string, value: string }[];
  
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return settings;
}

export function getSetting(key: string): string | undefined {
  const db = getDb();
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key) as { value: string } | undefined;
  return row?.value;
}

export function updateSettings(updates: Record<string, string>): void {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO settings (key, value) 
    VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
  `);

  const transaction = db.transaction((settingsObj: Record<string, string>) => {
    for (const [key, value] of Object.entries(settingsObj)) {
      stmt.run(key, value);
    }
  });

  transaction(updates);
}
