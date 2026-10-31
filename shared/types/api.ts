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

export type GeoJsonGeometry =
  | { type: 'Point'; coordinates: [number, number] }
  | { type: 'LineString'; coordinates: [number, number][] }
  | { type: 'Polygon'; coordinates: [number, number][][] }
  | { type: 'MultiPolygon'; coordinates: [number, number][][][] }

export interface PublicMapCategory {
  id: number
  key: string
  nameEn: string
  nameId: string
  color: string
  visibleByDefault: boolean
}

export interface PublicMapFeature {
  type: 'Feature'
  id: number
  geometry: GeoJsonGeometry
  properties: {
    slug: string
    categoryId: number | null
    nameEn: string
    nameId: string
    descriptionEn: string
    descriptionId: string
    areaHa: number | null
    year: number | null
    imageUrl: string | null
  }
}

export interface PublicMapData {
  categories: PublicMapCategory[]
  features: { type: 'FeatureCollection'; features: PublicMapFeature[] }
}
