import { useContext, useEffect, useRef } from 'react';
import cx from 'classnames';
import hotkeys from 'hotkeys-js';

import { Download, Upload } from 'lucide-react';

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
    <div data-testid="ImportButton" className={cx(className, 'text-xs select-none w-full ')}>
      <label
        htmlFor="import-input"
        className="w-full cursor-pointer flex items-center h-full relative"
      >
        <Download size={16} className="shrink-0 mr-[5px] text-txt-5" />{' '}
        <span className="w-full">Import JSON</span>
        <span className="flex items-center gap-1 ml-auto">
          {getReadableShortcut(shortcuts.importJSON)
            .split(' + ')
            .map((key, i) => (
              <kbd key={i}>{key}</kbd>
            ))}
        </span>
        <input
          id="import-input"
          type="file"
          accept="application/json"
          ref={inputRef}
          onChange={handleFileInput}
          className="invisible pointer-events-none w-0"
        />
      </label>
    </div>
  );
};

export default ImportButton;
