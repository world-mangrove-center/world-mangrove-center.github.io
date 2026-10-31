/** Declarative field/column descriptions used by <AdminResource>. */
export interface FieldDef {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'number' | 'select' | 'multiselect' | 'tags' | 'checkbox' | 'date' | 'url' | 'email' | 'color' | 'geometry'
  options?: { value: string | number | null; label: string }[]
  help?: string
  required?: boolean
  full?: boolean // span both columns
  rows?: number
  /** geometry fields: colour of the shape being edited (e.g. from its category) */
  geometryColor?: (row: Record<string, any>) => string
  /** geometry fields: other shapes drawn faintly for reference */
  geometryReference?: (row: Record<string, any>) => { geometry: any; color: string; name: string }[]
}
export interface ColumnDef {
  key: string
  label: string
  format?: (row: any) => string
  image?: boolean
  swatch?: boolean
}

export const teamCategoryOptions = [
  { value: 'researcher', label: 'Peneliti' },
  { value: 'localAdvisor', label: 'Penasihat Lokal' },
  { value: 'management', label: 'Manajemen' },
  { value: 'ecologyExpert', label: 'Ahli Ekologi' },
]

export function fmtDateTime(v: string | null | undefined) {
  return v ? new Date(v).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : ''
}
