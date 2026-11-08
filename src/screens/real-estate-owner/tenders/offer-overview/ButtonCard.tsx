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
import { formatDate, isDeadlineExpired } from "../tender-overview/utils";

export type OfferDecision = "accept" | "decline";

interface ButtonCardProps {
  // null while undecided, true = accepted, false = declined
  status?: boolean | null;
  // YYYY-MM-DD date until which the owner has to decide
  responseDeadline?: string;
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

const ButtonCard: React.FC<ButtonCardProps> = ({
  status,
  responseDeadline,
  onDecide,
}) => {
  const [pending, setPending] = useState<OfferDecision | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const isDecided = typeof status === "boolean";
  const isExpired = !isDecided && isDeadlineExpired(responseDeadline);
  const isLocked = isDecided || isExpired;

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
        {!isDecided && responseDeadline && (
          <Typography
            variant="bodylsb"
            color={isExpired ? "error.main" : "text.primary"}
            sx={{ textAlign: "center", mb: 2 }}
          >
            {isExpired
              ? "Frist für Rückmeldung abgelaufen"
              : `Rückmeldung bis ${formatDate(responseDeadline)}`}
          </Typography>
        )}
        <Box sx={styles.buttonContainer}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            disabled={isLocked}
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
            disabled={isLocked}
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
