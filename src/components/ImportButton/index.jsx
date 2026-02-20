import { useContext, useEffect, useRef } from 'react';
import cx from 'classnames';
import hotkeys from 'hotkeys-js';

import Icon from '../Icon';

import getImportFile from '../../utils/getImportFile';
import { Context } from '../../contexts/FilesContext';

import shortcuts from '../../shortcuts';

import getReadableShortcut from '../../utils/getReadableShortcut';

const ImportButton = ({ className }) => {
  const inputRef = useRef();
  const { files, setFiles } = useContext(Context);

  const handleFileInput = async event => {
    const newFiles = await getImportFile(event);
    setFiles({ ...files, ...newFiles });
  };

  useEffect(() => {
    hotkeys(shortcuts.importJSON, event => {
      event.preventDefault();
      inputRef.current.click();
    });

    return () => hotkeys.unbind(shortcuts.importJSON);
  }, []);

  return (
    <div
      data-testid="ImportButton"
      className={cx(
        className,
        'text-xs select-none w-full [&_svg]:text-txt-5 [&_svg]:mr-[5px] hover:[&_svg]:opacity-80',
      )}
    >
      <label
        htmlFor="import-input"
        className="w-full cursor-pointer flex items-center h-full relative"
      >
        <Icon icon="arrow-up" size={16} /> Import JSON
        <span className="text-txt-4 absolute right-5 text-[10px] font-bold text-right opacity-40">
          {getReadableShortcut(shortcuts.importJSON)}
        </span>
        <input
          id="import-input"
          type="file"
          accept="application/json"
          ref={inputRef}
          onChange={handleFileInput}
          className="invisible pointer-events-none"
        />
      </label>
    </div>
  );
};

export default ImportButton;
