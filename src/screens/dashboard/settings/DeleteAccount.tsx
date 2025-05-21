"use client";

import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { ROUTES } from "@/utils/routes";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import { showSnackbar } from "@/components/root-snackbar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { ClearLocalStorage } from "@/utils/utils";
import { deleteUser } from "@/lib/features/userSlice";
import { DeleteAccountSchema } from "@/utils/ValidationSchema";

const DeleteAccount = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  const handleDelete = async (password: string): Promise<void> => {
    try {
      await dispatch(
        deleteUser({
          id: user.id,
          currentPassword: password,
        })
      ).unwrap();

      ClearLocalStorage();
      router.push(ROUTES.LOGIN);

      dispatch(
        showSnackbar({
          type: "success",
          message: "Das Benutzerkonto wurde erfolgreich gelöscht.",
        })
      );
    } catch {
      dispatch(
        showSnackbar({
          type: "error",
          message:
            "Das Löschen des Benutzerkontos ist fehlgeschlagen. Versuchen Sie es später erneut.",
        })
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: DeleteAccountSchema,
    onSubmit: async (values) => {
      handleDelete(values.password);
    },
  });

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle1" sx={styles.sectionTitle}>
          Konto löschen
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={styles.sectionDescription}
        >
          Sie können Ihr Konto hier löschen. Nach der Löschung kann es jedoch
          nicht wiederhergestellt werden. Alle von Ihnen in dieser Software
          übermittelten Daten und Dokumente werden dauerhaft aus der
          Bewerbungsdatenbank entfernt.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} mt={1}></Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      {/* Actions */}
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              type="button"
              onClick={() => setOpen(true)}
            >
              Konto löschen
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Bestätigung erforderlich</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Bitte geben Sie Ihr Passwort ein, um die Löschung Ihres Kontos zu
              bestätigen.
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              id="password"
              margin="dense"
              name="password"
              type="password"
              label="Passwort"
              variant="standard"
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={formik?.touched?.password && formik?.errors?.password}
              error={
                formik?.touched?.password && Boolean(formik?.errors?.password)
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Abbrechen</Button>
            <Button color="error" type="submit">
              Löschen
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
};

export default DeleteAccount;

// Styles
const styles = {
  sectionTitle: {
    fontWeight: 600,
  },
  sectionDescription: {
    mb: 1,
  },
};
