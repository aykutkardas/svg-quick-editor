import { render, screen } from '@testing-library/react';
import EditorIconInfo from './index';

test('Test EditorIconInfo component', () => {
  render(<EditorIconInfo file={{}} />);
  const component = screen.getByTestId('EditorIconInfo');
  expect(component).toBeInTheDocument();
});

test('Test EditorIconInfo component with values', () => {
  render(
    <EditorIconInfo
      file={{
        name: 'test.svg',
        width: 100,
        height: 100,
      }}
    />,
  );
  const sizeEl = screen.getAllByText('100x100');
  const fileSizeEl = screen.getAllByText('105 B');
  const nameEl = screen.getAllByText('test.svg');
  expect(sizeEl.length).toBe(1);
  expect(fileSizeEl.length).toBe(1);
  expect(nameEl.length).toBe(1);
});

test('Test EditorIconInfo component without File', () => {
  const { container } = render(<EditorIconInfo />);
  expect(container.innerHTML).toBe('');
});
