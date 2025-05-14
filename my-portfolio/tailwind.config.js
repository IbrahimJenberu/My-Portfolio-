/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter var', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          display: ['Space Grotesk', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
        colors: {
          brand: {
            50: '#eef6ff',
            100: '#d9eaff',
            200: '#bbd8ff',
            300: '#8abbff',
            400: '#5295ff',
            500: '#2d70f9', // Primary brand color
            600: '#1c55db',
            700: '#1a43b4',
            800: '#1b3993',
            900: '#1e3377',
            950: '#162046',
          },
          indigo: {
            50: '#eef2ff',
            100: '#e0e7ff',
            200: '#c7d2fe',
            300: '#a5b4fc',
            400: '#818cf8',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
            800: '#3730a3',
            900: '#312e81',
            950: '#1e1b4b',
          },
          sapphire: {
            50: '#f0f6fe',
            100: '#ddeafe',
            200: '#c3d7fc',
            300: '#9bbcf9',
            400: '#6c99f4',
            500: '#4a78ed',
            600: '#3058e0', // Muted sapphire
            700: '#2843c4',
            800: '#253aa0',
            900: '#25367f',
            950: '#1a2250',
          },
          teal: {
            50: '#effffd',
            100: '#d5fffa',
            200: '#aefff6',
            300: '#74ffef',
            400: '#33f5e4',
            500: '#0adeca', // Soft teal accents
            600: '#00bba9',
            700: '#009489',
            800: '#067770',
            900: '#0a625c',
            950: '#00403c',
          },
          night: {
            50: '#f6f8fc',
            100: '#edf1f8',
            200: '#d8deef',
            300: '#b6c2e0',
            400: '#8fa0cd',
            500: '#7180ba',
            600: '#5c67a5',
            700: '#4d5688',
            800: '#414a72',
            900: '#141a33', // Custom dark background
            950: '#0a0f1f',
          },
          success: {
            50: '#f0fdf4',
            500: '#22c55e',
            600: '#16a34a'
          },
          error: {
            50: '#fef2f2',
            500: '#ef4444',
            600: '#dc2626'
          }
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'ai-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d70f9' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          'gradient-mesh': 'radial-gradient(at 0% 0%, rgba(45, 112, 249, 0.15) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(10, 222, 202, 0.15) 0, transparent 50%)',
          'hero-gradient': 'linear-gradient(to right, #0a0f1f, #1e3377, #1a43b4, #2d70f9)',
        },
        animation: {
          'gradient-x': 'gradient-x 15s ease infinite',
          'gradient-y': 'gradient-y 15s ease infinite',
          'gradient-xy': 'gradient-xy 15s ease infinite',
          'float': 'float 6s ease-in-out infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-slow': 'bounce 3s infinite',
          'wiggle': 'wiggle 1s ease-in-out infinite',
          'slide-up': 'slide-up 0.5s ease-out',
          'slide-down': 'slide-down 0.5s ease-out',
          'slide-left': 'slide-left 0.5s ease-out',
          'slide-right': 'slide-right 0.5s ease-out',
          'fade-in': 'fade-in 0.5s ease-out',
          'fade-out': 'fade-out 0.5s ease-out',
          'spin-slow': 'spin 6s linear infinite',
        },
        keyframes: {
          'gradient-x': {
            '0%, 100%': {
              'background-size': '200% 200%',
              'background-position': 'left center'
            },
            '50%': {
              'background-size': '200% 200%',
              'background-position': 'right center'
            },
          },
          'gradient-y': {
            '0%, 100%': {
              'background-size': '200% 200%',
              'background-position': 'center top'
            },
            '50%': {
              'background-size': '200% 200%',
              'background-position': 'center bottom'
            },
          },
          'gradient-xy': {
            '0%, 100%': {
              'background-size': '200% 200%',
              'background-position': 'left top'
            },
            '50%': {
              'background-size': '200% 200%',
              'background-position': 'right bottom'
            },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          wiggle: {
            '0%, 100%': { transform: 'rotate(-3deg)' },
            '50%': { transform: 'rotate(3deg)' },
          },
          'slide-up': {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          'slide-down': {
            '0%': { transform: 'translateY(-20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          'slide-left': {
            '0%': { transform: 'translateX(20px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
          'slide-right': {
            '0%': { transform: 'translateX(-20px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
          'fade-in': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          'fade-out': {
            '0%': { opacity: '1' },
            '100%': { opacity: '0' },
          },
        },
        boxShadow: {
          'neumorph': '10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff',
          'neumorph-dark': '10px 10px 20px #0a0f1f, -10px -10px 20px #141a33',
          'highlight': '0 0 15px rgba(45, 112, 249, 0.5)',
          'glow': '0 0 20px rgba(45, 112, 249, 0.4)',
          'glow-teal': '0 0 20px rgba(10, 222, 202, 0.4)',
          'elegant': '0 4px 30px rgba(0, 0, 0, 0.05)',
          'elegant-dark': '0 4px 30px rgba(0, 0, 0, 0.2)',
          'card': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
          'card-hover': '0 20px 40px -5px rgba(0, 0, 0, 0.15)',
          'card-dark': '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
          'card-hover-dark': '0 20px 40px -5px rgba(0, 0, 0, 0.4)',
        },
        typography: {
          DEFAULT: {
            css: {
              maxWidth: '100ch',
              lineHeight: 1.75,
            },
          },
        },
        borderRadius: {
          '2xl': '1rem',
          '3xl': '1.5rem',
          '4xl': '2rem',
        },
        screens: {
          '3xl': '1920px',
        },
        transitionTimingFunction: {
          'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
          'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
          'bounce-gentle': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
      },
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  }