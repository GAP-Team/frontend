import { Typography, SxProps, Theme } from "@mui/material";

interface PageTitleProps {
  title: string; // Text to display
  sx?: SxProps<Theme>; // Optional style overrides
}

const PageTitle: React.FC<PageTitleProps> = ({ title, sx }) => {
  return (
    <Typography variant="h3" sx={{ ...styles, ...sx }}>
      {title}
    </Typography>
  );
};

export default PageTitle;

//Styles
const styles = {
  fontSize: "2rem",
  lineHeight: "2.5rem",
  fontWeight: "700",
  marginLeft: "3.75rem",
  my: "2rem",
};
