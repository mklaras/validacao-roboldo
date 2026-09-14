/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#132238',
        brand: { 50: '#eef6ff', 100: '#d9eaff', 500: '#1671c5', 600: '#095fae', 700: '#084b88' },
      },
      boxShadow: { card: '0 16px 50px rgba(19, 34, 56, 0.08)' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
