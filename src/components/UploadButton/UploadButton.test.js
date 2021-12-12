import { render, screen } from '@testing-library/react';
import App from './../../App';

test('Test UploadButton', () => {
  const { container } = render(<App />);

  const component = screen.getByTestId('UploadButton');
  expect(component).toBeInTheDocument();

  const importEl = screen.getAllByText('Add SVG Files');
  expect(importEl.length).toBe(1);

  const inputEl = container.querySelector('#upload-input');
  expect(inputEl.tagName).toBe('INPUT');
  expect(inputEl.type).toBe('file');
});
