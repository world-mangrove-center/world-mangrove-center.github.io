// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://world-mangrove-center.vercel.app'
const description =
  'International portal and knowledge hub for mangrove forest biodiversity restoration in Bintuni, Papua, Indonesia.'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', 'nuxt-auth-utils'],

  css: ['~/assets/css/main.css'],

  components: [{ path: '~/components', pathPrefix: false }],

  tailwindcss: {
    cssPath: false, // main.css imports the tailwind layers itself
    viewer: false,
  },

  i18n: {
    // Keep the URL scheme of the old VitePress site: English at "/", Indonesian under "/id/"
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    baseUrl: siteUrl,
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'id', language: 'id-ID', name: 'Indonesia', file: 'id.json' },
    ],
    detectBrowserLanguage: false,
  },

  runtimeConfig: {
    // Server-only. Set DATABASE_URL in Vercel (Neon integration sets it automatically).
    databaseUrl: process.env.DATABASE_URL || '',
    // nuxt-auth-utils reads NUXT_SESSION_PASSWORD (min. 32 chars)
    session: {
      name: 'wmc-session',
      maxAge: 60 * 60 * 12, // 12 hours
    },
    public: {
      siteUrl,
      contactEmail: 'contact@worldmangrovecenter.org',
    },
  },

  app: {
    head: {
      meta: [
        { name: 'description', content: description },
        { name: 'theme-color', content: '#122314' },
        { property: 'og:site_name', content: 'World Mangrove Center' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ResearchOrganization',
            name: 'World Mangrove Center',
            alternateName: 'Hub Bintuni',
            description,
            url: siteUrl,
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'ID',
              addressRegion: 'West Papua',
              addressLocality: 'Teluk Bintuni Regency',
            },
            areaServed: 'ID',
          }),
        },
      ],
    },
  },

  routeRules: {
    // Admin area and APIs are never cached
    '/admin/**': { ssr: false },
    '/api/**': { cache: false },
    // Legacy VitePress paths
    '/index.html': { redirect: { to: '/', statusCode: 301 } },
    '/id/index.html': { redirect: { to: '/id', statusCode: 301 } },
  },

  nitro: {
    // Vercel is auto-detected on deploy; this keeps local `nuxt build` portable.
    preset: process.env.VERCEL ? 'vercel' : undefined,
  },

  typescript: {
    strict: true,
  },
})
