/**
 * Database Migrator
 * Handles database initialization and migration management
 */

const migrations = require('../migrations');

class Migrator {
    constructor(db) {
        this.db = db;
    }

    /**
     * Initialize the migrations table
     */
    async initMigrationsTable() {
        return new Promise((resolve, reject) => {
            this.db.run(`
                CREATE TABLE IF NOT EXISTS migrations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT UNIQUE NOT NULL,
                    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    /**
     * Check if a table exists in the database
     */
    async tableExists(tableName) {
        return new Promise((resolve, reject) => {
            this.db.get(
                `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
                [tableName],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(!!row);
                }
            );
        });
    }

    /**
     * Mark existing migrations as applied (for databases created before migration system)
     */
    async syncExistingMigrations() {
        // Check if this is an existing database (has tables but no migration records)
        const hasUsersTable = await this.tableExists('users');
        const applied = await this.getAppliedMigrations();

        if (hasUsersTable && applied.length === 0) {
            console.log('Detected existing database, syncing migration records...');
            
            // Check for availableForWork column to determine which migrations were applied
            const hasAvailableForWork = await new Promise((resolve, reject) => {
                this.db.get(`PRAGMA table_info(users)`, [], (err, row) => {
                    if (err) reject(err);
                    else {
                        this.db.all(`PRAGMA table_info(users)`, [], (err, rows) => {
                            if (err) reject(err);
                            else resolve(rows.some(r => r.name === 'availableForWork'));
                        });
                    }
                });
            });

            // Record initial schema as applied
            await this.recordMigration('001_initial_schema');
            console.log('  ✓ Marked 001_initial_schema as applied');

            if (hasAvailableForWork) {
                await this.recordMigration('002_add_available_for_work');
                console.log('  ✓ Marked 002_add_available_for_work as applied');
            }
        }
    }

    /**
     * Get list of applied migrations
     */
    async getAppliedMigrations() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT name FROM migrations ORDER BY id', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => row.name));
            });
        });
    }

    /**
     * Record a migration as applied
     */
    async recordMigration(name) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT OR IGNORE INTO migrations (name) VALUES (?)', [name], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    /**
     * Remove a migration record
     */
    async removeMigration(name) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM migrations WHERE name = ?', [name], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    /**
     * Get pending migrations
     */
    async getPendingMigrations() {
        const applied = await this.getAppliedMigrations();
        return migrations.filter(m => !applied.includes(m.name));
    }

    /**
     * Run all pending migrations
     */
    async migrate() {
        await this.initMigrationsTable();
        
        // Sync existing migrations for databases created before the migration system
        await this.syncExistingMigrations();
        
        const pending = await this.getPendingMigrations();

        if (pending.length === 0) {
            console.log('✓ Database is up to date. No migrations to run.');
            return { migrated: [], skipped: migrations.length };
        }

        console.log(`Running ${pending.length} migration(s)...`);
        const migrated = [];

        for (const migration of pending) {
            try {
                console.log(`  → Running migration: ${migration.name}`);
                await migration.up(this.db);
                await this.recordMigration(migration.name);
                migrated.push(migration.name);
                console.log(`  ✓ Migration ${migration.name} completed`);
            } catch (err) {
                console.error(`  ✗ Migration ${migration.name} failed:`, err.message);
                throw err;
            }
        }

        console.log(`✓ Successfully ran ${migrated.length} migration(s)`);
        return { migrated, skipped: migrations.length - pending.length };
    }

    /**
     * Rollback the last migration
     */
    async rollback() {
        await this.initMigrationsTable();
        const applied = await this.getAppliedMigrations();

        if (applied.length === 0) {
            console.log('✓ No migrations to rollback.');
            return null;
        }

        const lastMigrationName = applied[applied.length - 1];
        const migration = migrations.find(m => m.name === lastMigrationName);

        if (!migration) {
            throw new Error(`Migration ${lastMigrationName} not found in migrations list`);
        }

        console.log(`Rolling back migration: ${migration.name}`);
        
        try {
            await migration.down(this.db);
            await this.removeMigration(migration.name);
            console.log(`✓ Rollback of ${migration.name} completed`);
            return migration.name;
        } catch (err) {
            console.error(`✗ Rollback of ${migration.name} failed:`, err.message);
            throw err;
        }
    }

    /**
     * Rollback all migrations
     */
    async rollbackAll() {
        await this.initMigrationsTable();
        const applied = await this.getAppliedMigrations();
        const rolledBack = [];

        for (let i = applied.length - 1; i >= 0; i--) {
            const migrationName = applied[i];
            const migration = migrations.find(m => m.name === migrationName);

            if (!migration) {
                console.warn(`Migration ${migrationName} not found, removing record...`);
                await this.removeMigration(migrationName);
                continue;
            }

            try {
                console.log(`  → Rolling back: ${migration.name}`);
                await migration.down(this.db);
                await this.removeMigration(migration.name);
                rolledBack.push(migration.name);
                console.log(`  ✓ Rolled back ${migration.name}`);
            } catch (err) {
                console.error(`  ✗ Rollback of ${migration.name} failed:`, err.message);
                throw err;
            }
        }

        console.log(`✓ Rolled back ${rolledBack.length} migration(s)`);
        return rolledBack;
    }

    /**
     * Reset database: rollback all and re-migrate
     */
    async reset() {
        console.log('Resetting database...');
        await this.rollbackAll();
        return await this.migrate();
    }

    /**
     * Get migration status
     */
    async status() {
        await this.initMigrationsTable();
        const applied = await this.getAppliedMigrations();
        
        const status = migrations.map(m => ({
            name: m.name,
            status: applied.includes(m.name) ? 'applied' : 'pending'
        }));

        return status;
    }
}

module.exports = Migrator;
