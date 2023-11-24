/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,css}",
            'node_modules/preline/dist/*.js'
],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin')

  ],
}

