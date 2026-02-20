const toHex = color => {
  if (!color) return color;
  const rgb = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgb) {
    const r = parseInt(rgb[1]).toString(16).padStart(2, '0');
    const g = parseInt(rgb[2]).toString(16).padStart(2, '0');
    const b = parseInt(rgb[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }
  return color;
};

export default toHex;
