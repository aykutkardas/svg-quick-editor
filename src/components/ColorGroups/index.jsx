import { useContext, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import xor from 'lodash.xor';

import ColorPicker from '../ColorPicker';
import ColorCircle from '../ColorCircle';

import { Context } from '../../contexts/FilesContext';

import getColorCount from '../../utils/getColorCount';

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

  return (
    <div data-testid="ColorGroups" className="w-full">
      <div className="text-[11px] m-0 w-full bg-surface-3 text-txt-3 font-normal px-3 py-2 leading-[22px]">
        Color Groups <span className="text-txt-4 ml-[5px]">{xor(file?.fills).length || 0}</span>
      </div>
      <Scrollbars autoHide style={{ width: '100%', height: '50px' }}>
        <div className="w-full flex flex-row justify-start items-center flex-nowrap bg-surface-2 text-xs">
          {xor(file?.fills).map((fill, index) => (
            <div
              key={`${index}-${fill}`}
              className="w-auto h-[50px] inline-flex flex-row justify-start items-center bg-surface-2 text-xs"
            >
              <div className="w-[30px] h-full flex items-center justify-center pl-2.5 mr-[5px]">
                <ColorCircle
                  color={fill}
                  onClick={event => toggleColorGroup(fill || '#eee', event)}
                />
              </div>
              <div className="mr-5 text-txt-1 flex">
                {(fill || '#EEEEEE').toUpperCase()}{' '}
                <span className="ml-[5px] text-txt-5 text-[10px]">{getColorCount(file, fill)}</span>
              </div>
            </div>
          ))}
        </div>
      </Scrollbars>
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
