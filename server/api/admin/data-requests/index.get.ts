const { dataRequests, publications } = tables
export default defineEventHandler(() =>
  useDb()
    .select({
      id: dataRequests.id,
      name: dataRequests.name,
      email: dataRequests.email,
      institution: dataRequests.institution,
      purpose: dataRequests.purpose,
      status: dataRequests.status,
      adminNotes: dataRequests.adminNotes,
      locale: dataRequests.locale,
      createdAt: dataRequests.createdAt,
      publicationId: dataRequests.publicationId,
      publicationTitle: publications.titleEn,
    })
    .from(dataRequests)
    .leftJoin(publications, eq(dataRequests.publicationId, publications.id))
    .orderBy(desc(dataRequests.createdAt))
    .limit(500),
)
