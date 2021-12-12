import removePathByIndex from './removePathByIndex';

test('Test removePathByIndex util', () => {
  const file = {
    paths: ['A', 'B', 'C', 'D'],
    fills: ['white', 'green', 'black', 'gray'],
  };

  const result = removePathByIndex(file, 1);
  expect(result.paths.length).toBe(3);
  expect(result.fills.length).toBe(3);

  expect(result.paths[1]).toBe('C');
  expect(result.fills[1]).toBe('black');
});

test('Test removePathByIndex util with non-exist index', () => {
  const file = {
    paths: ['A', 'B', 'C', 'D'],
    fills: ['white', 'green', 'black', 'gray'],
  };

  const result = removePathByIndex(file, 5);
  expect(result.paths.length).toBe(4);
  expect(result.fills.length).toBe(4);
});
