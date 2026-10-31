import { z } from 'zod'
const { dataRequests } = tables
const schema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  adminNotes: z.string().max(5000).nullable().optional(),
})

export default defineEventHandler(async (event) => {
  const id = parseId(event)
  const data = await readValidated(event, schema)
  const [row] = await useDb().update(dataRequests).set({ ...data, updatedAt: new Date() }).where(eq(dataRequests.id, id)).returning()
  if (!row) throw createError({ statusCode: 404, statusMessage: 'Not found' })
  return row
})
