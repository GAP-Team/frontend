import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import "../button/GButton.module.css";

interface GButtonProps extends ButtonProps {
  children?: React.ReactNode;
  href?: string;
  type?: "button" | "reset" | "submit" | undefined;
}

const GButton: React.FC<GButtonProps> = ({ children,type, color="gprimary",href, sx, ...otherProps }) => {

  return (
      <Button
        component="a"
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
        {...otherProps}
      >
        {children}
      </Button>
  );
};

export default GButton;
