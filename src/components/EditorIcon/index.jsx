import { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import hotkeys from 'hotkeys-js';

import { Context } from '../../contexts/FilesContext';

import shortcuts from '../../shortcuts';

import convertToSVG from '../../utils/convertToSVG';

const EditorIcon = () => {
  const { files, deleteFile, selectedFile, getSelectedFile, activePathIndex } = useContext(Context);
  const [file, setFile] = useState(getSelectedFile(selectedFile));

  const saveFile = (event, file) => {
    event.preventDefault();

    if (!file) return;

    const content = convertToSVG(file);

    var dataStr = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(content);
    var downloadElement = document.createElement('a');
    downloadElement.setAttribute('href', dataStr);
    downloadElement.setAttribute('download', file.name);
    downloadElement.click();
  };

  const handleDeleteFile = (event, file) => {
    event.preventDefault();

    deleteFile(file);
  };

  useEffect(() => {
    setFile(getSelectedFile(selectedFile));
    hotkeys(shortcuts.saveFile, e => saveFile(e, getSelectedFile(selectedFile)));
    hotkeys(shortcuts.closeFile, e => handleDeleteFile(e, getSelectedFile(selectedFile)));

    return () => {
      hotkeys.unbind(shortcuts.saveFile);
      hotkeys.unbind(shortcuts.closeFile);
    };
  }, [selectedFile, files]);

  const isCurrentPath = (activePathIndex, index) => {
    return typeof activePathIndex === 'number' ? activePathIndex === index : true;
  };

  return (
    <div
      data-testid="EditorIcon"
      className="flex items-center justify-center w-full h-full relative bg-surface-2 rounded-xl border border-t-edge-t border-x-edge-x border-b-edge-b"
    >
      {file && (
        <div className="w-[80%] h-[80%] relative flex items-center justify-center">
          <svg
            className="max-w-full max-h-full border border-panel rounded transparency-grid"
            viewBox={file.viewBox}
            style={{ aspectRatio: `${file.width} / ${file.height}` }}
          >
            {file.paths.map((path, index) => (
              <path
                key={path + index + (file.fills[index] || '')}
                d={path}
                fill={file.fills[index] || '#8491a3'}
                className={cx('transition-opacity duration-200', {
                  'opacity-10': !isCurrentPath(activePathIndex, index),
                })}
              />
            ))}
          </svg>
        </div>
      )}
    </div>
  );
};

export default EditorIcon;
