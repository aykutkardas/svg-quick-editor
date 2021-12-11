const getImportFile = async event => {
  if (window.FileList && window.File && window.FileReader) {
    const [file] = event.target.files;

    if (file && (!file.type || file.type !== 'application/json')) {
      return {};
    }

    const blob = new Blob([file], { type: 'application/json' });

    const content = await blob.text();

    return JSON.parse(content);
  }
};

export default getImportFile;
