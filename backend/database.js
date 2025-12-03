/**
 * Database Module (Legacy Export)
 * This file maintains backward compatibility.
 * New code should use require('./db') instead.
 */

const { getDatabase, initializeDatabase } = require('./db');

// Initialize database with migrations on first require
initializeDatabase().catch(err => {
    console.error('Failed to initialize database:', err);
});

// Export the database instance for backward compatibility
module.exports = getDatabase();
