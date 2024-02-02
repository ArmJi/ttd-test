/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        first: "#2A4B6A",
        second: "#142B41",
        third: "#021E42",
        fourth: "#255FA8",
        fifth: "#5FC198",
        sixth: "#D0D5DD",
        seventh: "#a3a3a3",
        eighth: "hsla(235, 10%, 49%, 0.6)"
      },
      fontFamily:{
        primary: ['Poppins', 'sans-serif'],
        secondary: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
