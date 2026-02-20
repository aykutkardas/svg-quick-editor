import { useEffect, useContext, useState } from 'react';
import lookie from 'lookie';

import IconList from '../../components/IconList';
import EditorTool from '../../components/EditorTool';
import EditorIcon from '../../components/EditorIcon';
import ColorGroups from '../../components/ColorGroups';

import { Context } from '../../contexts/FilesContext';

const Editor = () => {
  const { files, setFiles, selectedFile, getSelectedFile } = useContext(Context);
  const [file, setFile] = useState(getSelectedFile(selectedFile));

  useEffect(() => {
    const localFiles = lookie.get('files') || {};
    setFiles({ ...files, ...localFiles });
  }, []);

  useEffect(() => {
    setFile(getSelectedFile(selectedFile));
  }, [selectedFile, files]);

  return (
    <div
      data-testid="Editor"
      className="w-full h-screen bg-surface-1 flex gap-[20px] p-[20px] m-0 overflow-hidden"
    >
      <IconList />
      <div className="flex flex-col justify-between items-start w-full gap-[20px] min-w-0">
        <EditorIcon />
        <div className="w-full bg-surface-2 rounded-xl overflow-hidden border border-t-edge-t border-x-edge-x border-b-edge-b">
          <ColorGroups file={file} setFile={setFile} />
        </div>
      </div>
      <EditorTool file={file} setFile={setFile} />
    </div>
  );
};

export default Editor;
