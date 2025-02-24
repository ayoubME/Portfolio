/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
      colors: {
        orange: {
          500: '#ff9800',
        },
      },
    },
  },
  safelist: [
    'text-green-500',
    'text-red-500',
    'text-blue-500',
    'text-yellow-500',
    'text-purple-500',
    'text-cyan-500',
    'text-white',
    'text-orange-500',
    'border-green-500',
    'border-red-500',
    'border-blue-500',
    'border-yellow-500',
    'border-purple-500',
    'border-cyan-500',
    'border-white',
    'border-orange-500',
    'bg-green-500',
    'bg-red-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-cyan-500',
    'bg-white',
    'bg-orange-500',
    'hover:bg-green-500',
    'hover:bg-red-500',
    'hover:bg-blue-500',
    'hover:bg-yellow-500',
    'hover:bg-purple-500',
    'hover:bg-cyan-500',
    'hover:bg-white',
    'hover:bg-orange-500',
  ],
  plugins: [],
}