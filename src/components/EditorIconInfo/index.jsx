import filesize from 'filesize';
import { Tag, Maximize2, Box } from 'lucide-react';

import convertToSVG from '../../utils/convertToSVG';

const truncateName = (name, max = 20) => {
  if (name.length <= max) return name;
  return `${name.slice(0, 8)}....${name.slice(-12)}`;
};

const EditorIconInfo = ({ file }) => {
  if (!file) return null;
  const fileContentLength = convertToSVG(file)?.length || 0;

  const size = file.width && file.height ? `${file.width}x${file.height}` : null;

  const fileSize = fileContentLength ? filesize(fileContentLength) : null;

  return (
    <span data-testid="EditorIconInfo" className="text-sm ml-auto text-neutral-400">
      <span className="ml-[15px] inline-flex items-center">
        <Tag size={14} className="mr-[5px]" />
        {truncateName(file.name)}
      </span>
      <span className="ml-[15px] inline-flex items-center">
        <Maximize2 size={14} className="mr-[5px]" />
        {size}
      </span>
      <span className="ml-[15px] inline-flex items-center">
        <Box size={14} className="mr-[5px]" />
        {fileSize}
      </span>
    </span>
  );
};

export default EditorIconInfo;
