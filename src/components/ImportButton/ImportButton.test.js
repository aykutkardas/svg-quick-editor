import { render, screen } from '@testing-library/react';
import App from './../../App';

test('Test ImportButton', () => {
  const { container } = render(<App />);

  const component = screen.getByTestId('ImportButton');
  expect(component).toBeInTheDocument();

  const importEl = screen.getAllByText('Import JSON');
  expect(importEl.length).toBe(1);

  const inputEl = container.querySelector('#import-input');
  expect(inputEl.tagName).toBe('INPUT');
  expect(inputEl.type).toBe('file');
});
