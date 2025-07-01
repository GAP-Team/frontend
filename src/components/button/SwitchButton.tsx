import { useState } from "react";
import Switch from "@mui/material/Switch";
import { Popover, Grid, Typography, Button } from "@mui/material";

interface SwitchButtonProps {
  color: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  checked: boolean;
  userId: string;
  onChange: (id: string, isChecked: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  color,
  checked,
  userId,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleActivateUser = (): void => {
    setIsChecked(true);
    setAnchorEl(null);
    onChange(userId, true);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Switch
        color={color}
        checked={isChecked}
        onChange={handleOnChange}
        disabled={isChecked}
      />
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
          <Typography variant="body2">
            Diese Aktion dient der Aktivierung des Benutzers. <br />
            Möchten Sie diesen Benutzer wirklich aktivieren?
          </Typography>
          <Button
            variant="text"
            sx={styles.confirmButton}
            onClick={handleActivateUser}
          >
            Bestätigen
          </Button>
        </Grid>
      </Popover>
    </>
  );
};

export default SwitchButton;

const styles = {
  innerBox: {
    p: 2,
    width: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: "#f1f1f1",
    justifyContent: "space-between",
  },
  confirmButton: {
    color: "#e3f2fd",
    cursor: "pointer",
    marginLeft: "0.8rem",
    fontSize: "0.875rem",
    textTransform: "none",
    backgroundColor: "#1976d2",
    "&:hover": {
      color: "#1976d2",
      backgroundColor: "#e3f2fd",
    },
  },
};
