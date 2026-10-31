export default defineEventHandler(async (event) => {
  const row = await crudUpdate(event, tables.mapFeatures, mapFeatureInput)
  await invalidatePublicCache()
  return row
})
