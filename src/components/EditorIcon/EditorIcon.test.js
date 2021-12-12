import { render, screen } from '@testing-library/react';
import App from '../../App';
import EditorIcon from './index';

test('Test EditorIcon component', () => {
  render(
    <App>
      <EditorIcon />
    </App>,
  );
  const colorPickerEl = screen.getByTestId('EditorIcon');
  expect(colorPickerEl).toBeInTheDocument();
});
