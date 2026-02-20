import { useContext, useState, useRef, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { Trash2 } from 'lucide-react';
import ColorPicker from '../ColorPicker';
import ColorCircle from '../ColorCircle';

import { Context } from '../../contexts/FilesContext';

import removePath from '../../utils/removePathByIndex';

const PathPreview = ({ d, fill }) => {
  const pathRef = useRef(null);
  const [viewBox, setViewBox] = useState('0 0 24 24');

  useEffect(() => {
    if (!pathRef.current) return;
    try {
      const { x, y, width, height } = pathRef.current.getBBox();
      if (width > 0 && height > 0) {
        const pad = Math.max(width, height) * 0.1;
        setViewBox(`${x - pad} ${y - pad} ${width + pad * 2} ${height + pad * 2}`);
      }
    } catch {}
  }, [d]);

  return (
    <svg
      className="w-[22px] h-[22px] mr-2 shrink-0 rounded-sm"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
    >
      <path ref={pathRef} d={d} fill={fill} />
    </svg>
  );
};

const EditorTool = ({ file, setFile }) => {
  const { files, setFiles, selectedFile, setActivePathIndex } = useContext(Context);
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

  return (
    <div
      data-testid="EditorTool"
      className="w-[280px] min-w-[280px] h-full flex flex-col justify-start items-start bg-surface-2 rounded-xl overflow-hidden z-[1] border border-t-edge-t border-x-edge-x border-b-edge-b"
      key={selectedFile}
    >
      <div className="text-[11px] m-0 w-full bg-surface-3 text-txt-3 font-normal px-2 leading-[22px]">
        Paths
        <span className="text-txt-4 ml-[5px]">{file?.paths?.length || 0}</span>
      </div>
      <div className="w-full h-full flex flex-col justify-start items-start bg-surface-2">
        <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
          {file?.paths.map((path, index) => (
            <div
              key={path + index}
              className="group h-[30px] text-xs whitespace-nowrap overflow-hidden max-w-full w-full border-b border-panel flex items-center hover:bg-surface-4 transition-colors duration-150"
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
              <div className="mr-1 text-txt-1 select-none flex whitespace-nowrap">
                Path {index + 1}
              </div>
              <PathPreview d={path} fill={file?.fills[index] || '#a1a1aa'} />
              <div className="pr-2.5 w-full text-txt-6 overflow-x-hidden flex items-center">
                <span className="w-full overflow-hidden leading-[30px] select-none">{path}</span>
                <Trash2
                  className="text-txt-5 ml-auto pl-2.5 min-w-[16px] min-h-[16px] hidden group-hover:block cursor-pointer hover:opacity-80"
                  size={16}
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
