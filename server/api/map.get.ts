/** Public map data: legend categories + a GeoJSON FeatureCollection of published features. */
const { mapCategories, mapFeatures } = tables

export default defineCachedEventHandler(
  async () => {
    const db = useDb()
    const [categories, features] = await Promise.all([
      db
        .select({
          id: mapCategories.id,
          key: mapCategories.key,
          nameEn: mapCategories.nameEn,
          nameId: mapCategories.nameId,
          color: mapCategories.color,
          visibleByDefault: mapCategories.visibleByDefault,
        })
        .from(mapCategories)
        .orderBy(asc(mapCategories.sortOrder), asc(mapCategories.id)),
      db
        .select()
        .from(mapFeatures)
        .where(eq(mapFeatures.published, true))
        .orderBy(asc(mapFeatures.sortOrder), asc(mapFeatures.id)),
    ])
    return {
      categories,
      features: {
        type: 'FeatureCollection' as const,
        features: features.map((f) => ({
          type: 'Feature' as const,
          id: f.id,
          geometry: f.geometry,
          properties: {
            slug: f.slug,
            categoryId: f.categoryId,
            nameEn: f.nameEn,
            nameId: f.nameId,
            descriptionEn: f.descriptionEn,
            descriptionId: f.descriptionId,
            areaHa: f.areaHa,
            year: f.year,
            imageUrl: f.imageUrl,
          },
        })),
      },
    }
  },
  { maxAge: 60, swr: true, name: 'public-map' },
)
