/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': {'max': '567px'},
      'md': {'min': '568px', 'max': '823px'},
      'lg': {'min': '824px', 'max': '1079px'},
      'xl': {'min': '1280px'},
    },  
  },
  plugins: [],
}