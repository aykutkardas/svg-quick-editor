import { useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import cx from 'classnames';

import { X, Github, Twitter } from 'lucide-react';
import UploadButton from '../UploadButton';
import ImportButton from '../ImportButton';
import ExportButton from '../ExportButton';
import DownloadButton from '../DownloadButton';

import { Context } from '../../contexts/FilesContext';
import convertToSVG from '../../utils/convertToSVG';

const listItemClass =
  'text-sm cursor-pointer min-h-[30px] flex items-center justify-start px-2 text-txt-2 whitespace-nowrap bg-transparent hover:bg-surface-4 transition-colors duration-150';

const IconList = () => {
  const { files, deleteFile, selectedFile, setSelectedFile } = useContext(Context);

  const handleDelete = (file, event) => {
    event.stopPropagation();

    deleteFile(file);
  };

  return (
    <div
      data-testid="IconList"
      className="w-[250px] min-w-[250px] h-full flex flex-col justify-start items-start bg-surface-2 overflow-y-auto overflow-x-hidden rounded-xl z-[1] border border-t-edge-t border-x-edge-x border-b-edge-b"
    >
      <div className="text-[11px] m-0 w-full bg-surface-3 text-txt-3 font-normal px-3 leading-[22px] h-[50px] py-2 flex items-center select-none rounded-t-xl">
        <img src="/logo.png" alt="zap" />
      </div>
      <UploadButton className={listItemClass} />
      <ImportButton className={listItemClass} />
      <ExportButton className={listItemClass} />
      <h4 className="text-[11px] m-0 w-full bg-surface-3 text-txt-3 font-normal px-3 py-2 leading-[22px]">
        Files <span className="text-txt-4 ml-[5px]">{Object.keys(files).length}</span>
      </h4>
      <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
        {Object.values(files).map((file, index) => (
          <div
            data-testid={`IconListItem${index + 1}`}
            key={file.name}
            className={cx('group', listItemClass, {
              'bg-surface-4 !text-accent': file.name === selectedFile,
            })}
            onClick={() => setSelectedFile(file.name)}
          >
            <span
              className="mr-2 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:fill-txt-2"
              dangerouslySetInnerHTML={{ __html: convertToSVG(file) }}
            />
            <span className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
              {file.name}
            </span>
            <span className="inline-flex items-center ml-auto justify-between invisible pointer-events-none group-hover:visible group-hover:pointer-events-auto [&_svg]:ml-[5px]">
              <DownloadButton file={file} />
              <X
                className="text-txt-5 hover:opacity-80 cursor-pointer"
                size={18}
                onClick={event => handleDelete(file, event)}
              />
            </span>
          </div>
        ))}
      </Scrollbars>
      <div className="w-full h-[50px] min-h-[50px] flex items-center justify-center bg-surface-3 rounded-b-xl">
        <a
          href="https://github.com/aykutkardas/svg-quick-editor"
          target="_blank"
          rel="noreferrer"
          className="text-txt-3 no-underline hover:text-accent transition-colors duration-150"
        >
          <Github size={18} className="mx-2" />
        </a>
        <a
          href="https://twitter.com/aykutkardas"
          target="_blank"
          rel="noreferrer"
          className="text-txt-3 no-underline hover:text-accent transition-colors duration-150"
        >
          <Twitter size={18} className="mx-2" />
        </a>
      </div>
    </div>
  );
};

export default IconList;
