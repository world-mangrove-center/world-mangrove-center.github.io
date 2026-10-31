export default defineEventHandler(async (event) => {
  const row = await crudUpdate(event, tables.mapCategories, mapCategoryInput)
  await invalidatePublicCache()
  return row
})
