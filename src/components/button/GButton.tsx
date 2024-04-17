import React from "react";
import Link from "next/link";
import Button, { ButtonProps } from "@mui/material/Button";
import "../button/GButton.module.css";

interface GButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

const GButton: React.FC<GButtonProps> = ({
  children,
  color = "gprimary",
  sx,
  ...otherProps
}) => {
  return (
    <Link href="#">
      <Button
        variant="contained"
        color={color}
        size="large"
        className="continue"
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
    </Link>
  );
};

export default GButton;
