import {
  PAGE_TURN_MS,
  LEAF_ENTER_MS,
  COVER_CLOSE_MS,
} from './src/styles/book-motion.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#102B4E',
        cream: '#FFFFFF',
        lilac: '#EBF0F6',
        coral: '#B68B19',
        sunny: '#F3CD52',
        mint: '#DDE7F1',
        book: {
          ink: '#223c46',
          desk: '#eeeae2',
          cover: '#193e48',
          gold: '#e9dba9',
          focus: '#b8893d',
          hint: '#8b897e',
          selected: '#e5e7d9',
          'selected-ink': '#294c4e',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Libre Caslon Display', 'Georgia', 'serif'],
      },
      // Exact existing boundaries; max-width queries include their endpoint.
      screens: {
        wide: { min: '1500px' },
        'short-desktop': { raw: '(min-width: 1100px) and (max-height: 850px)' },
        compact: { max: '1000px' },
        tablet: { max: '800px' },
        bookmarks: { max: '720px' },
        mobile: { max: '480px' },
        tiny: { max: '400px' },
      },
      keyframes: {
        'hardcover-open': {
          from: { transform: 'translateZ(4px) rotateY(0)' },
          to: { transform: 'translateZ(4px) rotateY(-155deg)' },
        },
        'hardcover-close': {
          from: { transform: 'translateZ(4px) rotateY(-110deg)' },
          to: { transform: 'translateZ(4px) rotateY(0)' },
        },
        'leaf-out': {
          from: { transform: 'rotateY(0)' },
          to: { transform: 'rotateY(-100deg)' },
        },
        'leaf-out-back': {
          from: { transform: 'rotateY(0)' },
          to: { transform: 'rotateY(100deg)' },
        },
        'leaf-in': {
          from: { transform: 'rotateY(85deg)' },
          to: { transform: 'rotateY(0)' },
        },
        'leaf-in-back': {
          from: { transform: 'rotateY(-85deg)' },
          to: { transform: 'rotateY(0)' },
        },
        'leaf-shading': { from: { opacity: '0' }, to: { opacity: '.65' } },
      },
      animation: {
        'hardcover-open': `hardcover-open ${PAGE_TURN_MS}ms cubic-bezier(.45,.05,.4,1) both`,
        'hardcover-close': `hardcover-close ${COVER_CLOSE_MS}ms cubic-bezier(.15,.6,.25,1) both`,
        'leaf-out': `leaf-out ${PAGE_TURN_MS}ms cubic-bezier(.45,.05,.4,1) both`,
        'leaf-out-back': `leaf-out-back ${PAGE_TURN_MS}ms cubic-bezier(.45,.05,.4,1) both`,
        'leaf-in': `leaf-in ${LEAF_ENTER_MS}ms cubic-bezier(.15,.6,.25,1) both`,
        'leaf-in-back': `leaf-in-back ${LEAF_ENTER_MS}ms cubic-bezier(.15,.6,.25,1) both`,
        'leaf-shading-out': `leaf-shading ${PAGE_TURN_MS}ms ease-in both`,
        'leaf-shading-in': `leaf-shading ${LEAF_ENTER_MS}ms ease-out reverse both`,
      },
    },
  },
  plugins: [],
}
