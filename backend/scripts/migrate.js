#!/usr/bin/env node

/**
 * Migration CLI Script
 * Usage:
 *   node scripts/migrate.js          - Run all pending migrations
 *   node scripts/migrate.js up       - Run all pending migrations
 *   node scripts/migrate.js down     - Rollback last migration
 *   node scripts/migrate.js reset    - Rollback all and re-migrate
 *   node scripts/migrate.js status   - Show migration status
 */

const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const { getMigrator, closeDatabase } = require('../db');

async function main() {
    const command = process.argv[2] || 'up';
    const migrator = getMigrator();

    try {
        switch (command) {
            case 'up':
            case 'migrate':
                await migrator.migrate();
                break;

            case 'down':
            case 'rollback':
                const rolledBack = await migrator.rollback();
                if (rolledBack) {
                    console.log(`Rolled back: ${rolledBack}`);
                }
                break;

            case 'reset':
                await migrator.reset();
                break;

            case 'status':
                const status = await migrator.status();
                console.log('\nMigration Status:');
                console.log('─'.repeat(50));
                status.forEach(m => {
                    const icon = m.status === 'applied' ? '✓' : '○';
                    const color = m.status === 'applied' ? '\x1b[32m' : '\x1b[33m';
                    console.log(`${color}${icon}\x1b[0m ${m.name} (${m.status})`);
                });
                console.log('─'.repeat(50));
                break;

            default:
                console.log('Unknown command:', command);
                console.log('\nUsage:');
                console.log('  node scripts/migrate.js          - Run all pending migrations');
                console.log('  node scripts/migrate.js up       - Run all pending migrations');
                console.log('  node scripts/migrate.js down     - Rollback last migration');
                console.log('  node scripts/migrate.js reset    - Rollback all and re-migrate');
                console.log('  node scripts/migrate.js status   - Show migration status');
                process.exit(1);
        }
    } catch (err) {
        console.error('Migration error:', err.message);
        process.exit(1);
    } finally {
        await closeDatabase();
    }
}

main();
