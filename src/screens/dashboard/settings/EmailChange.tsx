"use client";

import React from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { EmailChangeSchema } from "@/utils/ValidationSchema";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateUserProfile } from "@/lib/features/userSlice";
import { showSnackbar } from "@/components/root-snackbar";
import { useRouter } from "next/navigation";

const EmailChange = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      email: user?.email,
    },
    validationSchema: EmailChangeSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(
          updateUserProfile({
            id: user.id,
            data: {
              email: values.email,
            },
          })
        ).unwrap();

        dispatch(
          showSnackbar({
            type: "success",
            message: "E-Mail-Adresse wurde erfolgreich geändert",
          })
        );
      } catch {
        dispatch(
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
                onClick={() => router.push("/real_estate/dashboard")}
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

export default EmailChange;

// Styles
const styles = {
  sectionTitle: {
    fontWeight: 600,
  },
  sectionDescription: {
    mb: 1,
  },
};
