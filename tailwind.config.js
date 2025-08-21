/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 扫描所有 Vue/JS/TS 文件
  ],
  safelist: [
    {
      pattern: /grid-cols-./, // 这会匹配并生成 grid-cols-1 到 grid-cols-9
      variants: ['md'],
    },
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