/**
 * Migration: Add availableForWork column
 * Adds availableForWork column to users table
 */

module.exports = {
    name: '002_add_available_for_work',
    
    up: (db) => {
        return new Promise((resolve, reject) => {
            db.run(`ALTER TABLE users ADD COLUMN availableForWork INTEGER DEFAULT 0`, (err) => {
                if (err) {
                    // Column may already exist if migrating from old setup
                    if (err.message.includes('duplicate column name')) {
                        console.log('Column availableForWork already exists, skipping...');
                        resolve();
                    } else {
                        reject(err);
                    }
                } else {
                    resolve();
                }
            });
        });
    },

    down: (db) => {
        return new Promise((resolve, reject) => {
            // SQLite doesn't support DROP COLUMN directly
            // We need to recreate the table without the column
            db.serialize(() => {
                db.run(`CREATE TABLE users_backup AS SELECT 
                    id, username, password, firstName, lastName, age, 
                    email, github, linkedin, twitter, instagram, profilePicture 
                    FROM users`);
                db.run(`DROP TABLE users`);
                db.run(`CREATE TABLE users (
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
                )`);
                db.run(`INSERT INTO users SELECT * FROM users_backup`);
                db.run(`DROP TABLE users_backup`, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });
    }
};
