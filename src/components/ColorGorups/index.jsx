import { useContext, useState } from 'react';
import xor from 'lodash.xor';
import { HexColorPicker } from 'react-colorful';
import OutsideClickHandler from 'react-outside-click-handler';

import { Context } from '../../contexts/FilesContext';

import getColorCount from '../../utils/getColorCount';

import * as styles from './ColorGroups.module.css';

const ColorGroups = ({ file, setFile }) => {
  const { files, setFiles } = useContext(Context);
  const [openColorGroup, setOpenColorGroup] = useState(false);
  const [colorGroup, setColorGroup] = useState();
  const [positions, setPositions] = useState([0, 0]);

  const toggleColorGroup = (colorGroup, { screenX, screenY }) => {
    setPositions([screenY, screenX]);
    setColorGroup(colorGroup);
    setOpenColorGroup(!openColorGroup);
  };

  const closeColor = () => {
    setOpenColorGroup(false);
  };

  const handleColorGroup = color => {
    if (!file) return;
    file.fills = file.fills?.map(fill => (fill === colorGroup ? color : fill));

    setColorGroup(color);
    setFile(file);

    files[file.name] = file;

    setFiles(files);
  };

  const getColorWheelPosition = positions => {
    const verticalOffset = 10;
    const horizontalOffset = 290;
    const [top = 0, left = 0] = positions;

    return {
      top: top - horizontalOffset,
      left: left + verticalOffset,
    };
  };

  return (
    <div className={styles.ColorGroups}>
      <div className={styles.ColorGroupsTitle}>Color Groups ({xor(file?.fills).length || 0})</div>
      <div className={styles.ColorGroupsItems}>
        {xor(file?.fills).map((fill, index) => (
          <div key={`${index}-${fill}`} className={styles.ColorGroupsItem}>
            <div className={styles.ColorGroupsItemColor}>
              <div
                onClick={event => toggleColorGroup(fill || '#eee', event)}
                className={styles.ColorGroupsItemColorWheel}
                style={{ backgroundColor: fill || '#eee' }}
              />
            </div>
            <div className={styles.ColorGroupsItemTitle}>
              {(fill || '#EEEEEE').toUpperCase()} <span>({getColorCount(file, fill)})</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.ColorGroupsItemColorPicker} style={getColorWheelPosition(positions)}>
        <OutsideClickHandler onOutsideClick={closeColor}>
          {openColorGroup && <HexColorPicker color={colorGroup} onChange={handleColorGroup} />}
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default ColorGroups;
