import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import "../button/GButton.module.css";

interface GButtonProps extends ButtonProps {
  children?: React.ReactNode;
  href?: string;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

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
        borderRadius: "0.5rem",
        margin: "0.5rem",
        py: "0.5rem",
        fontWeight: 600,
        textTransform: "capitalize",
        ...(sx || {}),
      }}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default GButton;
