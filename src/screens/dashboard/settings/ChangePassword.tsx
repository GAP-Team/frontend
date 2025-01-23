"use client";

import bcrypt from "bcryptjs";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import GTextInput from "@/components/input/GTextInput";
import { showSnackbar } from "@/components/root-snackbar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateUserProfile } from "@/lib/features/userSlice";
import { passwordChangeSchema } from "@/utils/ValidationSchema";
import ShowPasswordButton from "@/components/show_password_button/ShowPasswordButton";

const ChangePassword = (): JSX.Element => {
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passwordChangeSchema,
    onSubmit: async (values) => {
      try {
        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        await dispatch(
          updateUserProfile({
            id: user.id,
            data: {
              password: hashedPassword,
            },
          })
        ).unwrap();

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
              "Password konnte nicht geändert werden. Bitte versuchen Sie es erneut.",
          })
        );
      }
    },
  });

  const calculateStrength = (password: string): Promise<number> => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    return Promise.resolve(score);
  };

  const onPasswordChange = async (password: string): Promise<void> => {
    const strength = await calculateStrength(password);
    setPasswordStrength(strength);
  };

  const getStrengthLabel = (): string => {
    switch (passwordStrength) {
      case 1:
      case 2:
        return "Schwach";
      case 3:
        return "Medium";
      case 4:
        return "Stark";
      case 5:
        return "Sehr Stark";
      default:
        return "Sehr Schwach";
    }
  };

  const getStrengthColor = (): string => {
    switch (passwordStrength) {
      case 1:
      case 2:
        return "red";
      case 3:
        return "orange";
      case 4:
        return "green";
      case 5:
        return "darkgreen";
      default:
        return "gray";
    }
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
            eingeben. Geben Sie Ihr aktuelles Passwort ein und geben Sie ein
            neues sicheres Passwort ein und geben Sie es erneut ein, um die
            Änderung zu bestätigen.
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
                    backgroundColor: getStrengthColor(),
                    transition: "width 0.3s ease-in-out",
                  }}
                />
              </Grid>
              <span
                style={{
                  color: getStrengthColor(),
                  fontWeight: "bold",
                }}
              >
                {getStrengthLabel()}
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
