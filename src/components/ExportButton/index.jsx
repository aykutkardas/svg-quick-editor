import { useContext } from 'react';
import cx from 'classnames';

import Icon from '../../components/Icon';

import { Context } from '../../contexts/FilesContext';

import * as styles from './ExportButton.module.css';

const ExportButton = ({ className }) => {
  const { files } = useContext(Context);

  const onClick = () => {
    const content = JSON.stringify(files, null, 2);

    var dataStr = 'data:application/json;charset=utf-8,' + encodeURIComponent(content);
    var downloadElement = document.createElement('a');
    downloadElement.setAttribute('href', dataStr);
    downloadElement.setAttribute('download', 'svg-quick-editor-collection.json');
    downloadElement.click();
  };

  return Object.keys(files).length > 0 ? (
    <button
      data-testid="ExportButton"
      className={cx(className, styles.ExportButton)}
      onClick={onClick}
    >
      <Icon icon="arrow-down" size={16} /> Export JSON
    </button>
  ) : null;
};

export default ExportButton;
