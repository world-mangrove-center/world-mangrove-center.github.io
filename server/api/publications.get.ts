const { publications } = tables

export default defineCachedEventHandler(
  async () => {
    return useDb()
      .select({
        id: publications.id,
        slug: publications.slug,
        type: publications.type,
        titleEn: publications.titleEn,
        titleId: publications.titleId,
        abstractEn: publications.abstractEn,
        abstractId: publications.abstractId,
        authors: publications.authors,
        publishedOn: publications.publishedOn,
        fileSize: publications.fileSize,
        pages: publications.pages,
        tags: publications.tags,
        imageUrl: publications.imageUrl,
        fileUrl: publications.fileUrl,
        doi: publications.doi,
      })
      .from(publications)
      .where(eq(publications.published, true))
      .orderBy(desc(publications.publishedOn), asc(publications.sortOrder))
  },
  { maxAge: 60, swr: true, name: 'public-publications' },
)
