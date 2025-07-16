import { Button, SxProps, Theme } from "@mui/material";
import { MdArrowBackIos } from "react-icons/md";

interface BackButtonProps {
  onBack: () => void;
  sx?: SxProps<Theme>;
}

const BackButton: React.FC<BackButtonProps> = ({ onBack, sx }) => {
  const btnstyles = { ...backButtonStyles, ...sx };
  return (
    <Button variant="text" sx={btnstyles} onClick={onBack}>
      <MdArrowBackIos />
      Zurück
    </Button>
  );
};

export default BackButton;

//Styles
const backButtonStyles: SxProps<Theme> = {
  display: "flex",
  fontSize: "0.875rem",
  fontWeight: "600",
  alignItems: "center",
  marginLeft: "3.75rem",
  marginTop: "2.5rem",
  color: "#8D999C",
};
