"use client";

import React from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

const UserProfile = (): JSX.Element => {
  const formik = useFormik({
    initialValues: {
      profilePhoto: null,
      firstName: "Mario",
      lastName: "Müller",
      email: "mario.mueller@gmail.com",
      position: "Fire Inspector",
      inviteEmail: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={4}>
        {/* Profilfoto Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Profilfoto
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Das Foto wird für alle Benutzer angezeigt
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid #ddd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              {formik.values.profilePhoto ? (
                <img
                  src={formik.values.profilePhoto}
                  alt="Profilfoto"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Typography variant="caption" color="textSecondary">
                  Photo
                </Typography>
              )}
            </Box>
            <Button variant="outlined" component="label">
              Click to upload
              <input
                type="file"
                hidden
                onChange={(e) =>
                  formik.setFieldValue(
                    "profilePhoto",
                    e.target.files?.[0]
                      ? URL.createObjectURL(e.target.files[0])
                      : null
                  )
                }
              />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Voller Name Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Voller Name
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Dies wird in Ihrem Profil angezeigt.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
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
                helperText={formik.touched.firstName && formik.errors.firstName}
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
                helperText={formik.touched.lastName && formik.errors.lastName}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* E-Mail Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            E-Mail
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Sie können Ihre E-Mail-Adresse ändern, indem Sie einen Code auf dem
            Postweg erhalten.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
              <TextField
                label="E-Mail"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" fullWidth size="large">
                Change
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Position Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Position
          </Typography>
          <Typography variant="body2" color="textSecondary">
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
            helperText={formik.touched.position && formik.errors.position}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Lade Teammitglieder ein Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Lade Teammitglieder ein
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Laden Sie ihn einfach als Teammitglied ein. Auf diese Weise haben
            Sie gemeinsame Bestellungen, Chats und mehr.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
              <TextField
                label="E-Mail"
                name="inviteEmail"
                value={formik.values.inviteEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.inviteEmail &&
                  Boolean(formik.errors.inviteEmail)
                }
                helperText={
                  formik.touched.inviteEmail && formik.errors.inviteEmail
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" fullWidth size="large">
                Invite
              </Button>
            </Grid>
          </Grid>
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
