/**
 * Migration: Initial Schema
 * Creates the base tables for the portfolio application
 */

module.exports = {
    name: '001_initial_schema',
    
    up: (db) => {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                // Projects Table
                db.run(`CREATE TABLE IF NOT EXISTS projects (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT,
                    imageUrl TEXT,
                    link TEXT,
                    technologies TEXT
                )`, (err) => {
                    if (err) console.error('Error creating projects table:', err.message);
                });

                // Education Table
                db.run(`CREATE TABLE IF NOT EXISTS education (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    institution TEXT NOT NULL,
                    degree TEXT,
                    startDate TEXT,
                    endDate TEXT,
                    description TEXT
                )`, (err) => {
                    if (err) console.error('Error creating education table:', err.message);
                });

                // Experience Table
                db.run(`CREATE TABLE IF NOT EXISTS experience (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    company TEXT NOT NULL,
                    position TEXT,
                    startDate TEXT,
                    endDate TEXT,
                    description TEXT
                )`, (err) => {
                    if (err) console.error('Error creating experience table:', err.message);
                });

                // User/Admin Table
                db.run(`CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE,
                    password TEXT,
                    firstName TEXT,
                    lastName TEXT,
                    age INTEGER,
                    email TEXT,
                    github TEXT,
                    linkedin TEXT,
                    twitter TEXT,
                    instagram TEXT,
                    profilePicture TEXT
                )`, (err) => {
                    if (err) console.error('Error creating users table:', err.message);
                });

                // Skill Categories Table
                db.run(`CREATE TABLE IF NOT EXISTS skill_categories (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    icon TEXT,
                    skills TEXT
                )`, (err) => {
                    if (err) {
                        console.error('Error creating skill_categories table:', err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        });
    },

    down: (db) => {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('DROP TABLE IF EXISTS projects');
                db.run('DROP TABLE IF EXISTS education');
                db.run('DROP TABLE IF EXISTS experience');
                db.run('DROP TABLE IF EXISTS users');
                db.run('DROP TABLE IF EXISTS skill_categories', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });
    }
};
