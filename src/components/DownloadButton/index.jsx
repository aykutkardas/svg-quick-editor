import Icon from '../../components/Icon';
import convertToSVG from '../../utils/convertToSVG';

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
    <button
      data-testid="DownloadButton"
      className="bg-transparent border-0 p-0 cursor-pointer [&_svg]:text-txt-5 hover:[&_svg]:opacity-80"
      onClick={onClick}
    >
      <Icon icon="save" size={16} />
    </button>
  ) : null;
};

export default DownloadButton;
