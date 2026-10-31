const { mapFeatures } = tables
export default defineEventHandler(() => useDb().select().from(mapFeatures).orderBy(asc(mapFeatures.sortOrder), asc(mapFeatures.id)))
