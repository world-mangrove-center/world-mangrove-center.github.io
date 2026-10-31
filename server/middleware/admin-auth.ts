/** Every /api/admin/** endpoint requires a logged-in admin session. */
export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api/admin')) {
    await requireUserSession(event)
  }
})
