const { mauve, violet } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'node': 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        'node-header': 'linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08))'
      },
      colors: {
        'background': '#121212',
        ...mauve,
        ...violet,
      },
      fontSize: {
        xxs: ['8px', '10px']
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      keyframes: {
        slideDown: {
          from: { maxHeight: 0 },
          to: { maxHeight: '500px' },
        },
        slideUp: {
          from: { maxHeight: '500px' },
          to: { maxHeight: 0 },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  safelist: [
    'text-blue-500',
    'text-gray-500'
  ],
  plugins: [],
}
