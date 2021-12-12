import { useContext, useEffect, useRef } from 'react';
import cx from 'classnames';
import hotkeys from 'hotkeys-js';

import Icon from '../Icon';

import getSelectedFiles from '../../utils/getSelectedFiles';
import { Context } from '../../contexts/FilesContext';

import shortcuts from '../../shortcuts';

import * as styles from './UploadButton.module.css';
import getReadableShortcut from '../../utils/getReadableShortcut';

const UploadButton = ({ className }) => {
  const inputRef = useRef();
  const { files, setFiles } = useContext(Context);

  const handleFileInput = async event => {
    const newFiles = await getSelectedFiles(event);
    setFiles({ ...files, ...newFiles });
  };

  useEffect(() => {
    hotkeys(shortcuts.addFiles, event => {
      event.preventDefault();
      inputRef.current.click();
    });

    return () => hotkeys.unbind(shortcuts.addFiles);
  }, []);

  return (
    <div data-testid="UploadButton" className={cx(className, styles.UploadButton)}>
      <label htmlFor="upload-input">
        <Icon icon="plus" size={16} /> Add SVG Files
        <span>{getReadableShortcut(shortcuts.addFiles)}</span>
        <input
          id="upload-input"
          type="file"
          multiple
          accept="image/svg+xml"
          ref={inputRef}
          onChange={handleFileInput}
        />
      </label>
    </div>
  );
};

export default UploadButton;
