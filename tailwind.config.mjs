/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './docs/**/*.{md,html,vue,js,ts}',
    './docs/.vitepress/**/*.{md,html,vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4c8a3d',
        'on-primary': '#ffffff',
        background: '#0d3d15',
        surface: '#4c8a3d',
        border: '#1a4d23',
        text: '#f5f5f5',
        'text-muted': '#a0a0a0',
        accent: '#4c612c',
      },
      fontFamily: {
        sans: ['Geist', 'Geist Fallback', 'Inter', 'Arial', 'sans-serif'],
        display: ['Geist', 'Geist Fallback', 'Inter', 'Arial', 'sans-serif'],
        heading: ['Geist', 'Geist Fallback', 'Inter', 'Arial', 'sans-serif'],
        body: ['Geist', 'Geist Fallback', 'Inter', 'Arial', 'sans-serif'],
      },
      fontSize: {
        display: ['48px', { lineHeight: '1.38', fontWeight: '800' }],
        heading: ['24px', { lineHeight: '1', fontWeight: '700' }],
        body: ['14px', { lineHeight: '1.43', fontWeight: '400' }],
        'body-lg': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        5: '40px',
        6: '48px',
        7: '64px',
        8: '80px',
        9: '96px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '10px',
        xl: '14px',
        pill: '9999px',
      },
      boxShadow: {
        card: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
        elevated: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px',
      },
      transitionDuration: {
        fast: '150ms',
        base: '500ms',
        slow: '2000ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        brand: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      screens: {
        xs: '480px',
        sm: '481px',
        md: '768px',
        lg: '970px',
        xl: '1150px',
        '2xl': '1600px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
