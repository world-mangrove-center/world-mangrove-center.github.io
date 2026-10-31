import type { Locale } from '~~/shared/types/api'

/**
 * Helpers for bilingual DB content stored as `<field>En` / `<field>Id` columns.
 *   const { lang, pick, tr } = useLocalized()
 *   pick(member, 'shortBio')  -> member.shortBioEn or member.shortBioId
 *   tr('Hello', 'Halo')
 */
export function useLocalized() {
  const { locale } = useI18n()
  const lang = computed<Locale>(() => (locale.value === 'id' ? 'id' : 'en'))

  function pick<T extends Record<string, any>>(obj: T, field: string): string {
    const v = obj[`${field}${lang.value === 'id' ? 'Id' : 'En'}`]
    return (v ?? obj[`${field}En`] ?? '') as string
  }
  function tr(en: string, id: string) {
    return lang.value === 'id' ? id : en
  }
  function formatDate(iso: string | null | undefined) {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString(lang.value === 'id' ? 'id-ID' : 'en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  return { lang, pick, tr, formatDate }
}
