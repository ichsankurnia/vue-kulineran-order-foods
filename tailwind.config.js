/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: '#00BD7E',
        primary: '#4EB883',
        gray: '#EBEBEBA3'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        desk: '1368px'
      },
      width: {
        desk: '1368px'
      }
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // }
}
