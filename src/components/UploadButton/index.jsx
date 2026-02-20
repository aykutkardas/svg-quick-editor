import { useContext, useEffect, useRef } from 'react';
import cx from 'classnames';
import hotkeys from 'hotkeys-js';

import Icon from '../Icon';

import getSelectedFiles from '../../utils/getSelectedFiles';
import { Context } from '../../contexts/FilesContext';

import shortcuts from '../../shortcuts';

import getReadableShortcut from '../../utils/getReadableShortcut';

const UploadButton = ({ className }) => {
  const inputRef = useRef();
  const { files, setFiles } = useContext(Context);

  const handleFileInput = async event => {
    const newFiles = await getSelectedFiles(event);
    setFiles({ ...files, ...newFiles });
  };

  useEffect(() => {
    hotkeys(shortcuts.addFiles, event => {
      event.preventDefault();
      inputRef.current.click();
    });

    return () => hotkeys.unbind(shortcuts.addFiles);
  }, []);

  return (
    <div data-testid="UploadButton" className={cx(className, 'text-xs select-none w-full')}>
      <label
        htmlFor="upload-input"
        className="w-full cursor-pointer flex items-center h-full relative"
      >
        <Icon icon="plus" size={16} className="mr-[5px] text-accent" /> Add SVG Files
        <span className="text-txt-4 absolute right-[18px] text-[10px] font-bold opacity-40">
          {getReadableShortcut(shortcuts.addFiles)}
        </span>
        <input
          id="upload-input"
          type="file"
          multiple
          accept="image/svg+xml"
          ref={inputRef}
          onChange={handleFileInput}
          className="absolute invisible pointer-events-none"
        />
      </label>
    </div>
  );
};

export default UploadButton;
