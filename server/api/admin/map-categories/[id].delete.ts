export default defineEventHandler(async (event) => {
  const res = await crudDelete(event, tables.mapCategories)
  await invalidatePublicCache()
  return res
})
