import cx from "classnames";
import Icon from "../../components/Icon";
import convertToSVG from "../../utils/convertToSVG";

import * as styles from "./DownloadButton.module.css";

const Download = ({ file }) => {
  const onClick = () => {
    const content = convertToSVG(file);

    var dataStr =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(content);
    var downloadElement = document.createElement("a");
    downloadElement.setAttribute("href", dataStr);
    downloadElement.setAttribute("download", file.name);
    downloadElement.click();
  };

  return file ? (
    <button
      className={cx("download-button", styles.DownloadButton)}
      onClick={onClick}
    >
      <Icon icon="disk" size={12} />
    </button>
  ) : null;
};

export default Download;
