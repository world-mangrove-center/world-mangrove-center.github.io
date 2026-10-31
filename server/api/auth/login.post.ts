const { adminUsers } = tables

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidated(event, loginInput)
  const db = useDb()
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email.toLowerCase().trim()))

  // Always run a hash verification to keep timing similar for unknown emails
  const ok = user ? await verifyPassword(user.passwordHash, password) : (await verifyPassword(await dummyHash(), password), false)
  if (!user || !ok) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, user.id))
  await setUserSession(event, {
    user: { id: user.id, email: user.email, name: user.name },
    loggedInAt: Date.now(),
  })
  return { ok: true }
})

// A real hash of a random value, used only to keep response timing similar for unknown emails
let _dummy: Promise<string> | undefined
function dummyHash() {
  return (_dummy ??= hashPassword(crypto.randomUUID()))
}
