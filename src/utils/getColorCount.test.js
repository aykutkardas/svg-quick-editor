import getColorCount from './getColorCount';

test('Test getColorCount util with exist color', () => {
  const file = {
    fills: ['white', 'green', 'black', 'gray', 'gray', 'green'],
  };

  const result = getColorCount(file, 'green');
  expect(result).toBe(2);
});

test('Test getColorCount util with non-exist color', () => {
  const file = {
    fills: ['white', 'green', 'black', 'gray', 'gray', 'green'],
  };

  const result = getColorCount(file, 'blue');
  expect(result).toBe(0);
});

test('Test getColorCount util with empty fills', () => {
  const file = {
    fills: [],
  };

  const result = getColorCount(file, 'gray');
  expect(result).toBe(0);
});
