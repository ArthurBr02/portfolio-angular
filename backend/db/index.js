/**
 * Database Module
 * Handles database connection and initialization
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');
const Migrator = require('./migrator');

dotenv.config();

let db = null;
let migrator = null;

/**
 * Get database connection
 */
function getDatabase() {
    if (db) return db;
    
    const dbPath = process.env.DB_PATH || './database.sqlite';
    db = new sqlite3.Database(path.resolve(__dirname, '..', dbPath), (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to SQLite database:', dbPath);
        }
    });
    
    return db;
}

/**
 * Get migrator instance
 */
function getMigrator() {
    if (migrator) return migrator;
    migrator = new Migrator(getDatabase());
    return migrator;
}

/**
 * Initialize database with migrations
 */
async function initializeDatabase() {
    const migrator = getMigrator();
    
    try {
        const result = await migrator.migrate();
        return result;
    } catch (err) {
        console.error('Database initialization failed:', err);
        throw err;
    }
}

/**
 * Close database connection
 */
function closeDatabase() {
    return new Promise((resolve, reject) => {
        if (db) {
            db.close((err) => {
                if (err) reject(err);
                else {
                    db = null;
                    migrator = null;
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
}

module.exports = {
    getDatabase,
    getMigrator,
    initializeDatabase,
    closeDatabase
};
