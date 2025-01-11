/** @type {import('tailwindcss').Config} */
export default {
   // other configuration options
   content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    // Add other file types or directories as needed
  ],
  theme: {
    extend: {
      keyframes: {
        'background-animation': {
          '0%': { backgroundColor: '#f4f4f4' },
          '50%': { backgroundColor: '#e0e0e0' },
          '100%': { backgroundColor: '#f4f4f4' },
        },
      },
      animation: {
        'background-animation': 'background-animation 5s ease-in-out infinite',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['hover'],
      backgroundColor: ['hover'],
    },
  },
  plugins: [],
}

