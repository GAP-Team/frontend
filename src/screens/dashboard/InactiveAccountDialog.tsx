import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface InactiveAccountDialogProps {
  open: boolean;
  handleClose: () => void;
}

const InactiveAccountDialog: React.FC<InactiveAccountDialogProps> = ({
  open,
  handleClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="inactive-account-dialog"
    >
      <DialogTitle id="inactive-account-dialog">
        Wir prüfen aktuell Ihre Unternehmensdaten.
      </DialogTitle>
      <DialogContent>
        <Typography>
          Die Verifizierung Ihres Unternehmens kann etwas Zeit in Anspruch
          nehmen. Sie erhalten eine Benachrichtigung, sobald die Prüfung
          abgeschlossen ist.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Schließen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InactiveAccountDialog;
