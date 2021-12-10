import "./App.css";

import { Provider as FilesProvider } from "./contexts/FilesContext";

import Upload from "./components/Upload";

function App() {
  return (
    <FilesProvider>
      <div className="App">
        <Upload />
      </div>
    </FilesProvider>
  );
}

export default App;
