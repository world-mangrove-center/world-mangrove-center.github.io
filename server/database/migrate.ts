/**
 * Apply SQL migrations in server/database/migrations to DATABASE_URL.
 *   npm run db:migrate
 */
import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDb, isNeonUrl } from './client'

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || ''
const migrationsFolder = path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations')

async function main() {
  const db = createDb(url)
  if (isNeonUrl(url)) {
    const { migrate } = await import('drizzle-orm/neon-http/migrator')
    await migrate(db, { migrationsFolder })
  } else {
    const { migrate } = await import('drizzle-orm/node-postgres/migrator')
    await migrate(db as any, { migrationsFolder })
    await (db as any).$client.end()
  }
  console.log('✓ Migrations applied')
}

main().catch((err) => {
  console.error('✗ Migration failed:', err)
  process.exit(1)
})
