import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import * as schema from './schema'

export type Database = ReturnType<typeof drizzleNeon<typeof schema>>

/**
 * Neon (production / preview on Vercel) uses the serverless HTTP driver —
 * no connection pool to manage in serverless functions.
 * Any other Postgres URL (e.g. a local Docker Postgres for development or CI)
 * falls back to node-postgres. Force a driver with DB_DRIVER=neon|pg.
 */
export function isNeonUrl(url: string) {
  const forced = process.env.DB_DRIVER
  if (forced) return forced === 'neon'
  try {
    return new URL(url).hostname.endsWith('.neon.tech')
  } catch {
    return false
  }
}

export function createDb(url: string): Database {
  if (!url) {
    throw new Error('DATABASE_URL is not set. Copy .env.example to .env and add your Neon connection string.')
  }
  if (isNeonUrl(url)) {
    return drizzleNeon(neon(url), { schema })
  }
  const pool = new pg.Pool({ connectionString: url, max: 5 })
  // Both drivers expose the same query-builder API for what this app uses.
  return drizzlePg(pool, { schema }) as unknown as Database
}

export { schema }
