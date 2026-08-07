import { useData } from 'vitepress'

const isExternal = (url: string) =>
  /^(https?:|mailto:|tel:|#)/.test(url)

export function useWithBase() {
  const { site } = useData()

  const withBase = (url: string): string => {
    if (!url) return url
    if (isExternal(url)) return url
    if (!url.startsWith('/')) return url
    const base = site.value.base || '/'
    if (base === '/') return url
    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base
    return cleanBase + url
  }

  return { withBase }
}
