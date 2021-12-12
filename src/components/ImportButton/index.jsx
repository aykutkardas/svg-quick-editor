import { useContext, useEffect, useRef } from 'react';
import cx from 'classnames';
import hotkeys from 'hotkeys-js';

import Icon from '../Icon';

import getImportFile from '../../utils/getImportFile';
import { Context } from '../../contexts/FilesContext';

import shortcuts from '../../shortcuts';

import * as styles from './ImportButton.module.css';
import getReadableShortcut from '../../utils/getReadableShortcut';

const ImportButton = ({ className }) => {
  const inputRef = useRef();
  const { files, setFiles } = useContext(Context);

  const handleFileInput = async event => {
    const newFiles = await getImportFile(event);
    setFiles({ ...files, ...newFiles });
  };

  useEffect(() => {
    hotkeys(shortcuts.importJSON, event => {
      event.preventDefault();
      inputRef.current.click();
    });

    return () => hotkeys.unbind(shortcuts.importJSON);
  }, []);

  return (
    <div data-testid="ImportButton" className={cx(className, styles.ImportButton)}>
      <label htmlFor="import-input">
        <Icon icon="arrow-up" size={26} /> Import JSON
        <span>{getReadableShortcut(shortcuts.importJSON)}</span>
        <input
          id="import-input"
          type="file"
          accept="application/json"
          ref={inputRef}
          onChange={handleFileInput}
        />
      </label>
    </div>
  );
};

export default ImportButton;
