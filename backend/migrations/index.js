/**
 * Migration Index
 * Import and export all migrations in order
 */

const migration001 = require('./001_initial_schema');
const migration002 = require('./002_add_available_for_work');

// Export migrations in order - ADD NEW MIGRATIONS AT THE END
module.exports = [
    migration001,
    migration002,
];
