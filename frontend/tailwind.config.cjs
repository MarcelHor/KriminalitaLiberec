/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "screen-4/5": "80vh",
      },
      colors: {
         "header": "#212026",
      }
    },
  },
  plugins: [],
}
