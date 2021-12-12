import { render, screen } from '@testing-library/react';
import App from '../../App';

test('Test ColorGroups component', () => {
  render(<App />);
  const component = screen.getByTestId('ColorGroups');
  expect(component).toBeInTheDocument();
});
