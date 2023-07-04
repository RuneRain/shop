/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        logoFont: [ 'Spectral', 'serif'],
      },
      colors:{
        brand:'#041E3A'
      }
    }
  },
  plugins: [],
}
