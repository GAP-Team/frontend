import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { SxProps } from "@mui/system";
import { styles } from "./styles";
import type { GButtonProps } from "./types";

export const GButton: React.FC<GButtonProps> = ({
  children,
  type,
  color = "gprimary",
  href,
  sx,
  onClick,
  ...otherProps
}) => {
  return (
    <Button
      component={href ? "a" : "button"}
      href={href}
      variant="contained"
      color={color}
      size="large"
      type={type}
      sx={{
        ...styles,
        ...sx,
      }}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default GButton;