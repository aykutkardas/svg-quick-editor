import { useState, createContext } from "react";

const Context = createContext();

function Provider({ children }) {
  const [files, _setFiles] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [activePathIndex, setActivePathIndex] = useState(null);

  const getSelectedFile = (name) => {
    return files[name];
  };

  const setFiles = (files) => {
    _setFiles({ ...files });
  };

  return (
    <Context.Provider
      value={{
        files,
        selectedFile,
        activePathIndex,
        setFiles,
        setSelectedFile,
        getSelectedFile,
        setActivePathIndex,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Provider, Context };
