/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Baby Blue - Light backgrounds and accents
        'baby-blue': {
          DEFAULT: '#e1ecf0',
          light: '#f0f6f8',
          dark: '#c8dce3',
        },
        // Blue Grotto - Primary actions and highlights
        'blue-grotto': {
          DEFAULT: '#54a2d2',
          dark: '#3d8ab8',
          light: '#6fb3db',
          glow: 'rgba(84, 162, 210, 0.3)',
        },
        // Aquamarine - Secondary elements
        'aquamarine': {
          DEFAULT: '#a9cee8',
          dark: '#8ab8d4',
          light: '#c1dcf0',
          glow: 'rgba(169, 206, 232, 0.3)',
        },
        // Navy Blue - Text and strong accents
        'navy': {
          DEFAULT: '#003a64',
          dark: '#002844',
          light: '#005080',
          glow: 'rgba(0, 58, 100, 0.3)',
        },
        // Aliases for easier migration
        primary: {
          DEFAULT: '#54a2d2',
          dark: '#3d8ab8',
          light: '#6fb3db',
          glow: 'rgba(84, 162, 210, 0.3)',
        },
        secondary: {
          DEFAULT: '#a9cee8',
          dark: '#8ab8d4',
          light: '#c1dcf0',
          glow: 'rgba(169, 206, 232, 0.3)',
        },
        accent: {
          DEFAULT: '#003a64',
          dark: '#002844',
          light: '#005080',
          glow: 'rgba(0, 58, 100, 0.3)',
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
          '0%': { boxShadow: '0 0 20px rgba(84, 162, 210, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(84, 162, 210, 0.6)' },
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
        'glass': '0 8px 32px 0 rgba(0, 58, 100, 0.1)',
        'glow-primary': '0 0 20px rgba(84, 162, 210, 0.4)',
        'glow-secondary': '0 0 20px rgba(169, 206, 232, 0.4)',
        'glow-accent': '0 0 20px rgba(0, 58, 100, 0.4)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
