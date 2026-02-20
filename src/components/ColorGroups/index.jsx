import { useContext, useState, useRef, useEffect } from 'react';
import xor from 'lodash.xor';

import ColorPicker from '../ColorPicker';
import ColorCircle from '../ColorCircle';

import { Context } from '../../contexts/FilesContext';

import getColorCount from '../../utils/getColorCount';
import toHex from '../../utils/toHex';

const GroupPreview = ({ file, fill }) => {
  const groupRef = useRef(null);
  const [viewBox, setViewBox] = useState('0 0 24 24');

  useEffect(() => {
    if (!groupRef.current) return;
    try {
      const { x, y, width, height } = groupRef.current.getBBox();
      if (width > 0 && height > 0) {
        const pad = Math.max(width, height) * 0.1;
        setViewBox(`${x - pad} ${y - pad} ${width + pad * 2} ${height + pad * 2}`);
      }
    } catch {}
  }, [file, fill]);

  const matchingPaths = file?.paths.filter((_, i) => (file.fills[i] || null) === fill) || [];

  return (
    <svg
      className="w-[22px] h-[22px] mr-2 shrink-0 rounded-sm"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
    >
      <g ref={groupRef}>
        {matchingPaths.map((d, i) => (
          <path key={i} d={d} className="fill-neutral-600" />
        ))}
      </g>
    </svg>
  );
};

const ColorGroups = ({ file, setFile }) => {
  const { files, setFiles } = useContext(Context);
  const [openPicker, setOpenPicker] = useState(false);
  const [color, setColor] = useState();
  const [positions, setPositions] = useState([0, 0]);

  const toggleColorGroup = (color, { screenX, screenY }) => {
    setPositions([screenY, screenX]);
    setColor(color);
    setOpenPicker(!openPicker);
  };

  const closePicker = () => {
    setOpenPicker(false);
  };

  const handleColorGroup = newColor => {
    if (!file) return;
    file.fills = file.fills?.map(fill => (fill === color ? newColor : fill));

    setColor(newColor);
    setFile(file);

    files[file.name] = file;

    setFiles(files);
  };

  const uniqueFills = xor(file?.fills) || [];

  return (
    <div data-testid="ColorGroups" className="w-full">
      <div className="text-xs m-0 w-full bg-neutral-900 text-neutral-500 font-normal px-3 py-2 leading-[22px]">
        Color Groups <span className="text-neutral-600 ml-[5px]">{uniqueFills.length}</span>
      </div>
      <div className="w-full flex flex-col bg-neutral-800 text-xs overflow-y-auto h-[200px]">
        {uniqueFills.map((fill, index) => (
          <div
            key={`${index}-${fill}`}
            className="w-full min-h-[30px] flex items-center border-b border-neutral-700 hover:bg-neutral-700 transition-colors duration-150"
          >
            <div className="w-[30px] h-full flex items-center justify-center pl-2.5 mr-2.5">
              <ColorCircle
                color={fill}
                onClick={event => toggleColorGroup(fill || '#eee', event)}
              />
            </div>
            <GroupPreview file={file} fill={fill} />
            <div className="text-neutral-600 select-none whitespace-nowrap">
              {(toHex(fill) || '#EEEEEE').toUpperCase()}
            </div>
            <span className="text-neutral-400 mr-1 ml-auto text-[10px]">
              {getColorCount(file, fill)}
            </span>
          </div>
        ))}
      </div>
      {openPicker && (
        <ColorPicker
          color={color}
          handleColor={handleColorGroup}
          closePicker={closePicker}
          positions={positions}
        />
      )}
    </div>
  );
};

export default ColorGroups;
