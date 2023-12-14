/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  prefix: 'tw-',
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'city-light': ' url("assets/bg.jpg");'
      }
    },
    screens: {
      'ms': { 'max': '576px' },
      'mxs': { 'max': '480px' },
      ...defaultTheme.screens
    }
  },
  plugins: [],
}