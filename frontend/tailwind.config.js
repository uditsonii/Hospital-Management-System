// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        slideUp: 'slideUp 0.8s ease-out forwards',
        zoomIn: 'zoomIn 0.9s ease-out forwards',
        slideRight: 'slideRight 1s ease-out forwards',
         bounceInUp: 'bounceInUp 0.8s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        slideRight: {
          '0%': { transform: 'translateX(-50px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        bounceInUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '60%': { opacity: '1', transform: 'translateY(-20%)' },
          '80%': { transform: 'translateY(10%)' },
          '100%': { transform: 'translateY(0)' },
        },
      
fadeInUp: {
  '0%': { opacity: 0, transform: 'translateY(40px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
},

      },
    },
  },
  plugins: [],
};
