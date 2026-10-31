/**
 * Deployment diagnostics. Exposes only non-secret facts:
 * which Neon endpoint is used, whether migrations ran, whether an admin exists,
 * and whether the session secret is configured.
 */
export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const url = process.env.DATABASE_URL || config.databaseUrl || ''
  let dbEndpoint: string | null = null
  try {
    dbEndpoint = new URL(url).hostname.split('.')[0]?.replace(/-pooler$/, '') ?? null
  } catch {}

  const result: Record<string, unknown> = {
    ok: false,
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
    databaseUrlSet: Boolean(url),
    dbEndpoint,
    appSecretSet: Boolean((config as any).appSecret),
    // Nuxt requires appSecret to be a string of at least 32 characters to derive session keys
    appSecretValid: typeof (config as any).appSecret === 'string' && (config as any).appSecret.length >= 32,
    appSecretType: typeof (config as any).appSecret,
  }

  const started = Date.now()
  try {
    const db = useDb()
    const first = (res: any) => res?.rows?.[0] ?? res?.[0]
    const reg = first(await db.execute(sql`select to_regclass('public.admin_users') is not null as migrated`))
    const migrated = Boolean(reg?.migrated)
    let admins = 0
    if (migrated) admins = Number(first(await db.execute(sql`select count(*)::int as n from admin_users`))?.n ?? 0)
    result.migrated = migrated
    result.adminUserExists = admins > 0
    result.db = 'up'
    result.latencyMs = Date.now() - started
  } catch (err: any) {
    result.db = 'down'
    result.dbError = String(err?.message || err).slice(0, 200)
  }
  result.ok = result.db === 'up' && result.migrated === true && result.adminUserExists === true && result.appSecretValid === true
  return result
})
