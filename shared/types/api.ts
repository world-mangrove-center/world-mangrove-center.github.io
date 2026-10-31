export type Locale = 'en' | 'id'
export type TeamCategory = 'researcher' | 'localAdvisor' | 'management' | 'ecologyExpert'
export type PublicationType = 'paper' | 'report' | 'data'

export interface PublicTeamMember {
  id: number
  slug: string
  name: string
  roleEn: string
  roleId: string
  categories: TeamCategory[]
  imageUrl: string | null
  shortBioEn: string
  shortBioId: string
  bioEn: string
  bioId: string
  expertise: string[]
  email: string | null
  linkedinUrl: string | null
  publicationsUrl: string | null
}

export interface PublicPublication {
  id: number
  slug: string
  type: PublicationType
  titleEn: string
  titleId: string
  abstractEn: string
  abstractId: string
  authors: string
  publishedOn: string | null
  fileSize: string | null
  pages: string | null
  tags: string[]
  imageUrl: string | null
  fileUrl: string | null
  doi: string | null
}

export interface PublicMetric {
  key: string
  group: 'impact' | 'partners'
  valueEn: string
  valueId: string
  labelEn: string
  labelId: string
  icon: string | null
}
