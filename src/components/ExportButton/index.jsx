import { useContext, useEffect } from 'react';
import cx from 'classnames';
import hotkeys from 'hotkeys-js';

import { Download, Upload } from 'lucide-react';

import { Context } from '../../contexts/FilesContext';

import shortcuts from '../../shortcuts';

import getReadableShortcut from '../../utils/getReadableShortcut';

const ExportButton = ({ className }) => {
  const { files } = useContext(Context);

  const onClick = event => {
    event.preventDefault();
    const content = JSON.stringify(files, null, 2);

    var dataStr = 'data:application/json;charset=utf-8,' + encodeURIComponent(content);
    var downloadElement = document.createElement('a');
    downloadElement.setAttribute('href', dataStr);
    downloadElement.setAttribute('download', 'svg-quick-editor-collection.json');
    downloadElement.click();
  };

  useEffect(() => {
    hotkeys(shortcuts.exportJSON, onClick);

    return () => hotkeys.unbind(shortcuts.exportJSON);
  }, []);

  return Object.keys(files).length > 0 ? (
    <button
      data-testid="ExportButton"
      className={cx(className, 'w-full border-0 text-xs cursor-pointer relative')}
      onClick={onClick}
    >
      <Upload size={16} className="shrink-0 mr-[5px] text-neutral-400" />{' '}
      <span className="w-full text-left">Export JSON</span>
      <span className="flex items-center gap-1 ml-auto">
        {getReadableShortcut(shortcuts.exportJSON)
          .split(' + ')
          .map((key, i) => (
            <kbd key={i}>{key}</kbd>
          ))}
      </span>
    </button>
  ) : null;
};

export default ExportButton;
