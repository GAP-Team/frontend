"use client";

import React from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "@/components/root-snackbar";
import { updateUserProfile } from "@/lib/features/userSlice";
import { USER_ROLE } from "@/utils/enums";
import { UserProfileSchema } from "@/utils/ValidationSchema";

const UserProfile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      position: user?.role,
    },
    validationSchema: UserProfileSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(
          updateUserProfile({
            id: user.id,
            data: {
              firstName: values.firstName,
              lastName: values.lastName,
              role: values.position,
            },
          })
        ).unwrap();

        dispatch(
          showSnackbar({
            type: "success",
            message: "Benutzerinformationen wurden erfolgreich aktualisiert.",
          })
        );
      } catch {
        dispatch(
          showSnackbar({
            type: "error",
            message:
              "Benutzerdaten konnten nicht aktualisiert werden. Versuchen Sie es erneut",
          })
        );
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={4}>
        {/* Voller Name Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Voller Name
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
            Dies wird in Ihrem Profil angezeigt.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} pt={1}>
            <Grid item xs={6}>
              <TextField
                label="Vorname"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={
                  formik.touched.firstName &&
                  formik.errors.firstName?.toString()
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Nachname"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={
                  formik.touched.lastName && formik.errors.lastName?.toString()
                }
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Position Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Position
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
            Dies wird in Ihrem Profil angezeigt.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Position"
            name="position"
            value={
              formik.values.position === USER_ROLE.REAL_ESTATE_OWNER
                ? "Immobilienbesitzer"
                : "Dienstleister"
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.position && Boolean(formik.errors.position)}
            helperText={
              formik.touched.position && formik.errors.position?.toString()
            }
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button variant="outlined" onClick={() => formik.resetForm()}>
                Abbrechen
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Änderungen speichern
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserProfile;

// Styles
const styles = {
  sectionTitle: {
    fontWeight: 600,
  },
  sectionDescription: {
    mb: 1,
  },
};
