/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '100%', // mobilus iki
          md: '100%', // plansetes iki
          lg: '100%', // desktopas iki
          xl: '100%', // super platus iki
        }, // Ensure the container is full width and expands consistently
      },
      screens: {
        sm: '350px', // Mobile up to
        md: '768px', // Tablet up to
        lg: '1024px', // Desktop up to
        xl: '1500px', // Super wide up to
      }, // Set up screen sizes for responsive design
      colors: {
        'custom-primary-color': '#ff3c48',
        'custom-gray-color': '#646464',
        'custom-color-secondary': '#CC1119',
        'custom-color-grey2': '#CCCCCC',
      },
    },
  },
  plugins: [],
};
