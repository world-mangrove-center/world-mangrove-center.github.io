import { z } from 'zod'

const optionalUrl = z
  .string()
  .trim()
  .max(2000)
  .transform((v) => (v === '' ? null : v))
  .nullable()
  .optional()
  .refine((v) => v == null || /^(https?:\/\/|\/)/.test(v), 'Must be an http(s) URL or a path starting with /')

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => (v === '' ? null : v))
    .nullable()
    .optional()

const stringList = z
  .union([z.array(z.string()), z.string()])
  .transform((v) => (Array.isArray(v) ? v : v.split(',')).map((s) => s.trim()).filter(Boolean))

export const teamMemberInput = z.object({
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and dashes'),
  name: z.string().trim().min(2).max(160),
  roleEn: z.string().trim().min(2).max(200),
  roleId: z.string().trim().min(2).max(200),
  categories: z.array(z.enum(['researcher', 'localAdvisor', 'management', 'ecologyExpert'])).default([]),
  imageUrl: optionalUrl,
  shortBioEn: z.string().trim().max(600).default(''),
  shortBioId: z.string().trim().max(600).default(''),
  bioEn: z.string().trim().max(6000).default(''),
  bioId: z.string().trim().max(6000).default(''),
  expertise: stringList.default([]),
  email: z.union([z.literal(''), z.email()]).transform((v) => v || null).nullable().optional(),
  linkedinUrl: optionalUrl,
  publicationsUrl: optionalUrl,
  sortOrder: z.coerce.number().int().default(0),
  published: z.boolean().default(true),
})

export const publicationInput = z.object({
  slug: z.string().trim().min(2).max(160).regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and dashes'),
  type: z.enum(['paper', 'report', 'data']),
  titleEn: z.string().trim().min(3).max(500),
  titleId: z.string().trim().min(3).max(500),
  abstractEn: z.string().trim().max(5000).default(''),
  abstractId: z.string().trim().max(5000).default(''),
  authors: z.string().trim().max(500).default(''),
  publishedOn: z
    .string()
    .trim()
    .transform((v) => (v === '' ? null : v))
    .nullable()
    .optional()
    .refine((v) => v == null || /^\d{4}-\d{2}-\d{2}$/.test(v), 'Use YYYY-MM-DD'),
  fileSize: optionalText(40),
  pages: optionalText(40),
  tags: stringList.default([]),
  imageUrl: optionalUrl,
  fileUrl: optionalUrl,
  doi: optionalText(200),
  sortOrder: z.coerce.number().int().default(0),
  published: z.boolean().default(true),
})

export const metricInput = z.object({
  key: z.string().trim().min(2).max(80).regex(/^[a-z0-9_]+$/, 'Use lowercase letters, numbers and underscores'),
  group: z.enum(['impact', 'partners']),
  valueEn: z.string().trim().min(1).max(40),
  valueId: z.string().trim().min(1).max(40),
  labelEn: z.string().trim().min(1).max(160),
  labelId: z.string().trim().min(1).max(160),
  icon: optionalText(2000),
  sortOrder: z.coerce.number().int().default(0),
})

export const contactInput = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.email().max(200),
  organization: optionalText(200),
  topic: z.enum(['general', 'research', 'partnership', 'media', 'volunteer']).default('general'),
  message: z.string().trim().min(10).max(5000),
  locale: z.enum(['en', 'id']).default('en'),
  website: z.string().optional(), // honeypot — must stay empty
})

export const dataRequestInput = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.email().max(200),
  institution: z.string().trim().min(2).max(200),
  purpose: z.string().trim().min(20).max(5000),
  publicationId: z.coerce.number().int().positive().nullable().optional(),
  locale: z.enum(['en', 'id']).default('en'),
  website: z.string().optional(),
})

export const loginInput = z.object({
  email: z.email(),
  password: z.string().min(1).max(500),
})

/** Parse a request body with a zod schema; respond 422 with field errors on failure. */
export async function readValidated<T extends z.ZodType>(event: Parameters<typeof readBody>[0], schema: T, partial = false) {
  const body = await readBody(event)
  const s: z.ZodType = partial && schema instanceof z.ZodObject ? schema.partial() : schema
  const result = s.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: { fieldErrors: z.flattenError(result.error).fieldErrors },
    })
  }
  if (partial && body && typeof body === 'object') {
    // .partial() still applies .default() values — keep only keys the client actually sent,
    // so a partial update never resets other columns.
    const sent = new Set(Object.keys(body))
    return Object.fromEntries(Object.entries(result.data as object).filter(([k]) => sent.has(k))) as z.output<T>
  }
  return result.data as z.output<T>
}

export function parseId(event: Parameters<typeof getRouterParam>[0]) {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id <= 0) throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
  return id
}
