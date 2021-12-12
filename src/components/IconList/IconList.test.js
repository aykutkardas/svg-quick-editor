import { render, screen } from '@testing-library/react';
import App from './../../App';

test('Test IconList component without Files', () => {
  const { container } = render(<App />);

  const component = screen.getByTestId('IconList');
  expect(component).toBeInTheDocument();

  const brandEl = screen.getAllByText('SVG Quick Action');
  expect(brandEl.length).toBe(1);

  const filesTitleEl = screen.getAllByText('Files');
  expect(filesTitleEl.length).toBe(1);

  const filesItemEls = container.querySelector("[data-testid='IconListItem']");
  expect(filesItemEls).toBe(null);
});
