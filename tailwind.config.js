/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
      colors: {
        primary: '#FF6B35',    // Warm Orange (appetizing)
        secondary: '#4A8646',  // Forest Green (fresh ingredients)
        accent: '#FFC045',     // Golden Yellow (warm and inviting)
        background: '#FFF9EE', // Soft Cream (light and clean)
        text: '#2C3E50',       // Dark Slate Gray (easy to read)
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};