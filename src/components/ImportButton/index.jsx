import { useContext, useRef } from 'react';
import cx from 'classnames';

import getImportFile from '../../utils/getImportFile';
import { Context } from '../../contexts/FilesContext';
import Icon from '../../components/Icon';

import * as styles from './ImportButton.module.css';

const ImportButton = ({ className }) => {
  const inputRef = useRef();
  const { files, setFiles } = useContext(Context);

  const handleFileInput = async event => {
    const newFiles = await getImportFile(event);
    setFiles({ ...files, ...newFiles });
  };

  return (
    <div className={cx(className, styles.ImportButton)}>
      <label htmlFor="import-input">
        <Icon icon="arrow-up" size={24} /> Import JSON
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
