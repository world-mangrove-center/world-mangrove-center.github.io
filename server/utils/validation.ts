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

/* ------------------------------ Map ------------------------------ */
const lon = z.number().min(-180).max(180)
const lat = z.number().min(-90).max(90)
const position = z.tuple([lon, lat]).or(z.tuple([lon, lat, z.number()]).transform(([a, b]) => [a, b] as [number, number]))
const ring = z
  .array(position)
  .min(4, 'A polygon ring needs at least 3 distinct points')
  .refine((r) => r[0]![0] === r.at(-1)![0] && r[0]![1] === r.at(-1)![1], 'Polygon ring must be closed (first point = last point)')

export const geometryInput = z.discriminatedUnion('type', [
  z.object({ type: z.literal('Point'), coordinates: position }),
  z.object({ type: z.literal('LineString'), coordinates: z.array(position).min(2, 'A line needs at least 2 points') }),
  z.object({ type: z.literal('Polygon'), coordinates: z.array(ring).min(1) }),
  z.object({ type: z.literal('MultiPolygon'), coordinates: z.array(z.array(ring).min(1)).min(1) }),
])

export const mapCategoryInput = z.object({
  key: z.string().trim().min(2).max(80).regex(/^[a-z0-9_]+$/, 'Use lowercase letters, numbers and underscores'),
  nameEn: z.string().trim().min(1).max(160),
  nameId: z.string().trim().min(1).max(160),
  color: z.string().trim().regex(/^#[0-9a-fA-F]{6}$/, 'Use a hex colour like #68ef3f'),
  sortOrder: z.coerce.number().int().default(0),
  visibleByDefault: z.boolean().default(true),
})

const optionalNumber = z
  .union([z.number(), z.string()])
  .transform((v) => (v === '' || v === null ? null : Number(v)))
  .refine((v) => v === null || Number.isFinite(v), 'Must be a number')
  .nullable()
  .optional()

export const mapFeatureInput = z.object({
  slug: z.string().trim().min(2).max(160).regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and dashes'),
  categoryId: z.preprocess((v) => (v === '' || v == null ? null : Number(v)), z.number().int().positive().nullable()).optional(),
  nameEn: z.string().trim().min(1).max(200),
  nameId: z.string().trim().min(1).max(200),
  descriptionEn: z.string().trim().max(4000).default(''),
  descriptionId: z.string().trim().max(4000).default(''),
  geometry: z.preprocess((v) => {
    if (typeof v !== 'string') return v
    try {
      const parsed = JSON.parse(v)
      return parsed?.type === 'Feature' ? parsed.geometry : parsed
    } catch {
      return v
    }
  }, geometryInput),
  areaHa: optionalNumber,
  year: z
    .union([z.number(), z.string()])
    .transform((v) => (v === '' || v === null ? null : Number(v)))
    .refine((v) => v === null || (Number.isInteger(v) && v > 1900 && v < 2200), 'Use a 4-digit year')
    .nullable()
    .optional(),
  imageUrl: optionalUrl,
  sortOrder: z.coerce.number().int().default(0),
  published: z.boolean().default(true),
})
