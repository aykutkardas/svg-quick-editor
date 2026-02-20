import { HexColorPicker } from 'react-colorful';
import OutsideClickHandler from 'react-outside-click-handler';
import hotkeys from 'hotkeys-js';

import { useEffect } from 'react';
import shortcuts from '../../shortcuts';

const ColorPickerPopup = ({ closePicker, positions, color, handleColor }) => {
  const handleClose = () => {
    closePicker?.();
  };

  useEffect(() => {
    hotkeys(shortcuts.close, handleClose);

    return () => hotkeys.unbind(shortcuts.close);
  }, []);

  const [screenY = 0, screenX = 0] = positions || [];

  return (
    <div
      data-testid="ColorPicker"
      className="fixed z-50"
      style={{
        top: screenY - 150,
        left: screenX - 420,
      }}
    >
      <OutsideClickHandler onOutsideClick={handleClose}>
        <HexColorPicker color={color} onChange={handleColor} />
      </OutsideClickHandler>
    </div>
  );
};

export default ColorPickerPopup;
