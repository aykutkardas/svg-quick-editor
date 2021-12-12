import { render, screen } from '@testing-library/react';
import App from './App';

test('Test App component', () => {
  render(<App />);

  const AppComponent = screen.getByTestId('App');
  const EditorToolComponent = screen.getByTestId('EditorTool');
  const IconListComponent = screen.getByTestId('IconList');
  const EditorIconComponent = screen.getByTestId('EditorIcon');
  const ColorGroupsComponent = screen.getByTestId('ColorGroups');

  expect(AppComponent).toBeInTheDocument();
  expect(EditorToolComponent).toBeInTheDocument();
  expect(IconListComponent).toBeInTheDocument();
  expect(EditorIconComponent).toBeInTheDocument();
  expect(ColorGroupsComponent).toBeInTheDocument();
});
