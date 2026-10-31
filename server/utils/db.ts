import { createDb, type Database } from '../database/client'

export * as tables from '../database/schema'
export { and, asc, desc, eq, sql, count, inArray } from 'drizzle-orm'

let _db: Database | undefined

export function useDb(): Database {
  if (!_db) {
    const url = process.env.DATABASE_URL || useRuntimeConfig().databaseUrl || ''
    _db = createDb(url)
  }
  return _db
}
