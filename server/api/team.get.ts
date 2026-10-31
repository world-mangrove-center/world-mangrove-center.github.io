const { teamMembers } = tables

export default defineCachedEventHandler(
  async () => {
    return useDb()
      .select({
        id: teamMembers.id,
        slug: teamMembers.slug,
        name: teamMembers.name,
        roleEn: teamMembers.roleEn,
        roleId: teamMembers.roleId,
        categories: teamMembers.categories,
        imageUrl: teamMembers.imageUrl,
        shortBioEn: teamMembers.shortBioEn,
        shortBioId: teamMembers.shortBioId,
        bioEn: teamMembers.bioEn,
        bioId: teamMembers.bioId,
        expertise: teamMembers.expertise,
        email: teamMembers.email,
        linkedinUrl: teamMembers.linkedinUrl,
        publicationsUrl: teamMembers.publicationsUrl,
      })
      .from(teamMembers)
      .where(eq(teamMembers.published, true))
      .orderBy(asc(teamMembers.sortOrder), asc(teamMembers.name))
  },
  { maxAge: 60, swr: true, name: 'public-team' },
)
