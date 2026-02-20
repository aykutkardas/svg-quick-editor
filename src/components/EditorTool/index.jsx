import { useContext, useState, useRef, useEffect, useMemo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { Trash2 } from 'lucide-react';
import ColorPicker from '../ColorPicker';
import ColorCircle from '../ColorCircle';

import { Context } from '../../contexts/FilesContext';

import removePath from '../../utils/removePathByIndex';

const hexToHsl = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h, s, l];
};

const sortIndicesByColor = fills => {
  const colorCount = {};
  fills.forEach(f => {
    const key = (f || '#eeeeee').toLowerCase();
    colorCount[key] = (colorCount[key] || 0) + 1;
  });

  const indices = fills.map((_, i) => i);
  return indices.sort((a, b) => {
    const colorA = (fills[a] || '#eeeeee').toLowerCase();
    const colorB = (fills[b] || '#eeeeee').toLowerCase();
    const countDiff = colorCount[colorA] - colorCount[colorB];
    if (countDiff !== 0) return countDiff;
    const [hA, sA, lA] = hexToHsl(colorA);
    const [hB, sB, lB] = hexToHsl(colorB);
    if (Math.abs(hA - hB) > 0.02) return hA - hB;
    if (Math.abs(sA - sB) > 0.05) return sA - sB;
    return lA - lB;
  });
};

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
      <path ref={pathRef} d={d} className="fill-neutral-600" />
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

  const sortedIndices = useMemo(
    () => (file?.fills ? sortIndicesByColor(file.fills) : []),
    [file?.fills],
  );

  return (
    <div
      data-testid="EditorTool"
      className="w-full min-w-0 flex-1 flex flex-col justify-start items-start bg-neutral-800 rounded-xl overflow-hidden z-[1] border border-t-neutral-600 border-x-neutral-700 border-b-neutral-900"
      key={selectedFile}
    >
      <div className="text-[11px] m-0 w-full bg-neutral-900 text-neutral-500 font-normal px-3 py-2 leading-[22px]">
        Paths
        <span className="text-neutral-600 ml-[5px]">{file?.paths?.length || 0}</span>
      </div>
      <div className="w-full h-full flex flex-col justify-start items-start bg-neutral-800">
        <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
          {sortedIndices.map(index => {
            const path = file.paths[index];
            return (
              <div
                key={path + index}
                className="group h-[30px] text-xs whitespace-nowrap overflow-hidden max-w-full w-full border-b border-neutral-700 flex items-center hover:bg-neutral-700 transition-colors duration-150"
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

                <PathPreview d={path} fill={file?.fills[index] || '#a1a1aa'} />
                <div className="pr-2.5 w-full text-neutral-700 overflow-x-hidden flex items-center">
                  <span className="w-full overflow-hidden leading-[30px] select-none">{path}</span>
                  <Trash2
                    className="text-neutral-400 ml-auto hidden group-hover:block cursor-pointer hover:opacity-80"
                    size={16}
                    onClick={() => handleRemovePath(index)}
                  />
                </div>
              </div>
            );
          })}
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
