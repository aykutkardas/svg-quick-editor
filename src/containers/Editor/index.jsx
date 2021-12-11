import { useContext, useEffect, useState } from "react";

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
                  style={{
                    opacity:
                      typeof activePathIndex === "number"
                        ? activePathIndex === index
                          ? 1
                          : 0.1
                        : 1,
                  }}
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
