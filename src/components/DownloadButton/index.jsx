import { Save } from 'lucide-react';
import convertToSVG from '../../utils/convertToSVG';
import Tooltip from '../Tooltip';

const DownloadButton = ({ file }) => {
  const onClick = () => {
    const content = convertToSVG(file);

    var dataStr = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(content);
    var downloadElement = document.createElement('a');
    downloadElement.setAttribute('href', dataStr);
    downloadElement.setAttribute('download', file.name);
    downloadElement.click();
  };

  return file ? (
    <Tooltip text="Download SVG" position="top">
      <button
        data-testid="DownloadButton"
        className="bg-transparent border-0 p-0 cursor-pointer hover:opacity-80"
        onClick={onClick}
      >
        <Save size={16} className="text-neutral-400" />
      </button>
    </Tooltip>
  ) : null;
};

export default DownloadButton;
