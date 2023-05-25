const colors = require("tailwindcss/colors");
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': {'max': '374px'},
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ['proxima-nova', 'ui-sans-serif', 'system-ui', ...defaultTheme.fontFamily.sans],
      serif: ['Merriweather', 'ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      display: ['Burbank Big', 'proxima-nova', ...defaultTheme.fontFamily.sans],
      body: ['proxima-nova', 'ui-sans-serif', 'system-ui', ...defaultTheme.fontFamily.sans]
    },
    container: {
      center: true,
    },
    extend: {
      grayscale: {
        70: '50%',
        50: '50%',
        30: '30%',
      },
      saturate: {
        20: '20%',
      },
      fontSize: {
        'xxs': '.65rem',
        'xxxs': '.55rem',
      },
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
        image: '4 / 3',
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '25': '6.25rem',
        '26': '6.5rem',
        '29': '7.25rem',
        '30': '7.5rem',
        '31': '7.75rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          50: '#6f81eb',
          100: '#4B61E6',
          200: '#3c4eb8',
        },
        secondary: {
          50: '#515275',
          100: '#252752',
          200: '#1e1f42',
        },
        success: {
          50: '#88c070',
          100: '#6ab04c',
          200: '#558d3d',
        },
        info: {
          50: '#96b3ff',
          100: '#7CA0FF',
          200: '#6380cc',
        },
        warning: {
          50: '#f3a955',
          100: '#F0932B',
          200: '#c07622',
        },
        danger: {
          50: '#ef716f',
          100: '#EB4D4B',
          200: '#bc3e3c',
        },
        default: {
          50: '#e5ebed',
          100: '#DFE6E9',
          200: '#b2b8ba',
        },
        news: {
          50: '#ff3685',
          100: '#FF0467',
          200: '#cc0352',
        },
        'quiz':{
          'success': '#BFF199',
          'fail': '#FFD3D1',
          'yellow': '#FECA57'
        },
        'light': '#5c5f98',
        'dark': '#121212',
        'light-dark': '#262626',
        'global-site': '#EEF3F7',
        'global-app': '#EEF3F7',
        'modal-tematica': '#2c2c41',
        'sidebar-color': '#4D4F7F',
        'indigo-cm': '#4D4F7F',
        'orange-cm': '#EB8625',
        'purple-cm': '#312E81',
        titles: '#32323F',
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
        gray: colors.neutral,
        rose: colors.rose,
        orange: colors.orange,
        teal: colors.teal,
        lime: colors.lime,
        fuchsia: colors.fuchsia,
        'true-gray': colors.neutral,
        'midnight': '#121063',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        palette: {
          light: {
            bg: '#EEF3F7',
            tint: '#5c5f98',
            default: '#4D4F7F',
            active: '#3e3f66'
          },
          dark: {
            bg: '#121212',
            tint: '#232323',
            default: '#020202',
            active: '#323232'
          },
        },
        panel: '#EEF3F7',
        nivelation: {
          init: '#6084EA',
          end: '#7A51B5'
        },
        duels: {
          init: '#1C032B',
          end: '#54137B',
          green: '#B8E986'
        },
      },
      textShadow: {
        default: "0 2px 0 #000",
        md: "0 2px 2px #000",
        h2: "0 0 3px #FF0000, 0 0 5px #0000FF",
        h1: "0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)",
      },
      animation: {
        'gradient-move': 'gradient-move 10s linear infinite',
      },
      keyframes: {
        'gradient-move': {
          '0%': { 'background-position': '0% 0%' },
          '100%': { 'background-position': '100% 0%' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}