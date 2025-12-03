# Database Migration System

This backend includes a migration system for managing database schema changes.

## Overview

The migration system allows you to:
- Track database schema changes in version control
- Apply migrations automatically on server startup
- Roll back migrations if needed
- Seed the database with initial data

## Directory Structure

```
backend/
├── db/
│   ├── index.js        # Database module (connection, initialization)
│   └── migrator.js     # Migration runner
├── migrations/
│   ├── index.js        # Migration registry
│   ├── 001_initial_schema.js
│   └── 002_add_available_for_work.js
└── scripts/
    ├── migrate.js      # CLI for running migrations
    └── seed.js         # Database seeding script
```

## Usage

### NPM Scripts

```bash
# Run all pending migrations
npm run db:migrate

# Rollback the last migration
npm run db:rollback

# Reset database (rollback all, then migrate)
npm run db:reset

# Show migration status
npm run db:status

# Seed database with initial data
npm run db:seed
```

### Automatic Migrations

Migrations are automatically run when the server starts. This ensures the database schema is always up to date.

### Manual CLI Usage

```bash
# Run migrations
node scripts/migrate.js up

# Rollback last migration
node scripts/migrate.js down

# Reset database
node scripts/migrate.js reset

# Check status
node scripts/migrate.js status
```

## Creating a New Migration

1. Create a new file in `migrations/` with the naming convention:
   `NNN_description.js` (e.g., `003_add_bio_to_users.js`)

2. Use this template:

```javascript
/**
 * Migration: Add bio column
 * Description of what this migration does
 */

module.exports = {
    name: '003_add_bio_to_users',
    
    up: (db) => {
        return new Promise((resolve, reject) => {
            db.run(`ALTER TABLE users ADD COLUMN bio TEXT`, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    down: (db) => {
        return new Promise((resolve, reject) => {
            // SQLite doesn't support DROP COLUMN, so you may need to
            // recreate the table without the column
            resolve();
        });
    }
};
```

3. Register your migration in `migrations/index.js`:

```javascript
const migration003 = require('./003_add_bio_to_users');

module.exports = [
    migration001,
    migration002,
    migration003,  // Add your new migration
];
```

## SQLite Limitations

SQLite has limited support for `ALTER TABLE`. It supports:
- `ADD COLUMN`
- `RENAME TABLE`
- `RENAME COLUMN` (SQLite 3.25.0+)

For other changes (like dropping columns), you need to:
1. Create a new table with the desired schema
2. Copy data from the old table
3. Drop the old table
4. Rename the new table

Example pattern in the `down` function:

```javascript
down: (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`CREATE TABLE users_new AS SELECT id, name, email FROM users`);
            db.run(`DROP TABLE users`);
            db.run(`ALTER TABLE users_new RENAME TO users`, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    });
}
```

## Seeding

The seed script (`scripts/seed.js`) populates the database with sample data for development. It:
1. Runs pending migrations first
2. Clears existing data
3. Inserts sample projects, experiences, education, and an admin user

**Default admin credentials:**
- Username: `admin`
- Password: `password123`

⚠️ **Warning:** Running the seed script will delete all existing data!

## Migration Table

The system tracks applied migrations in a `migrations` table:

```sql
CREATE TABLE migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Best Practices

1. **Never modify existing migrations** once they've been applied in production
2. **Always test migrations** in development before applying to production
3. **Include both `up` and `down`** functions for reversibility
4. **Keep migrations small** - one logical change per migration
5. **Use descriptive names** for migration files
