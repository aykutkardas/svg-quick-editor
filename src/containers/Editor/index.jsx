import { useEffect, useContext, useState } from 'react';
import lookie from 'lookie';

import IconList from '../../components/IconList';
import EditorTool from '../../components/EditorTool';
import EditorIcon from '../../components/EditorIcon';
import EditorIconInfo from '../../components/EditorIconInfo';
import ColorGroups from '../../components/ColorGroups';
import DownloadButton from '../../components/DownloadButton';

import { Context } from '../../contexts/FilesContext';

const Editor = () => {
  const { files, setFiles, selectedFile, setSelectedFile, getSelectedFile } = useContext(Context);
  const [file, setFile] = useState(getSelectedFile(selectedFile));

  useEffect(() => {
    const localFiles = lookie.get('files') || {};
    const merged = { ...files, ...localFiles };
    setFiles(merged);

    const names = Object.keys(merged);
    if (!selectedFile && names.length > 0) {
      setSelectedFile(names[0]);
    }
  }, []);

  useEffect(() => {
    setFile(getSelectedFile(selectedFile));
  }, [selectedFile, files]);

  return (
    <div
      data-testid="Editor"
      className="w-full h-screen bg-neutral-900 flex gap-[20px] p-[20px] m-0 overflow-hidden"
    >
      <IconList />
      <div className="flex flex-col items-start w-full gap-[20px] min-w-0">
        <EditorIcon />
        <div className="w-full shrink-0 bg-neutral-800 rounded-xl border border-t-neutral-600 border-x-neutral-700 border-b-neutral-700 shadow-lg shadow-black/20 px-4 py-3 flex items-center">
          <EditorIconInfo file={file} />
          <div className="ml-auto">
            <DownloadButton file={file} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[20px] min-w-[280px] w-[280px]">
        <div className="w-full bg-neutral-800 rounded-xl overflow-hidden border border-t-neutral-600 border-x-neutral-700 border-b-neutral-700 shadow-lg shadow-black/20">
          <ColorGroups file={file} setFile={setFile} />
        </div>
        <EditorTool file={file} setFile={setFile} />
      </div>
    </div>
  );
};

export default Editor;
