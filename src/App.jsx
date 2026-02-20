import Editor from './containers/Editor';

import { Provider as FilesProvider } from './contexts/FilesContext';

function App() {
  return (
    <FilesProvider>
      <div
        data-testid="App"
        className="bg-neutral-900 min-h-screen flex flex-col items-center justify-center text-white"
      >
        <Editor />
      </div>
    </FilesProvider>
  );
}

export default App;
