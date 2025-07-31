/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff00',
        'neon-blue': '#1e90ff',
        'neon-blue-dark': '#1c86ee',
        'dark-bg': '#1a1a1a',
      },
      fontFamily: {
        'Press_Start_2P': ['"Press Start 2P"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}