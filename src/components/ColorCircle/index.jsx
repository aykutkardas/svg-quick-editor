const ColorCircle = ({ onClick, color = '#EEEEEE' }) => {
  const handleClick = event => {
    onClick?.(event);
  };

  return (
    <div
      onClick={handleClick}
      className="w-5 h-5 rounded-full cursor-pointer"
      style={{
        backgroundColor: color,
        background: `linear-gradient(45deg, ${color}FF 0%, ${color}B3 100%)`,
      }}
    />
  );
};

export default ColorCircle;
