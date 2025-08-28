/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
   theme: {
    extend: {
      keyframes: {
        rotate360: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        loader: 'rotate360 1s linear infinite',
      },
    },
  },
  plugins: [],
}

