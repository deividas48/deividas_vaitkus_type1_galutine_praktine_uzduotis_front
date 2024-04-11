/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      screens: {
        sm: '350px', // mobilus iki
        md: '768px', // plansetes iki
        lg: '1024px', // desktopas iki
        xl: '1500px', // super platus iki
      },
    },
  },
  plugins: [],
};
