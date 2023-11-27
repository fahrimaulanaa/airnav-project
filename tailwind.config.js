/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'airnav-bg': "url('./img/bg_airnav_2.jpg')",
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'airnav-blue': '#005CA1',
        'airnav-dark': '#343842',
        'airnav-light': '#F2F2F2',
      },
      colors:{
        AirNav: "#005CA1",
        AirNavDark: "#343842"
      },
      height: {
        'stick-bottom': 'calc(97.4vh - 4rem)',
        'stick-top': 'calc(100vh - 4rem)',
      },
    },
  },
  plugins: [],
}
