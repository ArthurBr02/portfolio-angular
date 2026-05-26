import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.resolve(process.cwd(), 'database.sqlite');
const MIGRATIONS_DIR = path.resolve(__dirname, '../migrations');

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    runMigrations(db);
  }
  return db;
}

function runMigrations(db: Database.Database): void {
  // Create migrations tracking table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  const appliedMigrations = db
    .prepare('SELECT filename FROM _migrations ORDER BY filename')
    .all() as { filename: string }[];

  const applied = new Set(appliedMigrations.map((m) => m.filename));

  // Read migration files
  const migrationFiles = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const filename of migrationFiles) {
    if (applied.has(filename)) continue;

    const filePath = path.join(MIGRATIONS_DIR, filename);
    const sql = fs.readFileSync(filePath, 'utf-8');

    console.log(`  ⚡ Running migration: ${filename}`);
    db.exec(sql);
    db.prepare('INSERT INTO _migrations (filename) VALUES (?)').run(filename);
    console.log(`  ✅ Migration applied: ${filename}`);
  }
}

export default getDb;
