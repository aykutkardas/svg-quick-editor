import { render, screen } from '@testing-library/react';
import App from '../../App';

test('Test Editor component', () => {
  render(<App />);

  const component = screen.getByTestId('Editor');
  expect(component).toBeInTheDocument();

  const addSVGFilesEl = screen.getByText(/Add SVG Files/i);
  const importJSONEl = screen.getByText(/Import JSON/i);
  const colorGroupsTitleEl = screen.getByText(/Color Groups/i);
  const pathsTitleEl = screen.getByText(/Paths/i);

  expect(addSVGFilesEl).toBeInTheDocument();
  expect(importJSONEl).toBeInTheDocument();
  expect(colorGroupsTitleEl).toBeInTheDocument();
  expect(pathsTitleEl).toBeInTheDocument();
});
