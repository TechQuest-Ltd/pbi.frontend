/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import aspectRatio from '@tailwindcss/aspect-ratio';
import animate from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,jsx,mdx}',
    './src/components/**/*.{js,jsx,mdx}',
    './src/app/**/*.{js,jsx,mdx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    colors: {
      ...colors,
      primary: '#141B34', 
      secondary: '#edba2b',
      background: '#FAF8FF',
      muted: '#898989',
      mutedForeground: '#E4E4E7',
      dark: '#000000',
      white: '#ffffff',
      accent: '#FF00B3',
      error: ''
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        heading: ['HostGrotesk', 'sans-serif'],
        body: ['HostGrotesk', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s ease-in-out',
        'accordion-up': 'accordion-up 0.2s ease-in-out',
        shimmer: 'shimmer 1s infinite linear',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [aspectRatio, animate],
};

export default config;