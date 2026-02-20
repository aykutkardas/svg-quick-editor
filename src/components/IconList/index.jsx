import { useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import cx from 'classnames';

import Icon from '../Icon';
import UploadButton from '../UploadButton';
import ImportButton from '../ImportButton';
import ExportButton from '../ExportButton';
import DownloadButton from '../DownloadButton';

import { Context } from '../../contexts/FilesContext';
import convertToSVG from '../../utils/convertToSVG';

const listItemClass =
  'text-sm cursor-pointer min-h-[30px] flex items-center justify-start px-2 text-txt-2 whitespace-nowrap bg-transparent hover:bg-surface-4';

const IconList = () => {
  const { files, deleteFile, selectedFile, setSelectedFile } = useContext(Context);

  const handleDelete = (file, event) => {
    event.stopPropagation();

    deleteFile(file);
  };

  return (
    <div
      data-testid="IconList"
      className="w-[250px] min-w-[250px] h-full flex flex-col justify-start items-start bg-surface-2 overflow-y-auto overflow-x-hidden border-r border-panel z-[1]"
    >
      <div className="text-[11px] m-0 w-full bg-surface-3 text-txt-3 font-normal px-2 leading-[22px] h-[50px] py-2 flex items-center select-none">
        <img src="/logo.png" alt="zap" />
      </div>
      <UploadButton className={listItemClass} />
      <ImportButton className={listItemClass} />
      <ExportButton className={listItemClass} />
      <h4 className="text-[11px] m-0 w-full bg-surface-3 text-txt-3 font-normal px-2 leading-[22px]">
        Files <span className="text-txt-4 ml-[5px]">{Object.keys(files).length}</span>
      </h4>
      <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
        {Object.values(files).map((file, index) => (
          <div
            data-testid={`IconListItem${index + 1}`}
            key={file.name}
            className={cx('group', listItemClass, {
              'bg-surface-4': file.name === selectedFile,
            })}
            onClick={() => setSelectedFile(file.name)}
          >
            <span
              className="mr-2 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:fill-[#c9c1be]"
              dangerouslySetInnerHTML={{ __html: convertToSVG(file) }}
            />
            <span className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
              {file.name}
            </span>
            <span className="inline-flex items-center ml-auto justify-between invisible pointer-events-none group-hover:visible group-hover:pointer-events-auto [&_svg]:ml-[5px]">
              <DownloadButton file={file} />
              <Icon
                className="text-txt-5 hover:opacity-80"
                size={18}
                icon="multiply"
                onClick={event => handleDelete(file, event)}
              />
            </span>
          </div>
        ))}
      </Scrollbars>
      <div className="w-full h-[50px] flex items-center justify-center bg-surface-3">
        <a
          href="https://github.com/aykutkardas/svg-quick-editor"
          target="_blank"
          rel="noreferrer"
          className="text-white no-underline hover:opacity-80 transition-opacity"
        >
          <Icon size={18} icon="github" className="mx-2" />
        </a>
        <a
          href="https://twitter.com/aykutkardas"
          target="_blank"
          rel="noreferrer"
          className="text-white no-underline hover:opacity-80 transition-opacity"
        >
          <Icon size={18} icon="twitter" className="mx-2" />
        </a>
      </div>
    </div>
  );
};

export default IconList;
