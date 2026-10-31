const { metrics } = tables
export default defineEventHandler(() => useDb().select().from(metrics).orderBy(asc(metrics.group), asc(metrics.sortOrder)))
