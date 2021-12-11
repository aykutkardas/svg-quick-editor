import { useContext, useEffect, useState } from "react";
import cx from "classnames";
import filesize from "filesize";

import * as styles from "./Editor.module.css";

import IconList from "../../components/IconList";
import EditorTool from "../../components/EditorTool";

import { Context } from "../../contexts/FilesContext";
import convertToSVG from "../../utils/convertToSVG";

const Editor = () => {
  const { files, selectedFile, getSelectedFile, activePathIndex } =
    useContext(Context);
  const [file, setFile] = useState(getSelectedFile(selectedFile));

  useEffect(() => {
    setFile(getSelectedFile(selectedFile));
  }, [selectedFile, files]);

  const isCurrentPath = (activePathIndex, index) => {
    return typeof activePathIndex === "number"
      ? activePathIndex === index
      : true;
  };

  const fileContentLength = convertToSVG(file)?.length || 0;

  const size =
    file && file.width && file.height
      ? ` - ${file.width}x${file.height}`
      : null;

  const fileSize =
    file && fileContentLength ? ` - ${filesize(fileContentLength)}` : null;

  return (
    <div className={styles.Editor}>
      <IconList />
      <div className={styles.EditorIconArea}>
        <div className={styles.EditorIcon}>
          {file && (
            <div className={styles.EditorIconFrame}>
              <svg viewBox={file.viewBox}>
                {file.paths.map((path, index) => (
                  <path
                    key={path + index + (file.fills[index] || "")}
                    d={path}
                    fill={file.fills[index] || "#999"}
                    className={cx(styles.EditorCurrentIconPath, {
                      [styles.EditorCurrentIconPathPassive]: !isCurrentPath(
                        activePathIndex,
                        index
                      ),
                    })}
                  />
                ))}
              </svg>
              <span className={styles.EditorIconName}>
                <b>{file.name}</b>
                {size}
                {fileSize}
              </span>
            </div>
          )}
        </div>
        <EditorTool />
      </div>
    </div>
  );
};

export default Editor;
