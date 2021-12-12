import { render, screen } from '@testing-library/react';
import App from './App';

test('Test IconList component', () => {
  render(<App />);
  const addSVGFilesEl = screen.getByText(/Add SVG Files/i);
  const importJSONEl = screen.getByText(/Import JSON/i);
  expect(addSVGFilesEl).toBeInTheDocument();
  expect(importJSONEl).toBeInTheDocument();
});

test('Test EditorTool component', () => {
  render(<App />);
  const colorGroupsTitleEl = screen.getByText(/Color Groups/i);
  const pathsTitleEl = screen.getByText(/Paths/i);
  expect(colorGroupsTitleEl).toBeInTheDocument();
  expect(pathsTitleEl).toBeInTheDocument();
});
