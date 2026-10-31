export default defineEventHandler(async (event) => {
  const res = await crudDelete(event, tables.mapFeatures)
  await invalidatePublicCache()
  return res
})
