"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { PiLockBold } from "react-icons/pi";
import { FaRegEnvelope } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import authAPIs from "@/api/auth";
import { setUser } from "@/lib/features/userSlice";
import { GapLogo } from "@/components/logo/GapLogo";
import HeroBanner from "../../components/common/InfoBanner";
import { loginValidationSchema } from "@/utils/ValidationSchema";
import { setAccessToken, setIsUserVerified } from "@/utils/helperJWT";
import userAPIs from "@/api/user";
import { ROUTES } from "@/utils/routes";
import { USER_ROLE } from "@/utils/enums";

const LoginPage = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting, setTouched }) => {
      try {
        setLoading(true);
        const res = await authAPIs.login(values);

        if (res?.data?.access_token) {
          dispatch(setUser(res.data?.user));
          setAccessToken(res.data.access_token);
          setIsUserVerified(res.data.user?.isVerified);
          if (!res.data.user?.isVerified) {
            await userAPIs.sendVerificationEmail({
              email: res.data?.user.email,
            });
          }

          if (res.data.user?.role === USER_ROLE.SERVICE_PROVIDER) {
            router.push(ROUTES.SERVICE_PROVIDER.DASHBOARD);
          }
          if (res.data.user?.role === USER_ROLE.REAL_ESTATE_OWNER) {
            router.push(ROUTES.REAL_ESTATE.DASHBOARD);
          }
        }
      } catch (error: any) {
        setLoginError(
          error.response?.status === 401
            ? "E-Mail oder Passwort ist falsch"
            : "Ein Benutzer mit diesem Email konnte nicht gefunden werden"
        );
      } finally {
        setSubmitting(false);
        setLoading(false);
        setTouched({ email: true, password: true });
      }
    },
  });

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setLoginError(null);
      formik.setFieldValue(field, e.target.value);
    };

  return (
    <Grid container component="main" sx={styles.mainContainer}>
      <Grid item xs={false} md={6} lg={6} sx={styles.imageSide}>
        <HeroBanner
          title="Where skills are developed"
          subtitle="Gesetzliche Anlagenprüfung"
          copyright="©2024 GAP GmbH"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} component={Paper}>
        <Box sx={styles.formContainer}>
          <Box
            onClick={() => router.push(ROUTES.SERVICE_PROVIDER_HOME)}
            sx={{ cursor: "pointer" }}
          >
            <GapLogo color="#0D1F4E" size="sm" />
          </Box>
          <Box sx={styles.formBox}>
            <Grid container sx={{ mb: "2rem", color: "#1E3137" }}>
              <Grid item xs>
                <Link variant="h6" sx={styles.linkDesignBig}>
                  Anmelden
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" sx={styles.linkDesignSmall}>
                  Passwort vergessen
                </Link>
              </Grid>
            </Grid>
            <form
              onSubmit={formik.handleSubmit}
              style={styles.formContainerTwo}
            >
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={handleChange("email")}
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
                onChange={handleChange("password")}
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
              <Box
                sx={styles.errorBox}
                style={{ visibility: loginError ? "visible" : "hidden" }}
              >
                <Typography color="error">{loginError}</Typography>
              </Box>
              <Grid container sx={{ mt: 10 }} alignItems="center">
                <Grid item xs>
                  <Box>
                    <Typography
                      variant="body2"
                      style={styles.registerTypography}
                    >
                      Noch keinen account?
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      style={styles.registerLinkContainer}
                    >
                      <Link
                        href="/registration"
                        variant="body2"
                        style={styles.link}
                      >
                        Registrieren
                      </Link>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="gprimary"
                    size="large"
                    type="submit"
                    sx={{ borderRadius: "0.5rem" }}
                    disabled={formik.isSubmitting || loading}
                    endIcon={
                      loading && <CircularProgress color="gprimary" size={24} />
                    }
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
          <Typography sx={styles.supportLink}>
            Hilfe?{" "}
            <Link href="#" sx={styles.linkDesignSmall}>
              Support kontaktieren
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

//Styles

const styles = {
  mainContainer: { height: "100vh" },
  imageSide: {
    backgroundImage: `url(/images/login-bg.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: { xs: "none", md: "block" },
    height: "100%",
  },
  formContainer: {
    my: 8,
    mx: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  formBox: {
    padding: 5,
    borderRadius: "1rem",
    boxShadow: 3,
    mt: 2,
  },
  formContainerTwo: {
    marginTop: 1,
    display: "flex",
    flexDirection: "column" as "column",
    width: "33rem",
  },
  errorBox: {
    minHeight: "2rem", // adjust based on your needs
    marginTop: "1rem",
  },
  link: {
    color: "#22a7f1",
    fontSize: "1rem",
    textDecoration: "none",
    cursor: "pointer",
  },
  registerTypography: {
    color: "#475A60",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  registerLinkContainer: {
    display: "block",
    marginTop: "0.25rem",
  },
  supportLink: {
    color: "#475A60",
    fontSize: "1rem",
    marginTop: "3rem",
    marginRight: "auto",
    marginLeft: 18.5,
  },
  linkDesignBig: {
    fontSize: "1.5rem",
    color: "black",
    fontWeight: "bold",
    textDecoration: "none",
  },
  linkDesignSmall: { fontSize: "1rem", fontWeight: "bold", color: "black" },
};
