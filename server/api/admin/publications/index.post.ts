export default defineEventHandler(async (event) => {
  const row = await crudCreate(event, tables.publications, publicationInput)
  await invalidatePublicCache()
  return row
})
