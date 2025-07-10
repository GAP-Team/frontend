"use client";

import React from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import { ROUTES } from "@/utils/routes";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { showSnackbar } from "@/components/feedback/root-snackbar";
import { EmailChangeSchema } from "@/utils/ValidationSchema";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  updateUserProfile,
  sendUserActivityEmail,
} from "@/lib/features/userSlice";
import { USER_ACTIVITY_EMAIL_TEMPLATES } from "@/utils/Constants";
import GButton from "@/components/button/GButton";

const ChangeEmail = (): JSX.Element => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      password: "",
    },
    validationSchema: EmailChangeSchema,
    onSubmit: async (values) => {
      try {
        await appDispatch(
          updateUserProfile({
            id: user.id,
            data: {
              email: values.email,
            },
          })
        ).unwrap();

        const userActivityPayload = {
          email: values.email,
          userFirstName: user?.firstName,
          templateName: USER_ACTIVITY_EMAIL_TEMPLATES.EMAIL_CHANGE,
        };
        await appDispatch(
          sendUserActivityEmail({
            data: userActivityPayload,
          })
        ).unwrap();

        appDispatch(
          showSnackbar({
            type: "success",
            message: "E-Mail-Adresse wurde erfolgreich geändert",
          })
        );

        formik.resetForm();
      } catch {
        appDispatch(
          showSnackbar({
            type: "error",
            message:
              "E-Mail-Adresse konnte nicht geändert werden. Bitte versuchen Sie es erneut.",
          })
        );
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={4}>
        {/* E-Mail Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            E-Mail
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
            Sie können Ihre E-Mail-Adresse ändern, indem Sie einen Code an Ihre
            E-Mail-Adresse geschickt bekommen. Geben Sie den Code ein, um die
            Änderung zu bestätigen.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} mt={1}>
          <TextField
            label="E-Mail"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email?.toString()}
            fullWidth
          />
          <TextField
            fullWidth
            name="password"
            type="password"
            autoComplete="off"
            label="Current Passwort"
            onBlur={formik.handleBlur}
            style={{ marginTop: "1rem" }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={
              formik.touched.password && formik.errors.password?.toString()
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <GButton
                variant="outlined"
                onClick={() => router.push(ROUTES.REAL_ESTATE.DASHBOARD)}
              >
                Abbrechen
              </GButton>
            </Grid>
            <Grid item>
              <GButton variant="contained" color="primary" type="submit">
                Änderungen speichern
              </GButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangeEmail;

// Styles
const styles = {
  sectionTitle: {
    fontWeight: 600,
  },
  sectionDescription: {
    mb: 1,
  },
};
