import { render } from '@testing-library/react';
import App from './../../App';
import ExportButton from './index';

test('Test ExportButton component without Files', () => {
  const { container } = render(
    <App>
      <ExportButton />
    </App>,
  );

  const component = container.querySelector('[data-testid="ExportButton"]');
  expect(component).toBe(null);
});
