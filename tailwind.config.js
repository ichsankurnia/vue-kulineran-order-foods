/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#181818',
        darksoft: '#383838',
        light: '#f5f5f5',
        greenCustom: '#00BD7E',
        primary: '#4EB883',
        grayCustom: '#EBEBEBA3',
        dashboardBg: '#F4F7FE'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        desk: '1368px'
      },
      width: {
        desk: '1368px'
      },
      zIndex: {
        full: 999999
      },
      animation: {
        pulse1s: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // }
}
