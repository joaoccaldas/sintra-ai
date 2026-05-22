import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0E2A44',
          mid: '#1B4F7A',
          light: '#2D6EA0',
        },
        teal: {
          DEFAULT: '#2A7D7D',
          dark: '#1A5C5C',
          light: '#3D9D9D',
          xlight: '#E0F2F2',
        },
        cream: {
          DEFAULT: '#F7F2EA',
          light: '#FAFAF8',
          dark: '#EDE5D8',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
