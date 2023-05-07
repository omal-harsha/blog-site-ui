/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgGreen : "#BAE6E9",
        btnGreen: "#028081"
      }
    },

    /*screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '1367px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },*/
  },
  plugins: [],
}