import { render, screen } from '@testing-library/react';
import App from './../../App';

test('Test ExportButton component without Files', () => {
  render(<App />);

  const component = screen.getByTestId('ExportButton');
  expect(component).toBeInTheDocument();
});
