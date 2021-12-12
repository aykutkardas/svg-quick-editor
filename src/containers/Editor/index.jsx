import { useEffect, useContext } from 'react';
import lookie from 'lookie';

import IconList from '../../components/IconList';
import EditorTool from '../../components/EditorTool';
import EditorIcon from '../../components/EditorIcon';

import * as styles from './Editor.module.css';

import { Context } from '../../contexts/FilesContext';

const Editor = () => {
  const { files, setFiles } = useContext(Context);

  useEffect(() => {
    const localFiles = lookie.get('files') || {};
    setFiles({ ...files, ...localFiles });
  }, []);

  return (
    <div className={styles.Editor}>
      <IconList />
      <div className={styles.EditorIconArea}>
        <EditorIcon />
        <EditorTool />
      </div>
    </div>
  );
};

export default Editor;
