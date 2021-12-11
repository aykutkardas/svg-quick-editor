import { useContext } from "react";
import cx from "classnames";

import * as styles from "./IconList.module.css";

import Upload from "../Upload";
import Icon from "../Icon";
import DownloadButton from "../DownloadButton";

import { Context } from "../../contexts/FilesContext";

const IconList = () => {
  const { files, setFiles, selectedFile, setSelectedFile } =
    useContext(Context);

  const handleDelete = (file) => {
    if (!file) return;

    const isConfirm = window.confirm("Are you sure?");

    if (!isConfirm) return;

    delete files[file.name];
    setFiles(files);
  };

  return (
    <div className={styles.IconList}>
      <h4 className={styles.IconListMainTitle}>SVG-QUICK-EDITOR</h4>
      <Upload className={styles.IconListItem} />
      <h4 className={styles.IconListTitle}>Files</h4>
      {Object.values(files).map((file) => (
        <div
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
              size={14}
              icon="close"
              onClick={() => handleDelete(file)}
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default IconList;
