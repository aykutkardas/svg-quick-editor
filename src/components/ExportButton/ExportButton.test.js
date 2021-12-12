import { render, screen } from '@testing-library/react';
import App from './../../App';
import ExportButton from './index';

test('Test ExportButton component without Files', () => {
  render(
    <App>
      <ExportButton />
    </App>,
  );
  const component = screen.getByTestId('EditorIcon');
  expect(component.innerHTML).toBe('');
});
