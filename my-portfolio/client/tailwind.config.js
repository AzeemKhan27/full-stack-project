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
    extend: {},
  },
  variants: {
    extend: {
      textColor: ['hover'],
      backgroundColor: ['hover'],
    },
  },
  plugins: [],
}

