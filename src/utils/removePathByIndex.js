const removePathByIndex = (file, index) => {
  const path = file.paths?.[index];

  if (path && file.paths?.includes(path)) {
    file.paths = file.paths?.filter((path, pathIndex) => pathIndex !== index);

    file.fills = file.fills?.filter((fill, fillIndex) => fillIndex !== index);
  }

  return file;
};

export default removePathByIndex;
