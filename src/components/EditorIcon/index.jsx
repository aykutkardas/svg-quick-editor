import { useContext, useEffect, useState } from 'react';
import cx from 'classnames';

import EditorIconInfo from '../EditorIconInfo';

import { Context } from '../../contexts/FilesContext';

import * as styles from './EditorIcon.module.css';

const EditorIcon = () => {
  const { files, selectedFile, getSelectedFile, activePathIndex } = useContext(Context);
  const [file, setFile] = useState(getSelectedFile(selectedFile));

  useEffect(() => {
    setFile(getSelectedFile(selectedFile));
  }, [selectedFile, files]);

  const isCurrentPath = (activePathIndex, index) => {
    return typeof activePathIndex === 'number' ? activePathIndex === index : true;
  };

  return (
    <div className={styles.EditorIcon}>
      {file && (
        <div className={styles.EditorIconFrame}>
          <svg className={styles.EditorIconSVG} viewBox={file.viewBox}>
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
