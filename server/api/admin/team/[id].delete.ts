export default defineEventHandler(async (event) => {
  const res = await crudDelete(event, tables.teamMembers)
  await invalidatePublicCache()
  return res
})
