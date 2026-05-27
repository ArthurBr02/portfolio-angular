import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { env } from './env';

const DB_PATH = env.DB_PATH || path.join(process.cwd(), 'database.sqlite');

export const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function runMigrations() {
  db.exec(`CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, run_at TEXT DEFAULT (datetime('now')))`);
  const already = db.prepare('SELECT name FROM schema_migrations').all() as { name: string }[];
  const ran = new Set(already.map(r => r.name));

  const migrationsDir = path.join(__dirname, '../migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  for (const file of files) {
    if (file === '002_seed.sql') continue;
    if (ran.has(file)) continue;
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    db.exec(sql);
    db.prepare('INSERT INTO schema_migrations (name) VALUES (?)').run(file);
  }

  runSeed();
}

function runSeed() {
  const passwordHash = bcrypt.hashSync(env.ADMIN_PASSWORD, 10);
  const insertUser = db.prepare(
    'INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)'
  );
  insertUser.run(env.ADMIN_USERNAME, passwordHash);

  const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
  const defaults: [string, string][] = [
    ['section_hero_enabled', 'true'],
    ['section_about_enabled', 'true'],
    ['section_skills_enabled', 'true'],
    ['section_projects_enabled', 'true'],
    ['section_experience_enabled', 'true'],
    ['section_education_enabled', 'true'],
    ['section_education_ue_enabled', 'true'],
    ['section_contact_enabled', 'true'],
    ['site_title', 'Mon Portfolio'],
    ['active_theme', 'sable'],
    ['active_font', 'mono'],
    ['density', 'regular'],
    ['card_style', 'soft'],
    ['hero_style', 'split'],
    ['accent_intensity', 'warm'],
  ];
  for (const [key, value] of defaults) {
    insertSetting.run(key, value);
  }

  const insertTranslation = db.prepare('INSERT OR IGNORE INTO translations (lang, key, value) VALUES (?, ?, ?)');
  const translationDefaults: [string, string, string][] = [
    ['fr', 'nav.about', 'À propos'],
    ['fr', 'nav.skills', 'Compétences'],
    ['fr', 'nav.projects', 'Projets'],
    ['fr', 'nav.experience', 'Parcours'],
    ['fr', 'nav.contact', 'Contact'],
    ['fr', 'nav.available', 'Disponible'],
    ['fr', 'hero.greeting', 'Bonjour, je suis'],
    ['fr', 'hero.badge_available', 'Disponible pour de nouvelles opportunités'],
    ['fr', 'hero.badge_unavailable', 'Non disponible actuellement'],
    ['fr', 'hero.cta_primary', 'Voir mes projets'],
    ['fr', 'hero.cta_secondary', 'Télécharger le CV'],
    ['fr', 'hero.location', 'Localisation'],
    ['fr', 'about.eyebrow', 'À propos'],
    ['fr', 'about.title', 'Qui suis-je ?'],
    ['fr', 'about.stats_projects', 'Projets'],
    ['fr', 'about.stats_years', "Ans d'expérience"],
    ['fr', 'about.stats_clients', 'Clients'],
    ['fr', 'skills.eyebrow', 'Compétences'],
    ['fr', 'skills.title', 'Mon expertise'],
    ['fr', 'skills.skill_singular', 'compétence'],
    ['fr', 'skills.skill_plural', 'compétences'],
    ['fr', 'skills.level_1', 'Notions'],
    ['fr', 'skills.level_2', 'Maîtrise'],
    ['fr', 'skills.level_3', 'Expert'],
    ['fr', 'projects.eyebrow', 'Projets'],
    ['fr', 'projects.title', 'Mes réalisations'],
    ['fr', 'projects.filter_all', 'Tous'],
    ['fr', 'projects.filter_web', 'Web'],
    ['fr', 'projects.filter_mobile', 'Mobile'],
    ['fr', 'projects.filter_tools', 'Outils'],
    ['fr', 'projects.view_demo', 'Voir le projet'],
    ['fr', 'projects.view_repo', 'Code source'],
    ['fr', 'projects.category', 'Catégorie'],
    ['fr', 'projects.year', 'Année'],
    ['fr', 'experience.eyebrow', 'Parcours'],
    ['fr', 'experience.title_exp', 'Expériences'],
    ['fr', 'experience.title_edu', 'Formation'],
    ['fr', 'experience.present', 'Présent'],
    ['fr', 'contact.eyebrow', 'Contact'],
    ['fr', 'contact.title', 'Travaillons ensemble'],
    ['fr', 'contact.label_name', 'Nom'],
    ['fr', 'contact.label_email', 'Email'],
    ['fr', 'contact.label_subject', 'Sujet'],
    ['fr', 'contact.label_message', 'Message'],
    ['fr', 'contact.send', 'Envoyer'],
    ['fr', 'contact.success', 'Message envoyé !'],
    ['fr', 'contact.error', "Erreur lors de l'envoi"],
    ['fr', 'contact.channel_email', 'Email'],
    ['fr', 'contact.channel_location', 'Localisation'],
    ['fr', 'footer.rights', 'Tous droits réservés'],
    ['fr', 'common.close', 'Fermer'],
    ['en', 'nav.about', 'About'],
    ['en', 'nav.skills', 'Skills'],
    ['en', 'nav.projects', 'Projects'],
    ['en', 'nav.experience', 'Experience'],
    ['en', 'nav.contact', 'Contact'],
    ['en', 'nav.available', 'Available'],
    ['en', 'hero.greeting', "Hi, I'm"],
    ['en', 'hero.badge_available', 'Open to new opportunities'],
    ['en', 'hero.badge_unavailable', 'Not available right now'],
    ['en', 'hero.cta_primary', 'View my work'],
    ['en', 'hero.cta_secondary', 'Download CV'],
    ['en', 'hero.location', 'Location'],
    ['en', 'about.eyebrow', 'About'],
    ['en', 'about.title', 'Who am I?'],
    ['en', 'about.stats_projects', 'Projects'],
    ['en', 'about.stats_years', 'Years of experience'],
    ['en', 'about.stats_clients', 'Clients'],
    ['en', 'skills.eyebrow', 'Skills'],
    ['en', 'skills.title', 'My expertise'],
    ['en', 'skills.skill_singular', 'skill'],
    ['en', 'skills.skill_plural', 'skills'],
    ['en', 'skills.level_1', 'Beginner'],
    ['en', 'skills.level_2', 'Proficient'],
    ['en', 'skills.level_3', 'Expert'],
    ['en', 'projects.eyebrow', 'Projects'],
    ['en', 'projects.title', 'My work'],
    ['en', 'projects.filter_all', 'All'],
    ['en', 'projects.filter_web', 'Web'],
    ['en', 'projects.filter_mobile', 'Mobile'],
    ['en', 'projects.filter_tools', 'Tools'],
    ['en', 'projects.view_demo', 'View project'],
    ['en', 'projects.view_repo', 'Source code'],
    ['en', 'projects.category', 'Category'],
    ['en', 'projects.year', 'Year'],
    ['en', 'experience.eyebrow', 'Experience'],
    ['en', 'experience.title_exp', 'Work experience'],
    ['en', 'experience.title_edu', 'Education'],
    ['en', 'experience.present', 'Present'],
    ['en', 'contact.eyebrow', 'Contact'],
    ['en', 'contact.title', "Let's work together"],
    ['en', 'contact.label_name', 'Name'],
    ['en', 'contact.label_email', 'Email'],
    ['en', 'contact.label_subject', 'Subject'],
    ['en', 'contact.label_message', 'Message'],
    ['en', 'contact.send', 'Send'],
    ['en', 'contact.success', 'Message sent!'],
    ['en', 'contact.error', 'Failed to send'],
    ['en', 'contact.channel_email', 'Email'],
    ['en', 'contact.channel_location', 'Location'],
    ['en', 'footer.rights', 'All rights reserved'],
    ['en', 'common.close', 'Close'],
  ];
  for (const [lang, key, value] of translationDefaults) {
    insertTranslation.run(lang, key, value);
  }
}

runMigrations();
