/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montseratt: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        'banner': "url('/banner2.jpg')",
      },
      colors: {
        gold: "#FFD700"
      }
    },
  },
  plugins: [],
}

