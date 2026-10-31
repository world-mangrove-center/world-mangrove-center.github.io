export default defineEventHandler(async () => {
  const started = Date.now()
  await useDb().execute(sql`select 1`)
  return { ok: true, db: 'up', latencyMs: Date.now() - started }
})
