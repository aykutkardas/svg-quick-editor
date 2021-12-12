import { render, screen } from '@testing-library/react';
import App from './../../App';

test('Test IconList component without Files', () => {
  render(<App />);

  const IconListComponent = screen.getByTestId('IconList');
  expect(IconListComponent).toBeInTheDocument();

  const brandEl = screen.getAllByText('SVG Quick Action');
  expect(brandEl.length).toBe(1);

  const filesTitleEl = screen.getAllByText('Files');
  expect(filesTitleEl.length).toBe(1);

  const IconListItemComponent = screen.getByTestId('IconListItem1');
  expect(IconListItemComponent).toBeInTheDocument();
});
