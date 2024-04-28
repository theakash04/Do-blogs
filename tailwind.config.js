/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        'lappy': '1280px'
      },
      backgroundImage:{
        'login-bg' : "url('/assests/leaf.jpg')"
      }
    },
  },
  plugins: [],
}