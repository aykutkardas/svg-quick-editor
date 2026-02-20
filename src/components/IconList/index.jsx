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

const IconList = () => {
  const { files, deleteFile, selectedFile, setSelectedFile } = useContext(Context);

  const handleDelete = (file, event) => {
    event.stopPropagation();

    deleteFile(file);
  };

  return (
    <div
      data-testid="IconList"
      className="w-[250px] min-w-[250px] h-full flex flex-col justify-start items-start bg-neutral-800 overflow-y-auto overflow-x-hidden rounded-xl z-[1] border border-t-neutral-600 border-x-neutral-700 border-b-neutral-700 shadow-lg shadow-black/20"
    >
      <div className="text-base p-3 border-b border-neutral-700 w-full bg-neutral-900">
        <b className="italic">SVG</b> <span className="text-neutral-400">Quick Editor</span>
      </div>

      <h4 className="text-sm flex items-center  justify-between m-0 w-full bg-neutral-900/70 text-neutral-400 font-normal px-3 py-2 leading-[22px]">
        Files <span className="text-neutral-600 ml-[5px]">{Object.keys(files).length}</span>
        <div className="flex items-center gap-2 ml-auto">
          <UploadButton />
          <ImportButton />
          <ExportButton />
        </div>
      </h4>
      <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
        {Object.values(files).map((file, index) => (
          <div
            data-testid={`IconListItem${index + 1}`}
            key={file.name}
            className={cx(
              'group',
              'text-sm cursor-pointer min-h-[30px] flex items-center justify-start px-2 text-neutral-400 whitespace-nowrap bg-transparent hover:bg-neutral-700 transition-colors duration-150',
              {
                'bg-neutral-700 !text-teal-300': file.name === selectedFile,
              },
            )}
            onClick={() => setSelectedFile(file.name)}
          >
            <span
              className="mr-2 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:fill-neutral-400"
              dangerouslySetInnerHTML={{ __html: convertToSVG(file) }}
            />
            <span className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
              {file.name}
            </span>
            <span className="inline-flex items-center ml-auto justify-between invisible pointer-events-none group-hover:visible group-hover:pointer-events-auto [&_svg]:ml-[5px]">
              <DownloadButton file={file} />
              <X
                className="text-neutral-400 hover:opacity-80 cursor-pointer"
                size={18}
                onClick={event => handleDelete(file, event)}
              />
            </span>
          </div>
        ))}
      </Scrollbars>
      <div className="w-full h-[50px] min-h-[50px] flex items-center justify-center bg-neutral-900 rounded-b-xl">
        <a
          href="https://github.com/aykutkardas/svg-quick-editor"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-500 no-underline hover:text-teal-300 transition-colors duration-150"
        >
          <Github size={18} className="mx-2" />
        </a>
        <a
          href="https://twitter.com/aykutkardas"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-500 no-underline hover:text-teal-300 transition-colors duration-150"
        >
          <Twitter size={18} className="mx-2" />
        </a>
      </div>
    </div>
  );
};

export default IconList;
