import { parse } from "svgps";

const getSelectedFiles = async (event) => {
  const selectedIcons = [];
  if (window.FileList && window.File && window.FileReader) {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const blob = new Blob([file], { type: "text/svg" });

      if (file && !file.type) {
        selectedIcons.push({
          name: file.name,
          error: "Error: The File.type property does not appear to be supported on this browser.",
        });
        continue;
      }

      if (file.type !== "image/svg+xml") {
        selectedIcons.push({
          name: file.name,
          error: "Error: The selected file does not appear to be an svg.",
        });
        continue;
      }

      const content = await blob.text();

      selectedIcons.push({
        name: file.name,
        content,
        ...parse(content),
      });

    }

    return selectedIcons;
  }
};

export default getSelectedFiles;
