import { useState, createContext } from 'react';
import lookie from 'lookie';

import demoFiles from '../demo-file.json';
const Context = createContext();

function Provider({ children }) {
  const [files, _setFiles] = useState(demoFiles);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activePathIndex, setActivePathIndex] = useState(null);

  const getSelectedFile = name => {
    return files[name];
  };

  const setFiles = files => {
    const newFiles = { ...files };
    _setFiles(newFiles);
    lookie.set('files', newFiles);
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
