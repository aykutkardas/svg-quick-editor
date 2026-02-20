import { useContext } from 'react';
import cx from 'classnames';

import { X, Github, Twitter, Sparkles, ExternalLink } from 'lucide-react';
import UploadButton from '../UploadButton';
import ImportButton from '../ImportButton';
import ExportButton from '../ExportButton';
import DownloadButton from '../DownloadButton';

import { Context } from '../../contexts/FilesContext';
import convertToSVG from '../../utils/convertToSVG';
import truncateName from '../../utils/truncateName';

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

      <a
        href="https://fal.ai/models/fal-ai/recraft/v4/pro/text-to-vector/"
        target="_blank"
        rel="noreferrer"
        className="w-full shrink-0 flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-teal-500/10 to-violet-500/10 hover:from-teal-500/20 hover:to-violet-500/20 border-b border-neutral-700 no-underline transition-all duration-200 group/gen"
      >
        <Sparkles size={14} className="text-teal-300 shrink-0 group-hover/gen:animate-pulse" />
        <span className="text-sm flex items-center gap-1 font-medium bg-gradient-to-r from-teal-300 to-violet-400 bg-clip-text text-transparent">
          Generate SVG on fal.ai
          <ExternalLink size={11} className="shrink-0 text-violet-400" />
        </span>
      </a>

      <h4 className="text-sm flex items-center justify-between m-0 w-full bg-neutral-900/70 text-neutral-400 font-normal px-3 py-2 leading-[22px]">
        Files <span className="text-neutral-600 ml-[5px]">{Object.keys(files).length}</span>
        <div className="flex items-center gap-2 ml-auto">
          <UploadButton />
          <ImportButton />
          <ExportButton />
        </div>
      </h4>
      <div className="w-full flex-1 min-h-0 overflow-y-auto hide-scrollbar">
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
            <span className="whitespace-nowrap overflow-hidden w-full">
              {truncateName(file.name)}
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
      </div>
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
