import { useState } from 'react';

const Tooltip = ({ text, shortcut, position = 'left', children }) => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-50 pointer-events-none whitespace-nowrap px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-700 shadow-lg shadow-black/30 text-[11px] text-neutral-300 flex items-center gap-2 ${positionClasses[position]}`}
        >
          <span>{text}</span>
          {shortcut && (
            <kbd className="!bg-neutral-800 !border-neutral-600 !text-neutral-400">{shortcut}</kbd>
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
