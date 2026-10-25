import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export type OfferDecision = "accept" | "decline";

interface ButtonCardProps {
  // null while undecided, true = accepted, false = declined
  status?: boolean | null;
  onDecide: (decision: OfferDecision) => Promise<void>;
}

const DIALOG_TEXT: Record<OfferDecision, { title: string; content: string }> = {
  accept: {
    title: "Auftrag erteilen",
    content: "Möchten Sie diesen Anbieter wirklich beauftragen?",
  },
  decline: {
    title: "Angebot ablehnen",
    content: "Möchten Sie dieses Angebot wirklich ablehnen?",
  },
};

const ButtonCard: React.FC<ButtonCardProps> = ({ status, onDecide }) => {
  const [pending, setPending] = useState<OfferDecision | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const isDecided = typeof status === "boolean";

  const confirm = async (): Promise<void> => {
    if (!pending) return;
    setSubmitting(true);
    await onDecide(pending);
    setSubmitting(false);
    setPending(null);
  };

  return (
    <Paper sx={styles.paper}>
      <Box sx={styles.mainContainer}>
        {isDecided && (
          <Typography
            variant="bodylsb"
            color={status ? "success.main" : "error.main"}
            sx={{ textAlign: "center", mb: 2 }}
          >
            {status ? "Auftrag erteilt" : "Angebot abgelehnt"}
          </Typography>
        )}
        <Box sx={styles.buttonContainer}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            disabled={isDecided}
            onClick={() => setPending("accept")}
          >
            Auftrag erteilen
          </Button>
        </Box>
        <Box sx={styles.buttonContainer} mt={2}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            disabled={isDecided}
            onClick={() => setPending("decline")}
          >
            Angebot ablehnen
          </Button>
        </Box>
      </Box>
      <Dialog open={Boolean(pending)} onClose={() => setPending(null)}>
        {pending && (
          <>
            <DialogTitle>{DIALOG_TEXT[pending].title}</DialogTitle>
            <DialogContent>
              <Typography>{DIALOG_TEXT[pending].content}</Typography>
            </DialogContent>
            <DialogActions>
              <Button disabled={submitting} onClick={() => setPending(null)}>
                Abbrechen
              </Button>
              <Button
                variant="contained"
                color={pending === "accept" ? "success" : "error"}
                disabled={submitting}
                onClick={confirm}
              >
                Bestätigen
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Paper>
  );
};

export default ButtonCard;

// Styles

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "false",
    width: "100%",
    borderRadius: "0.8rem",
    p: "1.25rem",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
};
