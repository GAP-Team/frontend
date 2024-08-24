import Grid, { GridProps } from "@mui/material/Grid";
import Box, { BoxProps } from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";

interface SummaryCardProps extends BoxProps {
  children?: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ children, ...other }) => {
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

export default SummaryCard;
