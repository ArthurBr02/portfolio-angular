const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');
const seed = require('./seed');

dotenv.config();

const dbPath = process.env.DB_PATH || './database.sqlite';
const db = new sqlite3.Database(path.resolve(__dirname, dbPath), (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath, err.message);

        // If the database doesn't exist, seed it
        if (err.code === 'SQLITE_CANTOPEN') {
            seed(db);
        }
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Projects Table
        db.run(`CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            imageUrl TEXT,
            link TEXT,
            technologies TEXT
        )`);

        // Education Table
        db.run(`CREATE TABLE IF NOT EXISTS education (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            institution TEXT NOT NULL,
            degree TEXT,
            startDate TEXT,
            endDate TEXT,
            description TEXT
        )`);

        // Experience Table
        db.run(`CREATE TABLE IF NOT EXISTS experience (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company TEXT NOT NULL,
            position TEXT,
            startDate TEXT,
            endDate TEXT,
            description TEXT
        )`);

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
        )`);

        // Skill Categories Table
        db.run(`CREATE TABLE IF NOT EXISTS skill_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            icon TEXT,
            skills TEXT
        )`);
    });
}

module.exports = db;
