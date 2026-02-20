import filesize from 'filesize';

import Icon from '../Icon';

import convertToSVG from '../../utils/convertToSVG';

const EditorIconInfo = ({ file }) => {
  if (!file) return null;
  const fileContentLength = convertToSVG(file)?.length || 0;

  const size = file.width && file.height ? `${file.width}x${file.height}` : null;

  const fileSize = fileContentLength ? filesize(fileContentLength) : null;

  return (
    <span data-testid="EditorIconInfo" className="text-[11px] ml-auto text-txt-4">
      <span className="ml-[15px] inline-flex items-center">
        <Icon icon="tag" size={14} className="mr-[5px]" />
        {file.name}
      </span>
      <span className="ml-[15px] inline-flex items-center">
        <Icon icon="expand-full" size={14} className="mr-[5px]" />
        {size}
      </span>
      <span className="ml-[15px] inline-flex items-center">
        <Icon icon="box" size={14} className="mr-[5px]" />
        {fileSize}
      </span>
    </span>
  );
};

export default EditorIconInfo;
