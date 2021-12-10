import { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars";

import * as styles from "./EditorTool.module.css";

import { Context } from "../../contexts/FilesContext";

const EditorTool = () => {
  const { selectedFile } = useContext(Context);

  return (
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
  );
};

export default EditorTool;
