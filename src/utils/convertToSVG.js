const convertToSVG = (file) => {
  if (!file) return;
  const parent = document.createElement('div');

  const svg = document.createElement('svg');
  svg.setAttribute('viewBox', file.viewBox);

  file.paths?.forEach((path, index) => {
    const pathEl = document.createElement('path');
    pathEl.setAttribute('d', path);

    const fill = file.fills?.[index];
    if (file.fills?.[index]) {
      pathEl.setAttribute('fill', fill);
    }

    svg.appendChild(pathEl);
  })


  parent.appendChild(svg);

  return parent.innerHTML;
};

export default convertToSVG;