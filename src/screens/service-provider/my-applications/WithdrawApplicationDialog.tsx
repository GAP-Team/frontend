import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { MyApplication } from "./types";

interface WithdrawApplicationDialogProps {
  application: MyApplication | null;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const WithdrawApplicationDialog: React.FC<WithdrawApplicationDialogProps> = ({
  application,
  loading,
  onConfirm,
  onClose,
}) => (
  <Dialog open={!!application} onClose={() => !loading && onClose()}>
    <DialogTitle>Bewerbung zurückziehen?</DialogTitle>
    <DialogContent>
      <Typography>
        Ihre Bewerbung auf „{application?.facilityName}“ wird endgültig
        gelöscht. Danach können Sie sich erneut bewerben, solange noch Plätze
        frei sind.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={loading}>
        Abbrechen
      </Button>
      <Button color="error" onClick={onConfirm} disabled={loading}>
        Zurückziehen
      </Button>
    </DialogActions>
  </Dialog>
);

export default WithdrawApplicationDialog;
