/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        txt: {
          1: '#e5e5e5',
          2: '#a3a3a3',
          3: '#737373',
          4: '#525252',
          5: '#a3a3a3',
          6: '#404040',
        },
        surface: {
          1: '#171717',
          2: '#262626',
          3: '#171717',
          4: '#404040',
        },
        panel: '#404040',
        accent: '#5de4c7',
        edge: {
          t: '#525252',
          x: '#404040',
          b: '#171717',
        },
      },
    },
  },
  plugins: [],
};
