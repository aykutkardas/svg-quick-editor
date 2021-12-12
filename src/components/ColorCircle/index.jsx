import * as styles from './ColorCircle.module.css';

const ColorCircle = ({ onClick, color = '#EEEEEE' }) => {
  const handleClick = event => {
    onClick?.(event);
  };

  return (
    <div
      onClick={handleClick}
      className={styles.ColorCircle}
      style={{
        backgroundColor: color,
        background: `linear-gradient(45deg, ${color}FF 0%, ${color}B3 100%)`,
      }}
    />
  );
};

export default ColorCircle;
