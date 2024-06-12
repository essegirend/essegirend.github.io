/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 10s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        }
      },
      fontFamily:{
        baion : '"Bayon", "sans-serif"',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require('flowbite/plugin')],
}

