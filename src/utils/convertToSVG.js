const convertToSVG = file => {
  if (!file) return;

  const parent = document.createElement('div');
  const svg = document.createElement('svg');

  svg.setAttribute('viewBox', file.viewBox);
  svg.setAttribute('version', '1.1');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', file.width || '32');
  svg.setAttribute('height', file.height || '32');

  file.paths?.forEach((path, index) => {
    if (file.hiddenPaths?.includes(index)) return;

    const pathEl = document.createElement('path');
    pathEl.setAttribute('d', path);

    const fill = file.fills?.[index];
    if (file.fills?.[index]) pathEl.setAttribute('fill', fill);

    svg.appendChild(pathEl);
  });

  parent.appendChild(svg);

  return parent.innerHTML;
};

export default convertToSVG;
