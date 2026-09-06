/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
        'mobile-landscape': { 'raw': '(max-height: 500px) and (orientation: landscape)' },
        'tablet-portrait': { 'raw': '(min-width: 640px) and (max-width: 1024px) and (orientation: portrait)' },
        'tablet-landscape': { 'raw': '(min-width: 768px) and (max-width: 1366px) and (orientation: landscape)' },
        'laptop': '1024px',
        'desktop': '1280px',
        'tv': '1920px',
        'ultrawide': { 'raw': '(min-aspect-ratio: 21/9), (min-width: 2200px)' },
      },
      aspectRatio: {
        'cinema': '21 / 9',
        'ultrawide': '32 / 9',
        'ipad': '4 / 3',
        'ipad-portrait': '3 / 4',
        'mobile': '9 / 19.5',
      },
      maxWidth: {
        'tv-wide': '1780px',
        'ultrawide': '92vw',
      },
      fontFamily: {
        'display': ['"Outfit"', 'sans-serif'],
        'body': ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'accent-primary': '#8B5CF6',
        'accent-secondary': '#C026D3',
        'accent-tertiary': '#4F46E5',
      },
      fontSize: {
        'hero': ['clamp(3.4rem, 8.5vw, 6.8rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'hero-tv': ['clamp(5.5rem, 8vw, 10.5rem)', { lineHeight: '0.94', letterSpacing: '-0.04em' }],
        'hero-mobile': ['clamp(2.4rem, 11vw, 3.6rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'section-h': ['clamp(2.0rem, 4.2vw, 3.2rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'card-h': ['clamp(1.25rem, 2.0vw, 1.6rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      borderRadius: {
        'card': '16px',
        'btn': '10px',
      }
    },
  },
  plugins: [],
}
