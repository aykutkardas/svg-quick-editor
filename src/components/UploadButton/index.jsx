import { useContext, useRef } from 'react';
import cx from 'classnames';

import getSelectedFiles from '../../utils/getSelectedFiles';
import { Context } from '../../contexts/FilesContext';
import Icon from '../Icon';

import * as styles from './UploadButton.module.css';

const UploadButton = ({ className }) => {
  const inputRef = useRef();
  const { files, setFiles } = useContext(Context);

  const handleFileInput = async event => {
    const newFiles = await getSelectedFiles(event);
    setFiles({ ...files, ...newFiles });
  };

  return (
    <div className={cx(className, styles.UploadButton)}>
      <label htmlFor="file-input">
        <Icon icon="plus" size={16} /> Add SVG Files
        <input
          id="file-input"
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
