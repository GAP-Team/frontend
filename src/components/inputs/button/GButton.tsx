import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { SxProps } from "@mui/system";

interface GButtonProps extends ButtonProps {
  children?: React.ReactNode;
  href?: string;
  type?: "button" | "reset" | "submit" | undefined;
  sx?: SxProps;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const buttonStyles: SxProps = {
  borderRadius: "0.5rem",
  margin: "0.5rem",
  py: "0.5rem",
  fontWeight: 600,
  textTransform: "capitalize",
};

const GButton: React.FC<GButtonProps> = ({
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
        ...buttonStyles,
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
