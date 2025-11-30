const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const dbPath = process.env.DB_PATH || './database.sqlite';
const db = new sqlite3.Database(path.resolve(__dirname, dbPath));

// Add availableForWork column to users table
db.run(`ALTER TABLE users ADD COLUMN availableForWork INTEGER DEFAULT 0`, (err) => {
    if (err) {
        if (err.message.includes('duplicate column name')) {
            console.log('Column availableForWork already exists');
        } else {
            console.error('Error adding column:', err.message);
        }
    } else {
        console.log('Successfully added availableForWork column to users table');
    }
    db.close();
});
