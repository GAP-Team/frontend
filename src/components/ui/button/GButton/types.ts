import { ButtonProps } from "@mui/material/Button";
import { SxProps } from "@mui/system";

export interface GButtonProps extends ButtonProps {
  children?: React.ReactNode;
  href?: string;
  type?: "button" | "reset" | "submit" | undefined;
  sx?: SxProps;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
