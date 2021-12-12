import './App.css';

import Editor from './containers/Editor';

import { Provider as FilesProvider } from './contexts/FilesContext';

function App() {
  return (
    <FilesProvider>
      <div className="App">
        <Editor />
      </div>
    </FilesProvider>
  );
}

export default App;
