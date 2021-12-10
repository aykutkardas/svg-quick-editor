import { useContext, useRef } from "react";

import getSelectedFiles from "../../utils/getSelectedFiles";
import { Context } from "../../contexts/FilesContext";
import * as styles from "./Upload.module.css";

const Upload = () => {
  const inputRef = useRef();
  const { setFiles } = useContext(Context);

  const handleFileInput = async (event) => {
    const files = await getSelectedFiles(event);
    setFiles?.(files);
  };

  return (
    <div className={styles.Upload}>
      <label htmlFor="file-input">
        <input
          id="file-input"
          type="file"
          multiple
          ref={inputRef}
          onChange={handleFileInput}
        />
        <span>UPLOAD</span>
        <p>
          Select the <b>SVG</b> files you want to edit
        </p>
      </label>
    </div>
  );
};

export default Upload;
