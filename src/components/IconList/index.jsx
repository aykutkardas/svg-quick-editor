import { useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import cx from 'classnames';

import * as styles from './IconList.module.css';

import Icon from '../Icon';
import UploadButton from '../UploadButton';
import ImportButton from '../ImportButton';
import ExportButton from '../ExportButton';
import DownloadButton from '../DownloadButton';

import { Context } from '../../contexts/FilesContext';
import convertToSVG from '../../utils/convertToSVG';

const IconList = () => {
  const { files, deleteFile, selectedFile, setSelectedFile } = useContext(Context);

  const handleDelete = (file, event) => {
    event.stopPropagation();

    deleteFile(file);
  };

  return (
    <div data-testid="IconList" className={styles.IconList}>
      <div className={styles.IconListLogo}>
        <img src="/logo.png" alt="zap" />
      </div>
      <UploadButton className={styles.IconListItem} />
      <ImportButton className={styles.IconListItem} />
      <ExportButton className={styles.IconListItem} />
      <h4 className={styles.IconListTitle}>
        Files <span>{Object.keys(files).length}</span>
      </h4>
      <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
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
              dangerouslySetInnerHTML={{ __html: convertToSVG(file) }}
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
      </Scrollbars>
      <div className={styles.Social}>
        <a href="https://github.com/aykutkardas/svg-quick-editor" target="_blank" rel="noreferrer">
          <Icon size={18} icon="github" />
        </a>
        <a href="https://twitter.com/aykutkardas" target="_blank" rel="noreferrer">
          <Icon size={18} icon="twitter" />
        </a>
      </div>
    </div>
  );
};

export default IconList;
