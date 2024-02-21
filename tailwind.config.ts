import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      white: '#FFF',
      black: '#000',
      orange: '#FF6046',
      stone: {
        100: '#F5F4F2',
        200: '#E4E1DD',
        300: '#C6BEB7',
        500: '#9B938C',
        900: '#3C2716',
      }
    },
    fontFamily: {
      'sans': ['Instrument Sans', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      'serif': ['Montagu Slab', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    },
    extend: {},
  },
  plugins: [],
};
export default config;
