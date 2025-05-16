"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import { ROUTES } from "@/utils/routes";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateUserProfile } from "@/lib/features/userSlice";
import { showSnackbar } from "@/components/root-snackbar";
import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Alert
} from '@mui/material';

const DeleteAccount = (): JSX.Element => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState('');
    const [password, setPassword] = useState('');
    
    const handleDelete = () => {
        if (password.length < 6) {
            setError('Bitte geben Sie ein gültiges Passwort ein.');
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setOpen(false);
            setSuccess('Ihr Konto wurde erfolgreich gelöscht.');
            setPassword('');
        }, 1000);
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={styles.sectionTitle}>
                    Delete Account
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={styles.sectionDescription}
                >
                    Sie können Ihr Konto hier löschen. Nach der Löschung kann es
                    jedoch nicht wiederhergestellt werden. Alle von Ihnen in dieser
                    Software übermittelten Daten und Dokumente werden dauerhaft aus der 
                    Bewerbungsdatenbank entfernt.
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} mt={1}>
                
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>

            {/* Actions */}
            <Grid item xs={12}>
                <Grid container justifyContent="flex-end" spacing={2}>
                    <Grid item>
                        <Button variant="contained" color="error" type="button" onClick={() => setOpen(true)}>
                            Konto löschen
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Bestätigung erforderlich</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bitte geben Sie Ihr Passwort ein, um die Löschung Ihres Kontos zu bestätigen.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Passwort"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Abbrechen</Button>
                    <Button color="error" onClick={handleDelete}>Löschen</Button>
                </DialogActions>
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
