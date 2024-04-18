import React from "react";
import Link from "next/link";
import Button,{ButtonProps} from '@mui/material/Button';
import '../button/GButton.module.css';
import { styled } from '@mui/material/styles';
interface GButtonProps extends ButtonProps {
  children?: React.ReactNode;
  type?: "button" | "reset" | "submit" | undefined;
}


const GButton: React.FC<GButtonProps> = ({ children,type, color="gprimary", sx, ...otherProps }) => {
  return (
    <Link href="#">
      <Button
        variant="contained"
        color={color}
        size="large"
        type={type}
        className="continue"
        sx={{
          borderRadius: '0.5rem',
          margin: '0.5rem',
          py:'0.5rem',
          fontWeight: 600,
          textTransform: 'capitalize',
          ...(sx || {})
        }}
      {...otherProps}
    >
      {children}
    </Button>
   </Link>
  );
};

export default GButton;
