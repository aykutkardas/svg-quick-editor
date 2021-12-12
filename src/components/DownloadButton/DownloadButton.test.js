import { render, screen } from '@testing-library/react';
import DownloadButton from './index';

test('Test DownloadButton component', () => {
  render(<DownloadButton file={{}} />);
  const colorPickerEl = screen.getByTestId('DownloadButton');
  expect(colorPickerEl).toBeInTheDocument();
});

test('Test DownloadButton component without File', () => {
  const { container } = render(<DownloadButton />);
  expect(container.innerHTML).toBe('');
});
