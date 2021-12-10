import "./App.css";

import { useContext } from "react";

import Upload from "./components/Upload";
import Editor from "./containers/Editor";
import { Context } from "./contexts/FilesContext";

function App() {
  // const { files } = useContext(Context);

  return (
    <div className="App">
      <Editor />
    </div>
  );
}

export default App;
