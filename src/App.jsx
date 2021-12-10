import "./App.css";

import { Provider as FilesProvider } from "./contexts/FilesContext";

function App() {
  return (
    <FilesProvider>
      <div className="App">
        <span>svg-quick-editor</span>
      </div>
    </FilesProvider>
  );
}

export default App;
