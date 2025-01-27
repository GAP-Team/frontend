import Button from "@mui/material/Button";
import { PiEye, PiEyeSlash } from "react-icons/pi";

interface ShowPasswordButtonProps {
  showPassword: boolean;
  onClick: () => void;
}

const ShowPasswordButton: React.FC<ShowPasswordButtonProps> = ({
  showPassword,
  onClick,
}): JSX.Element => {
  return (
    <Button
      type="button"
      onClick={onClick}
      style={styles.showPasswordButton}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <PiEyeSlash size={25} color="#666" />
      ) : (
        <PiEye size={25} color="#666" />
      )}
    </Button>
  );
};

export default ShowPasswordButton;

const styles = {
  showPasswordButton: {
    position: "absolute" as "absolute",
    right: "5rem",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
};
