import { render, screen } from '@testing-library/react';
import ColorGroups from './index';
import App from '../../App';

test('Test ColorGroups component', () => {
  render(
    <App>
      <ColorGroups />
    </App>,
  );
  const colorGroupsTitleEl = screen.getByText(/Color Groups/i);
  expect(colorGroupsTitleEl).toBeInTheDocument();
});
