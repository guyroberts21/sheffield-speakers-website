/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'loyal-blue': '#004165',
        'true-maroon': '#772432',
        'cool-gray': '#A9B2B1',
        'happy-yellow': '#F2DF74',
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
