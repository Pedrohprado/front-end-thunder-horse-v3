/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      animation: {
        animationleft: 'animationleft 0.5s forwards',
        animationup: 'animationup 0.3s forwards',
      },
      keyframes: {
        animationleft: {
          to: { opacity: 1, transform: 'initial' },
        },
        animationup: {
          to: { opacity: 1, transform: 'initial' },
        },
      },
    },
  },
  plugins: [],
};
