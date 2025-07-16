import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/system";

interface ScrollableSectionProps {
  children: ReactNode; // This allows any React children to be passed
  sx?: SxProps<Theme>; // Optional style props using MUI's system
}

const ScrollableLayout: React.FC<ScrollableSectionProps> = ({
  children,
  sx,
}) => {
  const rootStyles = { ...styles, ...sx };
  return <Box sx={rootStyles}>{children}</Box>;
};

export default ScrollableLayout;

// Styles
const styles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  height: "100%", // Ensures the component takes the full height of its container
};
