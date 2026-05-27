import { db } from '../config/database';

export interface Profile {
  id: number;
  name: string | null;
  title: string | null;
  title_en: string | null;
  bio: string | null;
  bio_en: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  avatar_url: string | null;
  cv_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  available_for_work: number;
}

export function getProfile(): Profile | undefined {
  return db.prepare('SELECT * FROM profile LIMIT 1').get() as Profile | undefined;
}

export function upsertProfile(data: Partial<Profile>): void {
  const existing = getProfile();
  if (existing) {
    const fields = Object.keys(data).map(k => `${k} = ?`).join(', ');
    db.prepare(`UPDATE profile SET ${fields} WHERE id = ?`).run(...Object.values(data), existing.id);
  } else {
    const keys = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    db.prepare(`INSERT INTO profile (${keys}) VALUES (${placeholders})`).run(...Object.values(data));
  }
}
