// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
    './static/js/**/*.js',
    './assets/js/**/*.js',
    './**/*.html',
  ],
  theme: {
    extend: {
        colors: {
            'custom-blue' : '#4A90E2',
        }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), 
  ],
}