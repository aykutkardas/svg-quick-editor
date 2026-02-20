import { useContext, useEffect, useRef } from 'react';
import cx from 'classnames';
import hotkeys from 'hotkeys-js';

import { Plus } from 'lucide-react';

import getSelectedFiles from '../../utils/getSelectedFiles';
import { Context } from '../../contexts/FilesContext';
import Tooltip from '../Tooltip';

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
    <Tooltip text="Add SVG Files" shortcut={getReadableShortcut(shortcuts.addFiles)}>
      <div data-testid="UploadButton" className={cx(className, 'text-xs select-none w-full')}>
        <label
          htmlFor="upload-input"
          className="w-full cursor-pointer flex items-center h-full relative"
        >
          <Plus size={16} className="shrink-0 text-teal-300" />
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
    </Tooltip>
  );
};

export default UploadButton;
