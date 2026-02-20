const truncateName = (name, max = 16) => {
  if (name.length <= max) return name;
  return `${name.slice(0, max / 2)}....${name.slice(-max / 2)}`;
};

export default truncateName;
