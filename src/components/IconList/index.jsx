import { useContext } from 'react';
import cx from 'classnames';

import * as styles from './IconList.module.css';

import Icon from '../Icon';
import UploadButton from '../UploadButton';
import ImportButton from '../ImportButton';
import ExportButton from '../ExportButton';
import DownloadButton from '../DownloadButton';

import { Context } from '../../contexts/FilesContext';

const IconList = () => {
  const { files, setFiles, selectedFile, setSelectedFile } = useContext(Context);

  const handleDelete = (file, event) => {
    event.stopPropagation();

    if (!file) return;

    const isConfirm = window.confirm('Are you sure?');

    if (!isConfirm) return;

    delete files[file.name];
    setFiles(files);
  };

  return (
    <div data-testid="IconList" className={styles.IconList}>
      <h4 className={styles.IconListMainTitle}>
        <img src="/favicon.svg" width={22} alt="zap" />
        SVG Quick Action
      </h4>
      <UploadButton className={styles.IconListItem} />
      <ImportButton className={styles.IconListItem} />
      <ExportButton className={styles.IconListItem} />
      <h4 className={styles.IconListTitle}>
        Files <span>{Object.keys(files).length}</span>
      </h4>
      {Object.values(files).map((file, index) => (
        <div
          data-testid={`IconListItem${index + 1}`}
          key={file.name}
          className={cx(styles.IconListItem, {
            [styles.IconListItemActive]: file.name === selectedFile,
          })}
          onClick={() => setSelectedFile(file.name)}
        >
          <span
            className={styles.IconListItemIcon}
            dangerouslySetInnerHTML={{ __html: file.content }}
          />
          <span className={styles.IconListItemFileName}>{file.name}</span>
          <span className={styles.IconListItemAction}>
            <DownloadButton file={file} />
            <Icon
              className={styles.IconListItemRemoveIcon}
              size={18}
              icon="multiply"
              onClick={event => handleDelete(file, event)}
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default IconList;
