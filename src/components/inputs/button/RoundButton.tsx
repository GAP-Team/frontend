interface RoundButtonProps {
  text?: string;
  color?: string;
  hoverColor?: string;
  borderColor?: string;
  handleOnClick?: () => void;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  text,
  color,
  hoverColor,
  borderColor,
  handleOnClick,
}): JSX.Element => {
  return (
    <>
      <button
        className={`text-white font-bold px-4 rounded-full py-3`}
        style={{
          ...styles.button,
          backgroundColor: color,
          color: hoverColor,
          borderColor: borderColor,
        }}
        onClick={handleOnClick}
      >
        {text}
      </button>
    </>
  );
};
export default RoundButton;

const styles = {
  button: {
    border: "solid",
    cursor: "pointer",
    marginLeft: "1rem",
    fontWeight: "bold",
    fontSize: "1.25rem",
    borderRadius: "9999px",
    padding: "0.5rem 2rem",
  },
};
