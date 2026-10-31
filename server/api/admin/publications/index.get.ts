const { publications } = tables
export default defineEventHandler(() => useDb().select().from(publications).orderBy(desc(publications.publishedOn), asc(publications.sortOrder)))
