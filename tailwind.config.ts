/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: true,
  },
  theme: {
    colors: {
      white: '#FFF',
      black: '#000',
      transparent: 'transparent',
      orange: { 500: '#FF6046', 600: '#F2553B' },
      stone: {
        100: '#F5F4F2',
        200: '#E4E1DD',
        300: '#C6BEB7',
        500: '#9B938C',
        900: '#3C2716',
      },
    },
    fontSize: {
      xl: [
        '26px',
        {
          lineHeight: '26px',
          letterSpacing: '-1.2px',
          fontWeight: '700',
        },
      ],
      lg: [
        '17px',
        {
          lineHeight: '20px',
          letterSpacing: '-0.7px',
          fontWeight: '700',
        },
      ],
      base: [
        '16px',
        {
          lineHeight: '20px',
        },
      ],
      sm: [
        '14px',
        {
          lineHeight: '16px',
        },
      ],
    },
    fontFamily: {
      sans: [
        'var(--font-instrument-sans)',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      serif: [
        'var(--font-montagu-slab)',
        'ui-serif',
        'Georgia',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif',
      ],
    },
    boxShadow: {
      DEFAULT: '0 2px 2px 0 rgba(0, 0, 0, 0.16);',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
