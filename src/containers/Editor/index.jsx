import { useContext, useEffect, useState } from "react";
import cx from "classnames";

import * as styles from "./Editor.module.css";

import IconList from "../../components/IconList";
import EditorTool from "../../components/EditorTool";

import { Context } from "../../contexts/FilesContext";

const Editor = () => {
  const { files, selectedFile, getSelectedFile, activePathIndex } =
    useContext(Context);
  const [file, setFile] = useState(getSelectedFile(selectedFile));

  useEffect(() => {
    setFile(getSelectedFile(selectedFile));
  }, [selectedFile, files]);

  const isCurrentPath = (activePathIndex, index) => {
    return typeof activePathIndex === "number" && activePathIndex === index;
  };

  return (
    <div className={styles.Editor}>
      <IconList />
      <div className={styles.EditorIconArea}>
        <div className={styles.EditorIcon}>
          {file && (
            <svg viewBox={file.viewBox}>
              {file.paths.map((path, index) => (
                <path
                  key={path + (file.fills[index] || "")}
                  d={path}
                  fill={file.fills[index] || "#999"}
                  className={cx(styles.EditorCurrentIconPath, {
                    [styles.EditorCurrentIconPathPassive]:
                      activePathIndex && !isCurrentPath(activePathIndex, index),
                  })}
                />
              ))}
            </svg>
          )}
        </div>
        <EditorTool />
      </div>
    </div>
  );
};

export default Editor;
