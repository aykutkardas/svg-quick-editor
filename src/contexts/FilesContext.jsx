import { useState, createContext } from "react";

const Context = createContext();

function Provider({ children }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <Context.Provider
      value={{ files, setFiles, selectedFile, setSelectedFile }}
    >
      {children}
    </Context.Provider>
  );
}

export { Provider, Context };
