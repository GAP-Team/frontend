import { useState } from "react";
import { HelpIconButtonProps } from "@/typings/types";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Tooltip, Typography, Popover, Grid } from "@mui/material";

const HelpIconButton: React.FC<HelpIconButtonProps> = ({
  iconColor,
  helpText,
}): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="" arrow>
        <span style={{ display: "inline-flex" }} onClick={handleClick}>
          <HelpOutlineIcon
            style={{ ...styles.helpIcon, color: iconColor }}
            fontSize="small"
          />
        </span>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Grid container sx={styles.innerBox}>
          <Typography variant="body2">{helpText}</Typography>
        </Grid>
      </Popover>
    </>
  );
};

export default HelpIconButton;

const styles = {
  helpIcon: {
    cursor: "pointer",
    marginLeft: "0.5rem",
    paddingBottom: "2px",
    marginBottom: "0.5rem",
  },
  innerBox: {
    p: 2,
    width: "auto",
    background: "#f1f1f1",
  },
  headerText: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
};
