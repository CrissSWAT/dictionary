/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'], // Fuente predeterminada
        'serif': ['Georgia', 'serif'], // Primera fuente alternativa
        'mono': ['Courier New', 'monospace'] // Segunda fuente alternativa
      }
    }
  },
  plugins: [],
}

