import { render, screen } from '@testing-library/react';
import ColorPicker from './index';

test('Test ColorPicker component', () => {
  render(<ColorPicker />);
  const colorPickerEl = screen.getByTestId('ColorPicker');
  expect(colorPickerEl).toBeInTheDocument();
});
