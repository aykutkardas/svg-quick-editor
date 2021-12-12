import { useContext, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import xor from 'lodash.xor';

import ColorPicker from '../ColorPicker';

import { Context } from '../../contexts/FilesContext';

import getColorCount from '../../utils/getColorCount';

import * as styles from './ColorGroups.module.css';

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
    <div data-testid="ColorGroups" className={styles.ColorGroups}>
      <div className={styles.ColorGroupsTitle}>
        Color Groups <span>{xor(file?.fills).length || 0}</span>
      </div>
      <Scrollbars autoHide style={{ width: '100%', height: '50px' }}>
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
                {(fill || '#EEEEEE').toUpperCase()} <span>{getColorCount(file, fill)}</span>
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
