import { render, screen } from '@testing-library/react';
import App from './../../App';

test('Test IconList component without Files', () => {
  render(<App />);

  const IconListComponent = screen.getByTestId('IconList');
  expect(IconListComponent).toBeInTheDocument();

  const brandEl = screen.getByAltText('zap');
  expect(brandEl).toBeInTheDocument();

  const filesTitleEl = screen.getAllByText('Files');
  expect(filesTitleEl.length).toBe(1);

  const IconListItemComponent = screen.getByTestId('IconListItem1');
  expect(IconListItemComponent).toBeInTheDocument();
});
