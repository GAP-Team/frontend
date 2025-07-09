import Box, { BoxProps } from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";

interface SummaryLayoutProps extends BoxProps {
  children?: React.ReactNode;
}

const SummaryLayout: React.FC<SummaryLayoutProps> = ({ children, ...other }) => {
  const theme = useTheme();

  const defaultStyles = {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    border: `1px solid`,
    borderColor: "grey.300",
    borderRadius: "0.5rem",
    padding: "1rem",
    backgroundColor: "#F9FAFA",
    "&:hover": {
      borderColor: "grey.400",
      backgroundColor: theme.palette.action.hover,
    },
  };

  return (
    <Box sx={{ ...defaultStyles }} {...other}>
      {children}
    </Box>
  );
};

export default SummaryLayout;
