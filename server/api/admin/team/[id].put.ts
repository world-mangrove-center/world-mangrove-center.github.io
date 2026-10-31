export default defineEventHandler(async (event) => {
  const row = await crudUpdate(event, tables.teamMembers, teamMemberInput)
  await invalidatePublicCache()
  return row
})
