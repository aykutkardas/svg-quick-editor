/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        txt: {
          1: '#d5dae3',
          2: '#a2abb8',
          3: '#717c8e',
          4: '#515a68',
          5: '#8491a3',
          6: '#3a4150',
        },
        surface: {
          1: '#0b0d14',
          2: '#1e2030',
          3: '#171926',
          4: '#272a3a',
        },
        panel: '#2d3045',
        accent: '#5de4c7',
        edge: {
          t: '#3a3e55',
          x: '#282b3d',
          b: '#161828',
        },
      },
    },
  },
  plugins: [],
};
