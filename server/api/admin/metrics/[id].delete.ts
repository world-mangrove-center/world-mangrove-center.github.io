export default defineEventHandler(async (event) => {
  const res = await crudDelete(event, tables.metrics)
  await invalidatePublicCache()
  return res
})
