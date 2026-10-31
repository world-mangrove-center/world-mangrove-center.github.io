const { mapCategories } = tables
export default defineEventHandler(() => useDb().select().from(mapCategories).orderBy(asc(mapCategories.sortOrder), asc(mapCategories.id)))
