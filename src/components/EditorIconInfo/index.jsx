import filesize from "filesize";

import Icon from "../Icon";

import convertToSVG from "../../utils/convertToSVG";

import * as styles from "./EditorIconInfo.module.css";

const EditorIconInfo = ({ file }) => {
  const fileContentLength = convertToSVG(file)?.length || 0;

  const size =
    file && file.width && file.height ? `${file.width}x${file.height}` : null;

  const fileSize =
    file && fileContentLength ? filesize(fileContentLength) : null;

  return (
    <span className={styles.EditorIconInfo}>
      <span>
        <Icon icon="tag" size={12} />
        {file.name}
      </span>
      <span>
        <Icon icon="image" size={12} />
        {size}
      </span>
      <span>
        <Icon icon="dashboard" size={12} />
        {fileSize}
      </span>
    </span>
  );
};

export default EditorIconInfo;
