export default defineEventHandler(async (event) => {
  const row = await crudUpdate(event, tables.publications, publicationInput)
  await invalidatePublicCache()
  return row
})
