/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#08090D",
        foreground: "#F8FAFC",
        card: {
          DEFAULT: "rgba(15, 17, 26, 0.6)",
          foreground: "#F8FAFC",
          border: "rgba(255, 255, 255, 0.08)"
        },
        brand: {
          cyan: "#00F2FE",
          purple: "#7F00FF",
          accent: "#3B82F6"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'glow-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-flow': 'glowFlow 8s ease infinite',
      },
      keyframes: {
        glowFlow: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        }
      }
    },
  },
  plugins: [],
}
