const { adminUsers } = tables

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidated(event, loginInput)
  const db = useDb()
  let user: typeof adminUsers.$inferSelect | undefined
  try {
    ;[user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email.toLowerCase().trim()))
  } catch (err) {
    console.error('[login] database error', err)
    throw createError({
      statusCode: 503,
      statusMessage: 'Database error',
      message: 'Database unavailable or not migrated. Check DATABASE_URL for this environment and run migrations.',
    })
  }

  // Always run a hash verification to keep timing similar for unknown emails
  const ok = user ? await verifyPassword(user.passwordHash, password) : (await verifyPassword(await dummyHash(), password), false)
  if (!user || !ok) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, user.id))
  try {
    await setUserSession(event, {
      user: { id: user.id, email: user.email, name: user.name },
      loggedInAt: Date.now(),
    })
  } catch (err) {
    console.error('[login] could not create session', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Session error',
      message: 'Session could not be created. Is NUXT_APP_SECRET set for this environment, and was the project redeployed afterwards?',
    })
  }
  return { ok: true }
})

// A real hash of a random value, used only to keep response timing similar for unknown emails
let _dummy: Promise<string> | undefined
function dummyHash() {
  return (_dummy ??= hashPassword(crypto.randomUUID()))
}
