import { render, screen } from '@testing-library/react';
import App from './../../App';

test('Test EditorTool component', () => {
  render(<App />);
  const component = screen.getByTestId('EditorTool');
  expect(component).toBeInTheDocument();
});
