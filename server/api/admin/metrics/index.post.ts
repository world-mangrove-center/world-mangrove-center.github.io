export default defineEventHandler(async (event) => {
  const row = await crudCreate(event, tables.metrics, metricInput)
  await invalidatePublicCache()
  return row
})
