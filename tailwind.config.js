/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        instaBorder:"#E1306C",
        linkedInBorder:"#0072b1",
        HoverInsta:"#C13584",
        HoverInstPurple:"#833AB4"
      }
    },
  },
  plugins: [],
}