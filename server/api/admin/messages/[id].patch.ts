import { z } from 'zod'
const { contactMessages } = tables
const schema = z.object({ status: z.enum(['new', 'read', 'replied', 'archived']) })

export default defineEventHandler(async (event) => {
  const id = parseId(event)
  const { status } = await readValidated(event, schema)
  const [row] = await useDb().update(contactMessages).set({ status, updatedAt: new Date() }).where(eq(contactMessages.id, id)).returning()
  if (!row) throw createError({ statusCode: 404, statusMessage: 'Not found' })
  return row
})
