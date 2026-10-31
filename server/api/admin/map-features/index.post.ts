export default defineEventHandler(async (event) => {
  const row = await crudCreate(event, tables.mapFeatures, mapFeatureInput)
  await invalidatePublicCache()
  return row
})
