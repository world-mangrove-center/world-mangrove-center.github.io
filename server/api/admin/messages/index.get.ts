const { contactMessages } = tables
export default defineEventHandler(() => useDb().select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(500))
