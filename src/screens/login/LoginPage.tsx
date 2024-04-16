"use client";
import React from "react";
import { GapLogo } from "@/components/logo/GapLogo";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { FaRegEnvelope } from "react-icons/fa";
import { PiLockBold } from "react-icons/pi";
import HeroBanner from "../../components/common/InfoBanner";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase     letter, one digit, and one special character"
    ),
});

export default function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      try {
        alert(JSON.stringify(values, null, 2));
      } catch (error: any) {
        console.log("Error occured", error.message);
      }
    },
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        md={6}
        lg={6}
        sx={{
          backgroundImage: `url(/login-bg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: {
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
            xl: "block",
          },
          height: "100%",
        }}
      >
        {/* Make this Box a flex container to use Flexbox properties */}
        <HeroBanner
          title="Where skills are developed"
          subtitle="Gesetzliche Anlagenprüfung"
          copyright="©2023 GAP GmbH"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} component={Paper}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <GapLogo color="#0D1F4E" size="sm" />
          <Box sx={{ mt: 2, padding: 5, borderRadius: "1rem", boxShadow: 3 }}>
            <Grid container sx={{ mb: "2rem", color: "#1E3137" }}>
              <Grid item xs>
                <Link
                  href="#"
                  variant="h6"
                  sx={{
                    fontSize: "1.5rem",
                    color: "black",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Anmelden
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  sx={{ fontSize: "1rem", fontWeight: "bold", color: "black" }}
                >
                  Passwort vergessen
                </Link>
              </Grid>
            </Grid>
            <form
              onSubmit={formik.handleSubmit}
              style={{
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                width: "33rem",
              }}
            >
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaRegEnvelope />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 4 }}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PiLockBold />
                    </InputAdornment>
                  ),
                }}
              />
            <Grid container sx={{ mt: 10 }}>
              <Grid item xs sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="body2"
                  style={{
                    color: "#475A60",
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                  }}
                  >
                  Noch keinen account?
                </Typography>
                <Link
                  href="/registration"
                  variant="body2"
                  style={{
                    color: "#22a7f1",
                    fontSize: "1rem",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  >
                  Registrieren
                </Link>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="gprimary"
                  size="large"
                  type="submit"
                  sx={{ borderRadius: "0.5rem" }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
          </Box>
          <Typography
            sx={{
              color: "#475A60",
              fontSize: "1rem",
              marginTop: "3rem",
              marginRight: "auto",
              marginLeft: 18.5,
            }}
          >
            Hilfe?{" "}
            <Link href="#" color="#1E3137" fontWeight="bold">
              Contact Support
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
