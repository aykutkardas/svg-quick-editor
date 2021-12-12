import { render, screen } from '@testing-library/react';
import App from '../../App';

test('Test EditorIcon component', () => {
  render(<App />);
  const component = screen.getByTestId('EditorIcon');
  expect(component).toBeInTheDocument();
});
