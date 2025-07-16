import { Divider, SxProps, Theme } from "@mui/material";

interface DividerDecoratorProps {
  sx?: SxProps<Theme>;
}

const DividerDecorator: React.FC<DividerDecoratorProps> = ({ sx }) => {
  const styles = { ...dividerStyles, ...sx };
  return <Divider orientation="horizontal" flexItem sx={styles} />;
};

export default DividerDecorator;

//Styles
const dividerStyles: SxProps<Theme> = {
  my: 1,
  bgcolor: "#FECB00",
  borderRadius: "0.3rem",
  height: "0.125rem",
  width: "100%", // Takes the full width of the titleContainer
  maxWidth: "1.875rem", // Limits the actual visible width
};
