import { useState, useRef, useEffect, useCallback, createContext } from 'react';
import lookie from 'lookie';
import hotkeys from 'hotkeys-js';

import demoFiles from '../demo-file.json';
import shortcuts from '../shortcuts';

const Context = createContext();
const MAX_HISTORY = 50;

function Provider({ children }) {
  const [files, _setFiles] = useState(demoFiles);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activePathIndex, setActivePathIndex] = useState(null);
  const [activeColor, setActiveColor] = useState(null);

  const historyRef = useRef([JSON.parse(JSON.stringify(demoFiles))]);
  const indexRef = useRef(0);
  const skipHistoryRef = useRef(false);

  const getSelectedFile = name => {
    return files[name];
  };

  const setFiles = newFiles => {
    const snapshot = JSON.parse(JSON.stringify(newFiles));
    _setFiles(snapshot);
    lookie.set('files', snapshot);

    if (!skipHistoryRef.current) {
      const history = historyRef.current.slice(0, indexRef.current + 1);
      history.push(snapshot);
      if (history.length > MAX_HISTORY) history.shift();
      historyRef.current = history;
      indexRef.current = history.length - 1;
    }
    skipHistoryRef.current = false;
  };

  const undo = useCallback(() => {
    if (indexRef.current <= 0) return;
    indexRef.current -= 1;
    const snapshot = JSON.parse(JSON.stringify(historyRef.current[indexRef.current]));
    skipHistoryRef.current = true;
    _setFiles(snapshot);
    lookie.set('files', snapshot);
  }, []);

  const redo = useCallback(() => {
    if (indexRef.current >= historyRef.current.length - 1) return;
    indexRef.current += 1;
    const snapshot = JSON.parse(JSON.stringify(historyRef.current[indexRef.current]));
    skipHistoryRef.current = true;
    _setFiles(snapshot);
    lookie.set('files', snapshot);
  }, []);

  useEffect(() => {
    hotkeys(shortcuts.undo, e => {
      e.preventDefault();
      undo();
    });
    hotkeys(shortcuts.redo, e => {
      e.preventDefault();
      redo();
    });
    return () => {
      hotkeys.unbind(shortcuts.undo);
      hotkeys.unbind(shortcuts.redo);
    };
  }, [undo, redo]);

  const deleteFile = file => {
    if (!file) return;

    const isConfirm = window.confirm(`Are you sure you want to delete file "${file.name}?"`);

    if (!isConfirm) return;

    delete files[file.name];
    setFiles(files);
  };

  return (
    <Context.Provider
      value={{
        files,
        selectedFile,
        activePathIndex,
        activeColor,
        deleteFile,
        setFiles,
        setSelectedFile,
        getSelectedFile,
        setActivePathIndex,
        setActiveColor,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Provider, Context };
