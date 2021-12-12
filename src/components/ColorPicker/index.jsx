import { HexColorPicker } from 'react-colorful';
import OutsideClickHandler from 'react-outside-click-handler';

import * as styles from './ColorPicker.module.css';

const ColorGroups = ({ closePicker, positions, color, handleColor }) => {
  const getColorWheelPosition = positions => {
    if (!positions) return;
    const verticalOffset = 10;
    const horizontalOffset = 290;
    const [top = 0, left = 0] = positions;

    return {
      top: top - horizontalOffset,
      left: left + verticalOffset,
    };
  };

  const handleClose = () => {
    closePicker?.();
  };

  return (
    <div
      data-testid="ColorPicker"
      className={styles.ColorPicker}
      style={getColorWheelPosition(positions)}
    >
      <OutsideClickHandler onOutsideClick={handleClose}>
        <HexColorPicker color={color} onChange={handleColor} />
      </OutsideClickHandler>
    </div>
  );
};

export default ColorGroups;
