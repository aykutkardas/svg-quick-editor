import { useContext, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Scrollbars } from "react-custom-scrollbars";
import OutsideClickHandler from "react-outside-click-handler";
import xor from "lodash.xor";

import * as styles from "./EditorTool.module.css";

import { Context } from "../../contexts/FilesContext";
import Icon from "../Icon/index";

const EditorTool = () => {
  const { files, setFiles, selectedFile, getSelectedFile, setActivePathIndex } =
    useContext(Context);
  const [file, setFile] = useState(getSelectedFile(selectedFile));
  const [color, setColor] = useState();
  const [colorGroup, setColorGroup] = useState();
  const [openColor, setOpenColor] = useState(false);
  const [openColorGroup, setOpenColorGroup] = useState(false);
  const [positions, setPositions] = useState([0, 0]);

  const [currentPathIndex, setCurrentPathIndex] = useState(null);

  const toggleColor = (color, { screenX, screenY }) => {
    setPositions([screenX, screenY]);
    setColor(color);
    setOpenColor(!openColor);
  };

  const toggleColorGroup = (colorGroup, { screenX, screenY }) => {
    setPositions([screenX, screenY]);
    setColorGroup(colorGroup);
    setOpenColorGroup(!openColor);
  };

  const closeColor = () => {
    setOpenColor(false);
    setOpenColorGroup(false);
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

  const handleColorGroup = (color) => {
    if (!file) return;
    file.fills = file.fills?.map((fill) =>
      fill === colorGroup ? color : fill
    );

    setColorGroup(color);
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

  const removePath = (index) => {
    const path = file.paths?.[index];

    const newFiles = files.map((file) => {
      if (file.paths?.includes(path)) {
        file.paths = file.paths?.filter(
          (path, pathIndex) => pathIndex !== index
        );

        file.fills = file.fills?.filter(
          (fill, fillIndex) => fillIndex !== index
        );
      }

      return file;
    });

    setFiles(newFiles);
  };

  useEffect(() => {
    setFile(getSelectedFile(selectedFile));
  }, [selectedFile]);

  return (
    <div className={styles.EditorTool}>
      <div className={styles.EditorToolTitle}>Color Groups</div>
      <div className={styles.EditorToolColorGroupItems}>
        {xor(file?.fills).map((fill) => (
          <div className={styles.EditorToolColorGroupItem}>
            <div className={styles.EditorToolItemColor}>
              <div
                onClick={(event) => toggleColorGroup(fill || "#eee", event)}
                className={styles.EditorToolItemColorWheel}
                style={{ backgroundColor: fill || "#eee" }}
              />
            </div>
            <div className={styles.EditorToolItemTitle}>
              {fill || "#EEEEEE"}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.EditorToolTitle}>
        Paths ({file?.paths?.length})
      </div>
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
              <div className={styles.EditorToolItemTitle}>Path {index + 1}</div>
              <div className={styles.EditorToolItemValue}>
                <Scrollbars autoHide style={{ width: "100%", height: 30 }}>
                  <span>{path}</span>
                </Scrollbars>
                <Icon
                  className={styles.EditorToolRemoveIcon}
                  size={16}
                  icon="trash"
                  onClick={() => removePath(index)}
                />
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
          {openColorGroup && (
            <HexColorPicker color={colorGroup} onChange={handleColorGroup} />
          )}
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default EditorTool;
