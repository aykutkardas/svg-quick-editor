import { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars";

import * as styles from "./Editor.module.css";

import IconList from "../../components/IconList";

import { Context } from "../../contexts/FilesContext";

const Editor = () => {
  const { selectedFile } = useContext(Context);

  return (
    <div className={styles.Editor}>
      <IconList />
      <div className={styles.EditorIconArea}>
        <div className={styles.EditorIcon}>
          {selectedFile && (
            <svg viewBox={selectedFile.viewBox}>
              {selectedFile.paths.map((path, index) => (
                <path d={path} fill={selectedFile.fills[index] || "#999"} />
              ))}
            </svg>
          )}
        </div>
        <div className={styles.EditorTool}>
          {selectedFile?.paths.map((path) => (
            <div className={styles.EditorToolPath}>
              <div className={styles.EditorToolPathTitle}>Path</div>
              <div className={styles.EditorToolPathValue}>
                <Scrollbars autoHide style={{ width: "100%", height: 30 }}>
                  <span>{path}</span>
                </Scrollbars>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editor;
