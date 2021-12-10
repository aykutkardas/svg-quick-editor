import { useContext } from "react";
import cx from "classnames";

import * as styles from "./IconList.module.css";

import { Context } from "../../contexts/FilesContext";

const IconList = () => {
  const { files, selectedFile, setSelectedFile } = useContext(Context);

  return (
    <div className={styles.IconList}>
      <h4 className={styles.IconListMainTitle}>EXPLORER</h4>
      <h4 className={styles.IconListTitle}>File</h4>
      {files.map((file) => (
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
          {file.name}
        </div>
      ))}
    </div>
  );
};

export default IconList;
