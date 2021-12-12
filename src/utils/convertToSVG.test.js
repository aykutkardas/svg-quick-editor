import convertToSVG from './convertToSVG';

test('Test convertToSVG util', () => {
  const file = {
    name: 'test.svg',
    width: 100,
    height: 100,
    viewBox: '0 0 32 32',
    paths: ['A', 'B', 'C', 'D'],
    fills: ['white', 'green', 'black', 'gray'],
  };

  const result = convertToSVG(file, 1);
  expect(result).toBe(
    `<svg viewbox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">` +
      `<path d="A" fill="white"></path>` +
      `<path d="B" fill="green"></path>` +
      `<path d="C" fill="black"></path>` +
      `<path d="D" fill="gray"></path>` +
      `</svg>`,
  );
});

test('Test convertToSVG util without file', () => {
  const file = null;
  const result = convertToSVG(file);
  expect(result).toBe(undefined);
});
