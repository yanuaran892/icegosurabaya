/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'ice-light': '#FFF3E0',
        'ice-medium': '#FFB74D',
        'ice-primary': '#F57C00',
        'ice-dark': '#E65100',
        'ice-accent': '#FF9800',
      },
      boxShadow: {
        'ice': '0 4px 14px 0 rgba(245, 124, 0, 0.1)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'ice-gradient': 'linear-gradient(to right, #FFF3E0, #FFE0B2, #FFF3E0)',
      },
    },
  },
  plugins: [],
};