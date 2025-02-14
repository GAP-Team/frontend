"use client";

import React from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import { ROUTES } from "@/utils/routes";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { showSnackbar } from "@/components/root-snackbar";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { updateUserProfile } from "@/lib/features/userSlice";
import { UserProfileSchema } from "@/utils/ValidationSchema";

const UserProfile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      position: user?.position,
    },
    validationSchema: UserProfileSchema,
    onSubmit: async (values) => {
      const changedFields = Object.entries(values).reduce<
        Record<string, string>
      >((acc, [key, value]) => {
        if (value !== formik.initialValues[key as keyof typeof values]) {
          acc[key] = value;
        }
        return acc;
      }, {});

      if (!Object.keys(changedFields).length) {
        dispatch(
          showSnackbar({
            type: "info",
            message: "Es gibt keine Änderungen zum Speichern.",
          })
        );
        return;
      }

      try {
        await dispatch(
          updateUserProfile({
            id: user.id,
            data: changedFields,
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
              "Die Benutzerdaten konnten nicht aktualisiert werden. Bitte versuchen Sie es erneut.",
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
            Beruf
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
            value={formik.values.position}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.position && Boolean(formik.errors.position)}
            helperText={
              formik.touched.position && formik.errors.position?.toString()
            }
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
              <Button
                variant="outlined"
                onClick={() => router.push(ROUTES.REAL_ESTATE.DASHBOARD)}
              >
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
