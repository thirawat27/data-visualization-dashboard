/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", 
  ],
  theme: {
    extend: {
      fontFamily: {
        // คลาสที่ใช้: "font-prompt"
        'prompt': ['Prompt', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

