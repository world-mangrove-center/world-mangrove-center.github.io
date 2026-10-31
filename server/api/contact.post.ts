const { contactMessages } = tables

export default defineEventHandler(async (event) => {
  const input = await readValidated(event, contactInput)

  // Honeypot: bots fill every field. Pretend success, store nothing.
  if (input.website) return { ok: true }

  const db = useDb()
  // Light abuse protection that works across serverless instances
  const [recent] = await db
    .select({ n: count() })
    .from(contactMessages)
    .where(and(eq(contactMessages.email, input.email), sql`${contactMessages.createdAt} > now() - interval '10 minutes'`))
  if ((recent?.n ?? 0) >= 3) {
    throw createError({ statusCode: 429, statusMessage: 'Too many messages. Please try again later.' })
  }

  const { website: _hp, ...data } = input
  await db.insert(contactMessages).values(data)
  setResponseStatus(event, 201)
  return { ok: true }
})
