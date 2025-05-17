import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0070f3',
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0070f3',
          600: '#005ad1',
          700: '#0045af',
          800: '#00308c',
          900: '#001c6a',
        },
        secondary: {
          DEFAULT: '#7928ca',
          50: '#f3e8ff',
          100: '#e8d1ff',
          200: '#d0a3ff',
          300: '#b975ff',
          400: '#a147ff',
          500: '#8928ff',
          600: '#7928ca',
          700: '#6020a2',
          800: '#48177a',
          900: '#300d52',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}

export default config
