import { useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import Icon from '../Icon';
import ColorGroups from '../ColorGroups';
import ColorPicker from '../ColorPicker';
import ColorCircle from '../ColorCircle';

import { Context } from '../../contexts/FilesContext';

import removePath from '../../utils/removePathByIndex';

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
    <div
      data-testid="EditorTool"
      className="w-full h-[400px] border-t border-panel flex flex-col justify-start items-start bg-surface-2 z-[1]"
      key={selectedFile}
    >
      <ColorGroups file={file} setFile={setFile} />
      <div className="text-[11px] m-0 w-full bg-surface-3 text-txt-3 font-normal px-2 leading-[22px]">
        Paths
        <span className="text-txt-4 ml-[5px]">{file?.paths?.length || 0}</span>
      </div>
      <div className="w-full h-full flex flex-col justify-start items-start bg-surface-2">
        <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
          {file?.paths.map((path, index) => (
            <div
              key={path + index}
              className="group h-[30px] text-xs whitespace-nowrap overflow-hidden max-w-full w-full border-b border-panel flex items-center hover:bg-surface-4"
              onClick={() => setCurrentPathIndex(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-[30px] h-full flex items-center justify-center pl-2.5 mr-2.5">
                <ColorCircle
                  onClick={event => toggleColor(file?.fills[index] || '#eee', event)}
                  color={file?.fills[index]}
                />
              </div>
              <div className="mr-5 text-txt-1 select-none flex">Path {index + 1}</div>
              <div className="pr-2.5 w-full text-txt-6 overflow-x-hidden flex items-center">
                <span className="w-full overflow-hidden leading-[30px] select-none">{path}</span>
                <Icon
                  className="text-txt-5 ml-auto pl-2.5 !hidden group-hover:!block cursor-pointer hover:opacity-80"
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
