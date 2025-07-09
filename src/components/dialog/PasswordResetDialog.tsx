import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  SxProps,
  Theme,
} from "@mui/material";
import { FaRegEnvelope } from "react-icons/fa";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import { passwordResetValidationSchema } from "@/utils/ValidationSchema";

interface PasswordResetDialogProps {
  open: boolean;
  handleClose: () => void;
}

const PasswordResetDialog: React.FC<PasswordResetDialogProps> = ({
  open,
  handleClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: passwordResetValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setLoading(true);
        // await emailAPIs.sendPasswordResetEmail({ email: values.email });
        setSuccess(true);
      } catch (error) {
        setErrors({
          email:
            "Ein Fehler ist aufgetreten. Bitte versuche es später noch einmal.",
        });
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setSuccess(false);
    handleClose();
  };
    return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: styles.dialogPaper
      }}
    >
      <DialogTitle sx={styles.dialogTitle}>
        Passwort zurücksetzen
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        {!success ? (
          <>
            <Typography variant="body1" sx={styles.dialogDescription}>
              Bitte gib deine E-Mail-Adresse ein, damit wir dir einen Link zum
              Zurücksetzen deines Passworts schicken können
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                name="email"
                label="E-Mail-Adresse"
                type="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaRegEnvelope style={{ color: "#666" }} />
                    </InputAdornment>
                  ),
                  sx: styles.textFieldInput
                }}
                sx={styles.textField}
              />
            </form>
          </>
        ) : (
          <Box sx={styles.successBox}>
            <Typography variant="body1" color="success.main" sx={styles.successText}>
              Eine E-Mail mit Anweisungen zum Zurücksetzen deines Passworts
              wurde an {formik.values.email} gesendet.
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
        {!success ? (
          <>
            <Button
              onClick={() => formik.handleSubmit()}
              variant="contained"
              color="gprimary"
              sx={styles.sendButton}
              fullWidth
              disabled={loading || formik.isSubmitting}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              Senden
            </Button>
          </>
        ) : (
          <Button
            onClick={handleReset}
            variant="contained"
            color="gprimary"
            sx={styles.closeButton}
          >
            Schließen
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

// Styles
const styles: Record<string, SxProps<Theme>> = {
  dialogPaper: {
    borderRadius: 2,
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
  },
  dialogTitle: { 
    fontWeight: "bold", 
    py: 3, 
    textAlign: 'center' 
  },
  dialogContent: { 
    px: 4,  
  },
  dialogDescription: { 
    mb: 3, 
    textAlign: 'center' 
  },
  textField: { 
    mb: 2 
  },
  textFieldInput: { 
    borderRadius: 2 
  },
  successBox: { 
    textAlign: "center", 
    py: 3, 
    px: 2 
  },
  successText: { 
    fontWeight: 500 
  },
  dialogActions: { 
    p: 3, 
    display: "block" 
  },
  sendButton: { 
    borderRadius: 5, 
    py: 1.5,
    fontWeight: 500,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  closeButton: { 
    width: "100%", 
    borderRadius: 5,
    py: 1.5,
    fontWeight: 500, 
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  }
};

export default PasswordResetDialog;
