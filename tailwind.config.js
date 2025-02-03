/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other config
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        marquee: 'marquee 40s linear infinite',
        marquee2: 'marquee2 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        marquee2: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
      },
      opacity: {
        '15': '0.15',
      }
    },
  },
  // ... other config
} 