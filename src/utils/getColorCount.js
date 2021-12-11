const getColorCount = (file, color) => {
  let colorCount = 0;

  file?.fills.forEach((fill) => {
    if (fill === color) colorCount++
  })


  return colorCount;
};

export default getColorCount;