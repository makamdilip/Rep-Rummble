/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00FF88',
          dark: '#00CC70',
          light: '#33FFAA',
          glow: 'rgba(0, 255, 136, 0.3)',
        },
        secondary: {
          DEFAULT: '#FF6B00',
          dark: '#CC5500',
          light: '#FF8833',
          glow: 'rgba(255, 107, 0, 0.3)',
        },
        accent: {
          DEFAULT: '#9D4EDD',
          dark: '#7D3EBD',
          light: '#BD6EFD',
          glow: 'rgba(157, 78, 221, 0.3)',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          lighter: '#1a1a1a',
          card: 'rgba(26, 26, 26, 0.6)',
          border: 'rgba(255, 255, 255, 0.1)',
          glass: 'rgba(20, 20, 20, 0.7)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-primary': '0 0 20px rgba(0, 255, 136, 0.4)',
        'glow-secondary': '0 0 20px rgba(255, 107, 0, 0.4)',
        'glow-accent': '0 0 20px rgba(157, 78, 221, 0.4)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
