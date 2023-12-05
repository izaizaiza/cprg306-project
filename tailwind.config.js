/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors:{
        'custom-black-pearl': '#031927',
        'custom-blue-light': '#0a75ad',
        'custom-pearl':'#fff6fa',
        'custom-milano-red': '#BA1200',
        'custom-pink': '#FF69B4',
        'custom-yellow': '#FFF242',
        'custom-violet': '#5500ff',
        'custom-dark-gray':'#3E363F',
        'custom-avocado': '#73A580',
        'custom-forest-green': '#1B402F',
        'custom-soft-blue-gray':'#B7C9E2',
        'custom-neon-blue': '#2272FF',
        'custom-black':'#1D1D1',
        'custom-gray-lilac':'#'
      }
    },
  },
  plugins: [],
}
