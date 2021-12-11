import { useContext, useEffect } from 'react';
import lookie from 'lookie';

import './App.css';

import Editor from './containers/Editor';

import { Context } from './contexts/FilesContext';

function App() {
  const { files, setFiles } = useContext(Context);

  useEffect(() => {
    const localFiles = lookie.get('files') || {};
    setFiles({ ...files, ...localFiles });
  }, []);

  return (
    <div className="App">
      <Editor />
    </div>
  );
}

export default App;
