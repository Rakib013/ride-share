/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      extend: {
        backdropFilter: {
          'none': 'none',
          'blur': 'blur(20px)',
        },
        colors: {
          primary: '#3B82F6',
          secondary: '#10B981',
          dark: '#1F2937',
        },
      },
    },
    plugins: [],
  };
  