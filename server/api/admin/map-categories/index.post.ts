export default defineEventHandler(async (event) => {
  const row = await crudCreate(event, tables.mapCategories, mapCategoryInput)
  await invalidatePublicCache()
  return row
})
