import { defineConfig } from 'vitepress'

const defaultSite = 'https://world-mangrove-center.github.io'
const defaultBase = '/'
const site = process.env.WMC_SITE_URL || defaultSite
const base = (() => {
  const envBase = process.env.WMC_BASE_PATH
  if (envBase !== undefined && envBase !== '') {
    return envBase.endsWith('/') ? envBase : `${envBase}/`
  }
  return defaultBase
})()

const joinBase = (p: string) => {
  if (!p.startsWith('/')) return p
  if (base === '/') return p
  const b = base.endsWith('/') ? base.slice(0, -1) : base
  return `${b}${p}`
}

export default defineConfig({
  lang: 'en-US',
  title: 'World Mangrove Center',
  description: 'International portal and knowledge hub for mangrove forest biodiversity restoration in Bintuni, Papua, Indonesia.',
  lastUpdated: true,
  cleanUrls: true,
  srcDir: '.',
  outDir: '../dist',
  assetsDir: 'assets',
  site,
  base,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: joinBase('/favicon.svg') }],
    [
      'meta',
      {
        property: 'og:title',
        content: 'World Mangrove Center | Hub Bintuni',
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'International portal and knowledge hub for mangrove forest biodiversity restoration in Bintuni, Papua, Indonesia.',
      },
    ],
    ['meta', { property: 'og:image', content: joinBase('/og-image.png') }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    [
      'script',
      {
        type: 'application/ld+json',
      },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ResearchOrganization',
        name: 'World Mangrove Center',
        alternateName: 'Hub Bintuni',
        description:
          'International portal and knowledge hub for mangrove forest biodiversity restoration in Bintuni, Papua, Indonesia.',
        url: 'https://world-mangrove-center.github.io',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'ID',
          addressRegion: 'West Papua',
          addressLocality: 'Teluk Bintuni Regency',
        },
        areaServed: 'ID',
      }),
    ],
  ],

  themeConfig: {
    logo: '/favicon.svg',

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/world-mangrove-center' },
      { icon: 'twitter', link: 'https://twitter.com/' },
    ],

    footer: {
      message:
        '© 2026 World Mangrove Center. International knowledge hub for mangrove forest biodiversity restoration in Bintuni, Papua, Indonesia.',
      copyright: 'All rights reserved.',
    },

    outline: {
      label: 'On this page',
      level: [2, 3],
    },

    docFooter: {
      prev: false,
      next: false,
    },

    returnToTopLabel: 'Back to top',
    darkModeSwitchLabel: 'Appearance',
    sidebarMenuLabel: 'Menu',

    editLink: {
      pattern: 'https://github.com/world-mangrove-center/world-mangrove-center.github.io/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    locales: {
      root: {
        label: 'English',
        lang: 'en',
        description:
          'International portal and knowledge hub for mangrove forest biodiversity restoration in Bintuni, Papua, Indonesia.',
        themeConfig: {
          nav: [
            { text: 'Home', link: '/' },
            {
              text: 'Biology',
              items: [
                { text: 'Flora & Ecosystem', link: '/biology/flora-ecosystem' },
                { text: 'Fauna & Aquatic Life', link: '/biology/fauna-aquatic' },
              ],
            },
            { text: 'NTFP & Ecotourism', link: '/ntfp-ecotourism/' },
            {
              text: 'Socio-Economics',
              items: [
                { text: 'Culture & Heritage', link: '/socio-economics/culture' },
                { text: 'Livelihood', link: '/socio-economics/livelihood' },
              ],
            },
            { text: 'Ethnobiology', link: '/ethnobiology/' },
            { text: 'Research & Insights', link: '/research-insights/' },
            { text: 'Our Team', link: '/team/' },
          ],
          sidebar: {
            '/biology/': [
              {
                text: 'Biology',
                items: [
                  { text: 'Flora & Ecosystem', link: '/biology/flora-ecosystem' },
                  { text: 'Fauna & Aquatic Life', link: '/biology/fauna-aquatic' },
                ],
              },
            ],
            '/socio-economics/': [
              {
                text: 'Socio-Economics',
                items: [
                  { text: 'Culture & Heritage', link: '/socio-economics/culture' },
                  { text: 'Livelihood', link: '/socio-economics/livelihood' },
                ],
              },
            ],
          },
        },
      },

      id: {
        label: 'Indonesia',
        lang: 'id',
        link: '/id/',
        description:
          'Portal internasional dan pusat pengetahuan untuk restorasi keanekaragaman hayati hutan mangrove di Bintuni, Papua, Indonesia.',
        themeConfig: {
          nav: [
            { text: 'Beranda', link: '/id/' },
            {
              text: 'Biologi',
              items: [
                { text: 'Flora & Ekosistem', link: '/id/biology/flora-ecosystem' },
                { text: 'Fauna & Kehidupan Akuatik', link: '/id/biology/fauna-aquatic' },
              ],
            },
            { text: 'HHBK & Ekowisata', link: '/id/ntfp-ecotourism/' },
            {
              text: 'Sosio-Ekonomi',
              items: [
                { text: 'Budaya & Warisan', link: '/id/socio-economics/culture' },
                { text: 'Mata Pencaharian', link: '/id/socio-economics/livelihood' },
              ],
            },
            { text: 'Etnobiologi', link: '/id/ethnobiology/' },
            { text: 'Riset & Wawasan', link: '/id/research-insights/' },
            { text: 'Tim Kami', link: '/id/team/' },
          ],
          sidebar: {
            '/id/biology/': [
              {
                text: 'Biologi',
                items: [
                  { text: 'Flora & Ekosistem', link: '/id/biology/flora-ecosystem' },
                  { text: 'Fauna & Kehidupan Akuatik', link: '/id/biology/fauna-aquatic' },
                ],
              },
            ],
            '/id/socio-economics/': [
              {
                text: 'Sosio-Ekonomi',
                items: [
                  { text: 'Budaya & Warisan', link: '/id/socio-economics/culture' },
                  { text: 'Mata Pencaharian', link: '/id/socio-economics/livelihood' },
                ],
              },
            ],
          },
        },
      },
    },
  },

  vite: {
    ssr: {
      noExternal: [/\.vue$/],
    },
  },
})
