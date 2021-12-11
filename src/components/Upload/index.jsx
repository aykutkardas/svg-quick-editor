import { useContext, useRef } from "react";
import cx from "classnames";

import getSelectedFiles from "../../utils/getSelectedFiles";
import { Context } from "../../contexts/FilesContext";
import Icon from "../../components/Icon";

import * as styles from "./Upload.module.css";

const Upload = ({ className }) => {
  const inputRef = useRef();
  const { setFiles } = useContext(Context);

  const handleFileInput = async (event) => {
    const files = await getSelectedFiles(event);
    setFiles?.(files);
  };

  return (
    <div className={cx(className, styles.Upload)}>
      <label htmlFor="file-input">
        <Icon icon="plus" size={10} /> Add Files
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/svg+xml"
          ref={inputRef}
          onChange={handleFileInput}
        />
      </label>
    </div>
  );
};

export default Upload;
