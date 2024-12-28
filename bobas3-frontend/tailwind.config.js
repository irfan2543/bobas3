/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.{html,js}',
    './index.html',
  ],
  theme: {
    extend: {
      height: {
        '130' : '35rem',
        '190' : '50rem'
      }
    },
  },
  plugins: [],
}

