export default defineEventHandler(async (event) => {
  const row = await crudUpdate(event, tables.metrics, metricInput)
  await invalidatePublicCache()
  return row
})
