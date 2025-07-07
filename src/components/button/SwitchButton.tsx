import { useState } from "react";
import userAPI from "@/api/user";
import Switch from "@mui/material/Switch";
import { useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "../root-snackbar";
import { Popover, Grid, Typography, Button } from "@mui/material";

interface SwitchButtonProps {
  color: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  checked: boolean;
  userId: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  color,
  userId,
  checked,
}) => {
  const appDispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showIsChecked, setshowIsChecked] = useState<boolean>(checked);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleError = (status: boolean): void => {
    setIsChecked(status);
    setshowIsChecked(status);

    appDispatch(
      showSnackbar({
        type: "error",
        message: "Etwas ist schiefgelaufen. Versuchen Sie es später erneut!",
      })
    );
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAnchorEl(event.currentTarget);
    setIsChecked(event.target.checked);
  };

  const handleUpdateUserIsActiveStatus = async (): Promise<void> => {
    setAnchorEl(null);
    setshowIsChecked(isChecked);

    try {
      if (isChecked) {
        await userAPI.activateUser(userId);
      } else {
        await userAPI.deActivateUser(userId);
      }

      appDispatch(
        showSnackbar({
          type: "success",
          message: "Benutzeraktivierung erfolgreich aktualisiert!",
        })
      );
    } catch {
      handleError(!isChecked);
      return;
    }
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Switch color={color} checked={showIsChecked} onChange={handleOnChange} />
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
            {!isChecked ? (
              <>
                Diese Aktion deaktiviert den Benutzer. <br />
                Möchten Sie diesen Benutzer wirklich deaktivieren?
              </>
            ) : (
              <>
                Diese Aktion dient der Aktivierung des Benutzers. <br />
                Möchten Sie diesen Benutzer wirklich aktivieren?
              </>
            )}
          </Typography>
          <Button
            variant="text"
            sx={styles.confirmButton}
            onClick={handleUpdateUserIsActiveStatus}
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
