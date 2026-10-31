const { teamMembers } = tables
export default defineEventHandler(() => useDb().select().from(teamMembers).orderBy(asc(teamMembers.sortOrder), asc(teamMembers.name)))
