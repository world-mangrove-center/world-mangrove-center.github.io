const { teamMembers, publications, contactMessages, dataRequests, metrics } = tables

export default defineEventHandler(async () => {
  const db = useDb()
  const [[team], [pubs], [msgNew], [reqPending], [mets], latestMessages, latestRequests] = await Promise.all([
    db.select({ n: count() }).from(teamMembers),
    db.select({ n: count() }).from(publications),
    db.select({ n: count() }).from(contactMessages).where(eq(contactMessages.status, 'new')),
    db.select({ n: count() }).from(dataRequests).where(eq(dataRequests.status, 'pending')),
    db.select({ n: count() }).from(metrics),
    db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(5),
    db.select().from(dataRequests).orderBy(desc(dataRequests.createdAt)).limit(5),
  ])
  return {
    counts: {
      team: team?.n ?? 0,
      publications: pubs?.n ?? 0,
      newMessages: msgNew?.n ?? 0,
      pendingRequests: reqPending?.n ?? 0,
      metrics: mets?.n ?? 0,
    },
    latestMessages,
    latestRequests,
  }
})
