/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        txt: {
          1: '#d4d4d8',
          2: '#a1a1aa',
          3: '#71717a',
          4: '#52525b',
          5: '#a1a1aa',
          6: '#3f3f46',
        },
        surface: {
          1: '#09090b',
          2: '#18181b',
          3: '#131315',
          4: '#27272a',
        },
        panel: '#27272a',
        accent: '#5de4c7',
        edge: {
          t: '#3f3f46',
          x: '#27272a',
          b: '#131315',
        },
      },
    },
  },
  plugins: [],
};
