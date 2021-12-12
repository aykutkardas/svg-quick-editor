import { useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import Icon from '../Icon';
import ColorGroups from '../ColorGroups';
import ColorPicker from '../ColorPicker';
import ColorCircle from '../ColorCircle';

import { Context } from '../../contexts/FilesContext';

import removePath from '../../utils/removePathByIndex';

import * as styles from './EditorTool.module.css';

const EditorTool = () => {
  const { files, setFiles, selectedFile, getSelectedFile, setActivePathIndex } =
    useContext(Context);
  const [file, setFile] = useState(getSelectedFile(selectedFile));
  const [color, setColor] = useState();
  const [openPicker, setOpenPicker] = useState(false);
  const [positions, setPositions] = useState([0, 0]);

  const [currentPathIndex, setCurrentPathIndex] = useState(null);

  const toggleColor = (color, { screenX, screenY }) => {
    setPositions([screenY, screenX]);
    setColor(color);
    setOpenPicker(!openPicker);
  };

  const closePicker = () => {
    setOpenPicker(false);
  };

  const handleColor = color => {
    if (!file) return;
    file.fills[currentPathIndex] = color;

    setColor(color);
    setFile(file);
    files[file.name] = file;

    setFiles(files);
  };

  const handleMouseEnter = index => {
    setActivePathIndex(index);
  };

  const handleMouseLeave = () => {
    setActivePathIndex(null);
  };

  const handleRemovePath = index => {
    files[file.name] = removePath(file, index);

    setFiles(files);
  };

  useEffect(() => {
    setFile(getSelectedFile(selectedFile));
    setActivePathIndex(null);
  }, [selectedFile, files]);

  return (
    <div data-testid="EditorTool" className={styles.EditorTool} key={selectedFile}>
      <ColorGroups file={file} setFile={setFile} />
      <div className={styles.EditorToolTitle}>
        Paths
        <span>{file?.paths?.length || 0}</span>
      </div>
      <div className={styles.EditorToolItems}>
        <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
          {file?.paths.map((path, index) => (
            <div
              key={path + index}
              className={styles.EditorToolItem}
              onClick={() => setCurrentPathIndex(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.EditorToolItemColor}>
                <ColorCircle
                  onClick={event => toggleColor(file?.fills[index] || '#eee', event)}
                  color={file?.fills[index]}
                />
              </div>
              <div className={styles.EditorToolItemTitle}>Path {index + 1}</div>
              <div className={styles.EditorToolItemValue}>
                <span>{path}</span>
                <Icon
                  className={styles.EditorToolRemoveIcon}
                  size={16}
                  icon="delete-bin"
                  onClick={() => handleRemovePath(index)}
                />
              </div>
            </div>
          ))}
        </Scrollbars>
      </div>
      {openPicker && (
        <ColorPicker
          color={color}
          handleColor={handleColor}
          closePicker={closePicker}
          positions={positions}
        />
      )}
    </div>
  );
};

export default EditorTool;
