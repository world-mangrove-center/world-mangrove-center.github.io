export default defineEventHandler(async (event) => {
  const row = await crudCreate(event, tables.teamMembers, teamMemberInput)
  await invalidatePublicCache()
  return row
})
