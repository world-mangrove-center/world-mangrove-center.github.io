export default defineEventHandler(async (event) => {
  const res = await crudDelete(event, tables.publications)
  await invalidatePublicCache()
  return res
})
