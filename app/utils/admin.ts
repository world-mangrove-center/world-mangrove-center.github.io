/** Declarative field/column descriptions used by <AdminResource>. */
export interface FieldDef {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'number' | 'select' | 'multiselect' | 'tags' | 'checkbox' | 'date' | 'url' | 'email'
  options?: { value: string; label: string }[]
  help?: string
  required?: boolean
  full?: boolean // span both columns
  rows?: number
}
export interface ColumnDef {
  key: string
  label: string
  format?: (row: any) => string
  image?: boolean
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
