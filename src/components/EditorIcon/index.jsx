import { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import hotkeys from 'hotkeys-js';

import EditorIconInfo from '../EditorIconInfo';

import { Context } from '../../contexts/FilesContext';

import shortcuts from '../../shortcuts';

import * as styles from './EditorIcon.module.css';
import convertToSVG from '../../utils/convertToSVG';

const EditorIcon = () => {
  const { files, selectedFile, getSelectedFile, activePathIndex } = useContext(Context);
  const [file, setFile] = useState(getSelectedFile(selectedFile));

  useEffect(() => {
    setFile(getSelectedFile(selectedFile));
    hotkeys(shortcuts.saveFile, e => saveFile(e, getSelectedFile(selectedFile)));

    return () => hotkeys.unbind(shortcuts.saveFile);
  }, [selectedFile, files]);

  const isCurrentPath = (activePathIndex, index) => {
    return typeof activePathIndex === 'number' ? activePathIndex === index : true;
  };

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

  return (
    <div data-testid="EditorIcon" className={styles.EditorIcon}>
      {file && (
        <div className={styles.EditorIconFrame}>
          <svg
            className={styles.EditorIconSVG}
            width={file.width}
            height={file.height}
            viewBox={file.viewBox}
          >
            {file.paths.map((path, index) => (
              <path
                key={path + index + (file.fills[index] || '')}
                d={path}
                fill={file.fills[index] || '#999'}
                className={cx(styles.EditorCurrentIconPath, {
                  [styles.EditorCurrentIconPathPassive]: !isCurrentPath(activePathIndex, index),
                })}
              />
            ))}
          </svg>
          <EditorIconInfo file={file} />
        </div>
      )}
    </div>
  );
};

export default EditorIcon;
