import { parse } from "svgps";

const getSelectedFiles = async (event) => {
  const files = {};
  if (window.FileList && window.File && window.FileReader) {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const blob = new Blob([file], { type: "text/svg" });

      if (file && (!file.type || file.type !== "image/svg+xml")) {
        continue;
      }

      const content = await blob.text();

      files[file.name] = ({
        name: file.name,
        content,
        ...parse(content),
      });

    }

    return files;
  }
};

export default getSelectedFiles;
