/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light": '#808080',
        "dark": '#A9A9A9',
      }
    },
  },
  plugins: [],
}