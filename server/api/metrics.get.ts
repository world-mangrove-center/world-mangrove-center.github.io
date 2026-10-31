const { metrics } = tables

export default defineCachedEventHandler(
  async () => {
    const rows = await useDb()
      .select({
        key: metrics.key,
        group: metrics.group,
        valueEn: metrics.valueEn,
        valueId: metrics.valueId,
        labelEn: metrics.labelEn,
        labelId: metrics.labelId,
        icon: metrics.icon,
      })
      .from(metrics)
      .orderBy(asc(metrics.sortOrder))
    return {
      impact: rows.filter((r) => r.group === 'impact'),
      partners: rows.filter((r) => r.group === 'partners'),
    }
  },
  { maxAge: 60, swr: true, name: 'public-metrics' },
)
