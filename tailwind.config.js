/* eslint-disable no-undef */
import { nextui } from '@nextui-org/react'
/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./*.{html,js}",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/preline/dist/*.js',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#024a34',
        secondary:"#dba737",
        primary_green:"#ddffb3",
        primary_purple:'#8F00FF',
        danger:'#c92e43',
        danger2:'#638eeb'
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
        'scroll-reverse': 'scroll-reverse 30s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'scroll-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      fontFamily: {
        'carattere': ['Carattere', 'cursive'], 
        'angkor': ["Angkor", 'serif'], 
        'calistoga': ["Calistoga", 'serif'], 
        'carter-one': ["Carter One", 'system-ui'], 
        'jomhuria': ["Jomhuria", 'serif'], 
        'poltawski': ["Poltawski Nowy", 'serif'], 
        'inria-serif': ["Inria Serif", 'serif'], 
        'agbalumo': ["Agbalumo", 'system-ui'], 
      },
      screens: {
        'xsm': '350px',
        '3xl': '1700px',
      },
      animation: {
        'heart-beat': 'heartBeat 0.5s ease-in-out',
      },
      keyframes: {
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [
    require('preline/plugin'),
    nextui(),
    require('tailwindcss-animated')
  ],
}

