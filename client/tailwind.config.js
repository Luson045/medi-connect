/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale:{
        '40': '1.1'
      },
      colors:{
        'custom-green':'#31ab91'
      }
    },
  },
  plugins: [],
}

