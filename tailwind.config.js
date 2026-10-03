/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vastriya: {
          50: '#fdf5f5',
          100: '#fbe8e8',
          200: '#f7d5d5',
          300: '#efb3b4',
          400: '#e38487',
          500: '#d15b60',
          600: '#b73c42',
          700: '#942b31',
          800: '#7a272c',
          900: '#581c25', // Primary Vastriya Deep Maroon
          950: '#380e14',
        },
        gold: {
          50: '#fffdf5',
          100: '#fefbe6',
          200: '#fcf3bf',
          300: '#fae68c',
          400: '#f5d454',
          500: '#d4af37', // Metallic Gold Accent
          600: '#c59b27',
          700: '#9c731b',
          800: '#7e5a1d',
          900: '#674a1d',
        },
        brand: {
          50: '#fdf5f5',
          100: '#fbe8e8',
          500: '#942b31',
          600: '#7a272c',
          700: '#581c25',
          800: '#48151c',
          900: '#380e14',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
