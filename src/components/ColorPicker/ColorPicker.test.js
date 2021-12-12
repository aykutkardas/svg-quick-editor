import { render, screen } from '@testing-library/react';
import ColorPicker from './index';

test('Test ColorPicker component', () => {
  render(<ColorPicker />);
  const component = screen.getByTestId('ColorPicker');
  expect(component).toBeInTheDocument();
});
