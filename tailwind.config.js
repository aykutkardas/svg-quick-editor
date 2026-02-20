/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        txt: {
          1: '#ffffff',
          2: '#c8c3bc',
          3: '#bdc3bc',
          4: '#777777',
          5: '#aaaaaa',
          6: '#444444',
        },
        surface: {
          1: '#282c34',
          2: '#1a1e22',
          3: '#20232a',
          4: '#23272e',
        },
        panel: '#333333',
      },
    },
  },
  plugins: [],
};
