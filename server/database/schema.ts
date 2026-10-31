import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
}

/* ------------------------------------------------------------------ */
/* Team & experts                                                      */
/* ------------------------------------------------------------------ */
export const teamCategory = pgEnum('team_category', [
  'researcher',
  'localAdvisor',
  'management',
  'ecologyExpert',
])

export const teamMembers = pgTable(
  'team_members',
  {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 120 }).notNull().unique(),
    name: varchar('name', { length: 160 }).notNull(),
    roleEn: varchar('role_en', { length: 200 }).notNull(),
    roleId: varchar('role_id', { length: 200 }).notNull(),
    categories: teamCategory('categories').array().notNull().default([]),
    imageUrl: text('image_url'),
    shortBioEn: text('short_bio_en').notNull().default(''),
    shortBioId: text('short_bio_id').notNull().default(''),
    bioEn: text('bio_en').notNull().default(''),
    bioId: text('bio_id').notNull().default(''),
    expertise: text('expertise').array().notNull().default([]),
    email: varchar('email', { length: 200 }),
    linkedinUrl: text('linkedin_url'),
    publicationsUrl: text('publications_url'),
    sortOrder: integer('sort_order').notNull().default(0),
    published: boolean('published').notNull().default(true),
    ...timestamps,
  },
  (t) => [index('team_members_sort_idx').on(t.sortOrder)],
)

/* ------------------------------------------------------------------ */
/* Research publications / datasets                                    */
/* ------------------------------------------------------------------ */
export const publicationType = pgEnum('publication_type', ['paper', 'report', 'data'])

export const publications = pgTable(
  'publications',
  {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 160 }).notNull().unique(),
    type: publicationType('type').notNull().default('paper'),
    titleEn: text('title_en').notNull(),
    titleId: text('title_id').notNull(),
    abstractEn: text('abstract_en').notNull().default(''),
    abstractId: text('abstract_id').notNull().default(''),
    authors: text('authors').notNull().default(''),
    publishedOn: date('published_on', { mode: 'string' }),
    fileSize: varchar('file_size', { length: 40 }),
    pages: varchar('pages', { length: 40 }),
    tags: text('tags').array().notNull().default([]),
    imageUrl: text('image_url'),
    fileUrl: text('file_url'),
    doi: varchar('doi', { length: 200 }),
    sortOrder: integer('sort_order').notNull().default(0),
    published: boolean('published').notNull().default(true),
    ...timestamps,
  },
  (t) => [index('publications_date_idx').on(t.publishedOn)],
)

/* ------------------------------------------------------------------ */
/* Impact metrics (home page + partner stats in CTA band)              */
/* ------------------------------------------------------------------ */
export const metricGroup = pgEnum('metric_group', ['impact', 'partners'])

export const metrics = pgTable('metrics', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 80 }).notNull().unique(),
  group: metricGroup('group').notNull().default('impact'),
  valueEn: varchar('value_en', { length: 40 }).notNull(),
  valueId: varchar('value_id', { length: 40 }).notNull(),
  labelEn: varchar('label_en', { length: 160 }).notNull(),
  labelId: varchar('label_id', { length: 160 }).notNull(),
  icon: text('icon'),
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
})

/* ------------------------------------------------------------------ */
/* Inbound: contact messages & data-access requests                    */
/* ------------------------------------------------------------------ */
export const messageStatus = pgEnum('message_status', ['new', 'read', 'replied', 'archived'])

export const contactMessages = pgTable(
  'contact_messages',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 160 }).notNull(),
    email: varchar('email', { length: 200 }).notNull(),
    organization: varchar('organization', { length: 200 }),
    topic: varchar('topic', { length: 40 }).notNull().default('general'),
    message: text('message').notNull(),
    locale: varchar('locale', { length: 5 }).notNull().default('en'),
    status: messageStatus('status').notNull().default('new'),
    ...timestamps,
  },
  (t) => [index('contact_messages_status_idx').on(t.status, t.createdAt)],
)

export const requestStatus = pgEnum('request_status', ['pending', 'approved', 'rejected'])

export const dataRequests = pgTable(
  'data_requests',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 160 }).notNull(),
    email: varchar('email', { length: 200 }).notNull(),
    institution: varchar('institution', { length: 200 }).notNull(),
    purpose: text('purpose').notNull(),
    publicationId: integer('publication_id').references(() => publications.id, {
      onDelete: 'set null',
    }),
    locale: varchar('locale', { length: 5 }).notNull().default('en'),
    status: requestStatus('status').notNull().default('pending'),
    adminNotes: text('admin_notes'),
    ...timestamps,
  },
  (t) => [index('data_requests_status_idx').on(t.status, t.createdAt)],
)

/* ------------------------------------------------------------------ */
/* Admin users                                                          */
/* ------------------------------------------------------------------ */
export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 200 }).notNull().unique(),
  name: varchar('name', { length: 160 }).notNull(),
  passwordHash: text('password_hash').notNull(),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
  ...timestamps,
})

export type TeamMemberRow = typeof teamMembers.$inferSelect
export type PublicationRow = typeof publications.$inferSelect
export type MetricRow = typeof metrics.$inferSelect
export type ContactMessageRow = typeof contactMessages.$inferSelect
export type DataRequestRow = typeof dataRequests.$inferSelect
