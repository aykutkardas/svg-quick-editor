import * as styles from "./Editor.module.css";
import IconList from "../../components/IconList";
import EditorTool from "../../components/EditorTool";
import EditorIcon from "../../components/EditorIcon";

const Editor = () => {
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
