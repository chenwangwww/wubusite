/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 扫描所有 Vue/JS/TS 文件
  ],
  theme: {
    extend: {
      colors: {
      },
      screens: {
        '2xl': '1440px'
      }
    },
  },
  plugins: [],
}