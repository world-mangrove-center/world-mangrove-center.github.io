import type { Config } from 'tailwindcss'

// Design tokens from design.md ("Tomorro" neo-botanical palette)
export default {
  content: ['./app/**/*.{vue,ts,js}', './i18n/**/*.json'],
  theme: {
    extend: {
      colors: {
        'forest-depths': '#122314',
        'moss-shadow': '#273f2b',
        'lichen-sage': '#7e8371',
        'pale-fern': '#b7bda5',
        'electric-sprout': '#68ef3f',
        'deep-verdant': '#26a200',
        'sprout-wash': '#e7f9dd',
        'mist-green': '#d9deca',
        'onyx-olive': '#30322a',
        'pure-white': '#ffffff',
        'bone-white': '#f2f5eb',
        'soft-mist': '#dcdfe3',
        'cool-stone': '#d6d6d6',
        carbon: '#222222',
      },
      fontFamily: {
        ozik: ['Ozik', 'Boldonse', 'Migra', 'PP Editorial New', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Aeonik', 'Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Source Serif 4', 'ui-serif', 'Georgia', 'serif'],
        'instrument-serif': ['Instrument Serif', 'Source Serif 4', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        caption: ['12px', { lineHeight: '1.5', letterSpacing: '-0.036px' }],
        body: ['14px', { lineHeight: '1.5', letterSpacing: '-0.042px' }],
        'body-md': ['16px', { lineHeight: '1.5', letterSpacing: '-0.2px' }],
        subheading: ['18px', { lineHeight: '1.5', letterSpacing: '-0.378px' }],
        'heading-sm': ['20px', { lineHeight: '1.43', letterSpacing: '-0.3px' }],
        heading: ['24px', { lineHeight: '1.33', letterSpacing: '-0.36px' }],
        'heading-lg': ['32px', { lineHeight: '1.2', letterSpacing: '-0.672px' }],
        display: ['40px', { lineHeight: '1.2', letterSpacing: '-1.24px' }],
        'display-xl': ['56px', { lineHeight: '0.86', letterSpacing: '-0.784px' }],
        'display-2xl': ['80px', { lineHeight: '0.9', letterSpacing: '-0.8px' }],
      },
      borderRadius: {
        pill: '9999px',
        nav: '28px',
        card: '20px',
        badge: '40px',
        input: '24px',
      },
      boxShadow: {
        'float-card': '0 24px 60px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)',
        'pill-nav': '0 8px 32px rgba(0,0,0,0.25)',
      },
      transitionDuration: { fast: '150ms', base: '300ms', slow: '600ms' },
      screens: { lg: '970px', xl: '1200px' },
      maxWidth: { page: '1200px' },
    },
  },
  plugins: [],
} satisfies Config
