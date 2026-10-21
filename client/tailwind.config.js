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
        'app-bg': '#0B0F14',
        'section-bg': '#121821',
        'card-bg': '#161D27',
        'elevated-bg': '#1B2430',
        'border-color': '#2A3442',
        dark: {
          950: '#0B0F14', // Main Page Background
          900: '#121821', // Secondary / Section Background
          800: '#161D27', // Card Background
          700: '#1B2430', // Elevated Surface
          600: '#2A3442', // Border / Divider
          500: '#3A4759',
        },
        neon: {
          green: '#C6FF00',
          secondary: '#9BEA00',
          lime: '#9BEA00',
          hover: '#B5EA00',
          glow: 'rgba(198, 255, 0, 0.22)',
        },
        tech: {
          cyan: '#28D7FF',
        },
        text: {
          main: '#F5F7FA',
          sub: '#B8C2CF',
          muted: '#7E8A99',
        },
        accent: {
          emerald: '#10B981',
          cyan: '#28D7FF',
          purple: '#8B5CF6',
          orange: '#FF9F43',
          rose: '#FF5252',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
