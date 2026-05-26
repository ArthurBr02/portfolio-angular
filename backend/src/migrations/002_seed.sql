-- ═══════════════════════════════════════════════════════════════
-- Migration 002 — Seed: Admin User + Default Settings
-- Note: ADMIN_USERNAME and ADMIN_PASSWORD are replaced at runtime
-- by the seed script (not directly in SQL). This migration only
-- seeds the default settings values.
-- ═══════════════════════════════════════════════════════════════

-- Default settings — section visibility + site config
INSERT OR IGNORE INTO settings (key, value) VALUES
  ('section_hero_enabled', 'true'),
  ('section_about_enabled', 'true'),
  ('section_skills_enabled', 'true'),
  ('section_projects_enabled', 'true'),
  ('section_experience_enabled', 'true'),
  ('section_education_enabled', 'true'),
  ('section_contact_enabled', 'true'),
  ('site_title', 'Mon Portfolio'),
  ('active_theme', 'sable');

-- Default profile row (single row, updated via API)
INSERT OR IGNORE INTO profile (id, name, title, bio, email)
VALUES (1, 'Portfolio Owner', 'Developer', 'Welcome to my portfolio.', 'contact@example.com');
