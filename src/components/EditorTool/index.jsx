import { useContext, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Scrollbars } from "react-custom-scrollbars";
import OutsideClickHandler from "react-outside-click-handler";

import * as styles from "./EditorTool.module.css";

import { Context } from "../../contexts/FilesContext";

const EditorTool = () => {
  const { files, setFiles, selectedFile, getSelectedFile, setActivePathIndex } =
    useContext(Context);
  const [file, setFile] = useState(getSelectedFile(selectedFile));
  const [color, setColor] = useState();
  const [openColor, setOpenColor] = useState(false);
  const [positions, setPositions] = useState([0, 0]);

  const [currentPathIndex, setCurrentPathIndex] = useState(null);

  const toggleColor = (color, { screenX, screenY }) => {
    setPositions([screenX, screenY]);
    setColor(color);
    setOpenColor(!openColor);
  };

  const closeColor = () => {
    setOpenColor(false);
  };

  const handleColor = (color) => {
    if (!file) return;
    file.fills[currentPathIndex] = color;

    setColor(color);
    setFile(file);
    const newFiles = files.map((file) => {
      return {
        ...file,
        fills: file.fills,
      };
    });

    setFiles(newFiles);
  };

  const handleMouseEnter = (index) => {
    setActivePathIndex(index);
  };

  const handleMouseLeave = () => {
    setActivePathIndex(null);
  };

  useEffect(() => {
    setFile(getSelectedFile(selectedFile));
  }, [selectedFile]);

  return (
    <div className={styles.EditorTool}>
      <div className={styles.EditorToolItems}>
        <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
          {file?.paths.map((path, index) => (
            <div
              key={path}
              className={styles.EditorToolItem}
              onClick={() => setCurrentPathIndex(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.EditorToolItemColor}>
                <div
                  onClick={(event) =>
                    toggleColor(file?.fills[index] || "#eee", event)
                  }
                  className={styles.EditorToolItemColorWheel}
                  style={{ backgroundColor: file?.fills[index] || "#eee" }}
                />
              </div>
              <div className={styles.EditorToolItemTitle}>Path</div>
              <div className={styles.EditorToolItemValue}>
                <Scrollbars autoHide style={{ width: "100%", height: 30 }}>
                  <span>{path}</span>
                </Scrollbars>
              </div>
            </div>
          ))}
        </Scrollbars>
      </div>
      <div
        className={styles.EditorToolColorPicker}
        style={{ top: positions?.[1] - 270, left: positions?.[0] + 10 }}
      >
        <OutsideClickHandler onOutsideClick={closeColor}>
          {openColor && <HexColorPicker color={color} onChange={handleColor} />}
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default EditorTool;
