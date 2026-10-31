import type { H3Event } from 'h3'
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core'
import type { z } from 'zod'

type TableWithId = PgTable & { id: PgColumn }

/** Map unique-constraint violations to a friendly 409. */
export function handleDbError(err: any): never {
  const code = err?.code ?? err?.cause?.code
  if (code === '23505') {
    throw createError({ statusCode: 409, statusMessage: 'An item with this slug/key already exists.' })
  }
  throw err
}

export async function crudCreate<T extends z.ZodType>(event: H3Event, table: TableWithId, schema: T) {
  const data = await readValidated(event, schema)
  try {
    const [row] = await useDb().insert(table).values(data as any).returning()
    setResponseStatus(event, 201)
    return row
  } catch (err) {
    handleDbError(err)
  }
}

export async function crudUpdate<T extends z.ZodType>(event: H3Event, table: TableWithId, schema: T) {
  const id = parseId(event)
  const data = await readValidated(event, schema, true)
  try {
    const [row] = await useDb()
      .update(table)
      .set({ ...(data as object), updatedAt: new Date() } as any)
      .where(eq(table.id, id))
      .returning()
    if (!row) throw createError({ statusCode: 404, statusMessage: 'Not found' })
    return row
  } catch (err) {
    handleDbError(err)
  }
}

export async function crudDelete(event: H3Event, table: TableWithId) {
  const id = parseId(event)
  const rows = await useDb().delete(table).where(eq(table.id, id)).returning({ id: table.id })
  if (!rows.length) throw createError({ statusCode: 404, statusMessage: 'Not found' })
  return { ok: true }
}
