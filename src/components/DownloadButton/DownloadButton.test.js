import { render, screen } from '@testing-library/react';
import DownloadButton from './index';

test('Test DownloadButton component', () => {
  render(<DownloadButton file={{}} />);
  const component = screen.getByTestId('DownloadButton');
  expect(component).toBeInTheDocument();
});

test('Test DownloadButton component without File', () => {
  const { container } = render(<DownloadButton />);
  expect(container.innerHTML).toBe('');
});
