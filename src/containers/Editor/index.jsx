import { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars";

import * as styles from "./Editor.module.css";

import IconList from "../../components/IconList";
import EditorTool from "../../components/EditorTool";

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
        <EditorTool />
      </div>
    </div>
  );
};

export default Editor;
