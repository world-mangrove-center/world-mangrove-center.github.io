/**
 * Seed initial content (team, publications, metrics) and the first admin user.
 * Safe to re-run: existing rows (matched by slug/key/email) are left untouched,
 * so edits made in the admin panel are never overwritten.
 *
 *   ADMIN_EMAIL=you@example.org ADMIN_PASSWORD='a-long-password' npm run db:seed
 */
import 'dotenv/config'
import { Hash } from '@adonisjs/hash'
import { Scrypt } from '@adonisjs/hash/drivers/scrypt'
import { createDb, isNeonUrl } from './client'
import { adminUsers, metrics, publications, teamMembers } from './schema'
import team from './seed-data/team.json'
import pubs from './seed-data/publications.json'
import metricRows from './seed-data/metrics.json'

const url = process.env.DATABASE_URL || ''

async function main() {
  const db = createDb(url)

  const t = await db.insert(teamMembers).values(team as any).onConflictDoNothing().returning({ id: teamMembers.id })
  console.log(`• team_members: ${t.length} inserted (${team.length - t.length} already present)`)

  const p = await db.insert(publications).values(pubs as any).onConflictDoNothing().returning({ id: publications.id })
  console.log(`• publications: ${p.length} inserted (${pubs.length - p.length} already present)`)

  const m = await db.insert(metrics).values(metricRows as any).onConflictDoNothing().returning({ id: metrics.id })
  console.log(`• metrics: ${m.length} inserted (${metricRows.length - m.length} already present)`)

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  if (email && password) {
    if (password.length < 10) throw new Error('ADMIN_PASSWORD must be at least 10 characters')
    // Same hashing scheme as nuxt-auth-utils' hashPassword()/verifyPassword()
    const passwordHash = await new Hash(new Scrypt({})).make(password)
    const a = await db
      .insert(adminUsers)
      .values({ email, name: process.env.ADMIN_NAME || 'Administrator', passwordHash })
      .onConflictDoNothing()
      .returning({ id: adminUsers.id })
    console.log(a.length ? `• admin user created: ${email}` : `• admin user ${email} already exists (password unchanged)`)
  } else {
    console.log('• no ADMIN_EMAIL / ADMIN_PASSWORD given — skipped admin user')
  }

  if (!isNeonUrl(url)) await (db as any).$client.end()
  console.log('✓ Seed complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err)
  process.exit(1)
})
