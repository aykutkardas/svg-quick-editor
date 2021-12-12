import { useContext, useEffect } from 'react';
import cx from 'classnames';
import hotkeys from 'hotkeys-js';

import Icon from '../../components/Icon';

import { Context } from '../../contexts/FilesContext';

import shortcuts from '../../shortcuts';

import * as styles from './ExportButton.module.css';
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
      className={cx(className, styles.ExportButton)}
      onClick={onClick}
    >
      <Icon icon="arrow-down" size={16} /> Export JSON
      <span>{getReadableShortcut(shortcuts.exportJSON)}</span>
    </button>
  ) : null;
};

export default ExportButton;
