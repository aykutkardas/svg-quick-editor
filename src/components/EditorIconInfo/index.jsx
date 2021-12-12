import filesize from 'filesize';

import Icon from '../Icon';

import convertToSVG from '../../utils/convertToSVG';

import * as styles from './EditorIconInfo.module.css';

const EditorIconInfo = ({ file }) => {
  if (!file) return null;
  const fileContentLength = convertToSVG(file)?.length || 0;

  const size = file.width && file.height ? `${file.width}x${file.height}` : null;

  const fileSize = fileContentLength ? filesize(fileContentLength) : null;

  return (
    <span data-testid="EditorIconInfo" className={styles.EditorIconInfo}>
      <span>
        <Icon icon="tag" size={14} />
        {file.name}
      </span>
      <span>
        <Icon icon="expand-full" size={14} />
        {size}
      </span>
      <span>
        <Icon icon="box" size={14} />
        {fileSize}
      </span>
    </span>
  );
};

export default EditorIconInfo;
