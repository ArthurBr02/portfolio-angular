import getDb from '../config/database';

export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  sort_order: number;
  created_at: string;
}

export interface Project {
  id: number;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  short_description_fr: string;
  short_description_en: string;
  image_url: string;
  demo_url: string;
  repo_url: string;
  technologies: string; // JSON string
  category: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  images?: ProjectImage[]; // Optional array for the join
}

export function getAllProjects(): Project[] {
  const db = getDb();
  return db.prepare('SELECT * FROM projects ORDER BY sort_order ASC').all() as Project[];
}

export function getProjectById(id: number): Project | undefined {
  const db = getDb();
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as Project | undefined;
  if (project) {
    project.images = db.prepare('SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order ASC').all(id) as ProjectImage[];
  }
  return project;
}

export function createProject(data: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'images'>): Project {
  const db = getDb();
  const fields = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);

  const result = db.prepare(`INSERT INTO projects (${fields}) VALUES (${placeholders})`).run(...values);
  return getProjectById(result.lastInsertRowid as number)!;
}

export function updateProject(id: number, data: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at' | 'images'>>): Project | undefined {
  const db = getDb();
  const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(data), id];

  const result = db.prepare(`UPDATE projects SET ${fields}, updated_at = datetime('now') WHERE id = ?`).run(...values);
  if (result.changes === 0) return undefined;
  return getProjectById(id);
}

export function deleteProject(id: number): boolean {
  const db = getDb();
  // cascade deletion handles project_images
  const result = db.prepare('DELETE FROM projects WHERE id = ?').run(id);
  return result.changes > 0;
}

// Project Images methods
export function addProjectImage(projectId: number, imageUrl: string, sortOrder: number = 0): ProjectImage {
    const db = getDb();
    const result = db.prepare('INSERT INTO project_images (project_id, image_url, sort_order) VALUES (?, ?, ?)').run(projectId, imageUrl, sortOrder);
    return db.prepare('SELECT * FROM project_images WHERE id = ?').get(result.lastInsertRowid) as ProjectImage;
}

export function deleteProjectImage(id: number): boolean {
    const db = getDb();
    const result = db.prepare('DELETE FROM project_images WHERE id = ?').run(id);
    return result.changes > 0;
}

export function updateProjectImagesOrder(updates: {id: number, sort_order: number}[]): void {
    const db = getDb();
    const stmt = db.prepare('UPDATE project_images SET sort_order = ? WHERE id = ?');
    const transaction = db.transaction((updatesArray) => {
        for (const update of updatesArray) {
            stmt.run(update.sort_order, update.id);
        }
    });
    transaction(updates);
}
