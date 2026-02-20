import { HexColorPicker } from 'react-colorful';
import OutsideClickHandler from 'react-outside-click-handler';
import hotkeys from 'hotkeys-js';

import { useEffect } from 'react';
import shortcuts from '../../shortcuts';

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

  useEffect(() => {
    hotkeys(shortcuts.close, handleClose);

    return () => hotkeys.unbind(shortcuts.close);
  }, []);

  return (
    <div
      data-testid="ColorPicker"
      className="absolute bottom-[calc(130px+30px)] h-[200px]"
      style={getColorWheelPosition(positions)}
    >
      <OutsideClickHandler onOutsideClick={handleClose}>
        <HexColorPicker color={color} onChange={handleColor} />
      </OutsideClickHandler>
    </div>
  );
};

export default ColorGroups;
