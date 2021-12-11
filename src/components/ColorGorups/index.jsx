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
    setPositions([screenX, screenY]);
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
      <div
        className={styles.ColorGroupsItemColorPicker}
        style={{ top: positions?.[1] - 270, left: positions?.[0] + 10 }}
      >
        <OutsideClickHandler onOutsideClick={closeColor}>
          {openColorGroup && <HexColorPicker color={colorGroup} onChange={handleColorGroup} />}
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default ColorGroups;
