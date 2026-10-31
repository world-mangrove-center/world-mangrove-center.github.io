const { dataRequests } = tables

export default defineEventHandler(async (event) => {
  const input = await readValidated(event, dataRequestInput)
  if (input.website) return { ok: true }

  const db = useDb()
  const [recent] = await db
    .select({ n: count() })
    .from(dataRequests)
    .where(and(eq(dataRequests.email, input.email), sql`${dataRequests.createdAt} > now() - interval '10 minutes'`))
  if ((recent?.n ?? 0) >= 3) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests. Please try again later.' })
  }

  const { website: _hp, ...data } = input
  await db.insert(dataRequests).values({ ...data, publicationId: data.publicationId ?? null })
  setResponseStatus(event, 201)
  return { ok: true }
})
