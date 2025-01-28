"use client";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import GTextInput from "@/components/input/GTextInput";
import { showSnackbar } from "@/components/root-snackbar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateUserPassword } from "@/lib/features/userSlice";
import { passwordChangeSchema } from "@/utils/ValidationSchema";
import ShowPasswordButton from "@/components/button/ShowPasswordButton";
import {
  calculateStrength,
  getPasswordStrengthLabel,
  getPasswordStrengthColor,
} from "@/utils/utils";

interface ChangePasswordInitialValuesProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const initialValues: ChangePasswordInitialValuesProps = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: passwordChangeSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(
          updateUserPassword({
            id: user.id,
            data: {
              newPassword: values.newPassword,
              currentPassword: values.currentPassword,
            },
          })
        ).unwrap();

        formik.resetForm();

        dispatch(
          showSnackbar({
            type: "success",
            message: "Passwort erfolgreich geändert",
          })
        );
      } catch {
        dispatch(
          showSnackbar({
            type: "error",
            message:
              "Passwort konnte nicht geändert werden. Bitte überprüfen Sie das aktuelle Passwort und versuchen Sie es erneut",
          })
        );
      }
    },
  });

  const onPasswordChange = async (password: string): Promise<void> => {
    const strength = await calculateStrength(password);
    setPasswordStrength(strength);
  };

  const handleNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    formik?.setFieldValue("newPassword", e.target.value ? e.target.value : "");

    onPasswordChange(e.target.value);
  };

  const togglePasswordVisibility = (type: string): void => {
    if (type === "current") setShowPassword((prevState) => !prevState);
    if (type === "new") setShowNewPassword((prevState) => !prevState);
    if (type === "confirm") setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={4}>
        {/* Password Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Passwort Ändern Richtlinien
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
            Sie können Ihr Passwort ändern, indem Sie Ihr aktuelles Passwort
            eingeben. Geben Sie anschließend ein neues, sicheres Passwort ein
            und bestätigen Sie die Änderung, indem Sie das neue Passwort erneut
            eingeben.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} mt={1}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Passwort Ändern
          </Typography>
          <Grid
            item
            xs={12}
            sm={12}
            mt={3}
            style={{ display: "flex", alignItems: "center" }}
          >
            <GTextInput
              fullWidth
              type={showPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              label="Aktuelles Passwort"
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.currentPassword &&
                Boolean(formik.errors.currentPassword)
              }
              helperText={
                formik.touched.currentPassword &&
                formik.errors.currentPassword?.toString()
              }
            />
            <ShowPasswordButton
              onClick={() => togglePasswordVisibility("current")}
              showPassword={showPassword}
            />
          </Grid>
          <Grid item xs={12} sm={12} mt={3}>
            <GTextInput
              fullWidth
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              label="Neues Passwort"
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              onChange={handleNewPasswordChange}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword &&
                formik.errors.newPassword?.toString()
              }
            />
            <ShowPasswordButton
              onClick={() => togglePasswordVisibility("new")}
              showPassword={showNewPassword}
            />
          </Grid>

          {/* Passwor Strength Bar */}
          <Grid item xs={12} sm={12} mt={3}>
            <Grid style={{ marginTop: "10px" }}>
              <Grid style={styles.barContainer}>
                <Grid
                  style={{
                    height: "100%",
                    width: `${(passwordStrength / 5) * 100}%`,
                    backgroundColor: getPasswordStrengthColor(passwordStrength),
                    transition: "width 0.3s ease-in-out",
                  }}
                />
              </Grid>
              <span
                style={{
                  color: getPasswordStrengthColor(passwordStrength),
                  fontWeight: "bold",
                }}
              >
                {getPasswordStrengthLabel(passwordStrength)}
              </span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} mt={3}>
            <GTextInput
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              label="Neues Passwort wiederholen"
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword?.toString()
              }
            />
            <ShowPasswordButton
              onClick={() => togglePasswordVisibility("confirm")}
              showPassword={showConfirmPassword}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>
        {/* Actions */}
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Änderungen Speichern
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangePassword;

// Styles
const styles = {
  sectionTitle: {
    fontWeight: 600,
  },
  sectionDescription: {
    mb: 1,
  },
  barContainer: {
    height: "8px",
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "5px",
  },
  showPasswordButton: {
    position: "absolute" as "absolute",
    right: "5rem",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
};
