import getDb from '../config/database';

export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatar_url: string;
  cv_url: string;
  available_for_work: number;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  created_at: string;
  updated_at: string;
}

export function getProfile(): Profile | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM profile WHERE id = 1').get() as Profile | undefined;
}

export function updateProfile(data: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>): Profile {
  const db = getDb();
  const fields = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ');
  const values = Object.values(data);

  db.prepare(`UPDATE profile SET ${fields}, updated_at = datetime('now') WHERE id = 1`).run(...values);
  return getProfile()!;
}
