import { useEffect, useContext } from 'react';
import lookie from 'lookie';

import IconList from '../../components/IconList';
import EditorTool from '../../components/EditorTool';
import EditorIcon from '../../components/EditorIcon';

import { Context } from '../../contexts/FilesContext';

const Editor = () => {
  const { files, setFiles } = useContext(Context);

  useEffect(() => {
    const localFiles = lookie.get('files') || {};
    setFiles({ ...files, ...localFiles });
  }, []);

  return (
    <div data-testid="Editor" className="w-full h-screen bg-surface-3 flex m-0 overflow-hidden">
      <IconList />
      <div className="flex flex-col justify-between items-start w-full">
        <EditorIcon />
        <EditorTool />
      </div>
    </div>
  );
};

export default Editor;
