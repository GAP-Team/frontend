"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import GTextInput from "@/components/input/GTextInput";
import GTextSelector from "@/components/input/GTextSelector";
import Divider from "@mui/material/Divider";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { germanStates } from "@/utils/Constants";
import { CompanyProfileSchema } from "@/utils/ValidationSchema";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { showSnackbar } from "@/components/root-snackbar";
import { updateUserProfile } from "@/lib/features/userSlice";
import { useRouter } from "next/navigation";

const CompanyProfile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      companyName: user?.company?.name,
      logo: null,
      country: user?.company?.address?.country,
      state: user?.company?.address?.state,
      street: user?.company?.address?.street,
      houseNumber: user?.company?.address?.houseNo,
      zip: user?.company?.address?.zip,
      city: user?.company?.address?.city,
      phonenumber: user?.company?.phonenumber,
      registrationNumber: user?.company?.business?.registrationNumber,
      // legalForm: "GmbH",
    },
    validationSchema: CompanyProfileSchema,
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
      const requestData = {
        company: {
          name: values.companyName,
          phonenumber: values.phonenumber,
          address: {
            zip: values.zip,
            city: values.city,
            state: values.state,
            street: values.street,
            country: values.country,
            houseNo: values.houseNumber,
          },
          business: {
            businessType: user?.company?.business?.businessType,
            registrationNumber: values.registrationNumber,
          },
        },
      };

      try {
        await dispatch(
          updateUserProfile({
            id: user.id,
            data: requestData,
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
      <Grid container spacing={2.5}>
        {/* Firmenname */}
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Firmenname
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
            Dies wird in Ihrem Profil angezeigt.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <GTextInput
            id="companyName"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.companyName && Boolean(formik.errors.companyName)
            }
            helperText={
              formik.touched.companyName &&
              formik.errors.companyName?.toString()
            }
          />
        </Grid>
        {/* Unternehmenslogo */}
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Unternehmenslogo
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
            Wählen Sie Ihr Firmenlogo und laden Sie es hoch.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} justifyItems={"right"}>
          <Button variant="text" component="label" style={styles.logoContainer}>
            {formik.values.logo ? (
              <img
                src={formik.values.logo}
                alt="Logo"
                style={styles.logoImage}
              />
            ) : (
              <Typography variant="caption" color="textSecondary">
                Logo
              </Typography>
            )}
            <input
              type="file"
              hidden
              onChange={(e) =>
                formik.setFieldValue(
                  "logo",
                  e.target.files?.[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : null
                )
              }
            />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Adresse */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Adresse
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
            Dies ist die Adresse Ihres Unternehmens.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <GTextSelector
                name="country"
                label="Land"
                value={formik.values.country}
                onChange={formik.handleChange}
                options={[{ label: "Deutschland", value: "Deutschland" }]}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={formik.touched.state && Boolean(formik.errors.state)}
              >
                <InputLabel id="state-label">Bundesland</InputLabel>
                <Select
                  id="state"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                >
                  {germanStates.map((state) => (
                    <MenuItem key={state.value} value={state.value}>
                      {state.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.state && formik.errors.state && (
                  <FormHelperText>
                    {formik.errors.state.toString()}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <GTextInput
                id="street"
                name="street"
                label="Straße"
                value={formik.values.street}
                onChange={formik.handleChange}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={
                  formik.touched.street && formik.errors.street?.toString()
                }
              />
            </Grid>
            <Grid item xs={6}>
              <GTextInput
                id="houseNumber"
                name="houseNumber"
                label="Hausnr"
                value={formik.values.houseNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.houseNumber &&
                  Boolean(formik.errors.houseNumber)
                }
                helperText={
                  formik.touched.houseNumber &&
                  formik.errors.houseNumber?.toString()
                }
              />
            </Grid>
            <Grid item xs={6}>
              <GTextInput
                id="zip"
                name="zip"
                label="PLZ"
                value={formik.values.zip}
                onChange={formik.handleChange}
                error={formik.touched.zip && Boolean(formik.errors.zip)}
                helperText={formik.touched.zip && formik.errors.zip?.toString()}
              />
            </Grid>
            <Grid item xs={12}>
              <GTextInput
                id="city"
                name="city"
                label="Stadt/Ort"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={
                  formik.touched.city && formik.errors.city?.toString()
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Gewerbeanmeldung */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Gewerbeanmeldung
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
            Fotoscan Ihrer Gewerbeanmeldung.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" component="label">
            Hochladen
            <input type="file" hidden />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Telefonnummer */}
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Telefonnummer
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
            Dies wird Ihre Telefonnummer sein.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <GTextInput
            id="phonenumber"
            name="phonenumber"
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phonenumber && Boolean(formik.errors.phonenumber)
            }
            helperText={
              formik.touched.phonenumber &&
              formik.errors.phonenumber?.toString()
            }
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Handelsregisternummer
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
            Dies wird Ihre Handelsregisternummer sein.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <GTextInput
            id="registrationNumber"
            name="registrationNumber"
            value={formik.values.registrationNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.registrationNumber &&
              Boolean(formik.errors.registrationNumber)
            }
            helperText={
              formik.touched.registrationNumber &&
              formik.errors.registrationNumber?.toString()
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Uncomment in V2 */}
        {/* Rechtliche Unternehmensform */}
        {/* <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Rechtliche Unternehmensform
          </Typography>
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <RadioGroup
            row
            id="legalForm"
            name="legalForm"
            value={formik.values.legalForm}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="Einzelunternehmen"
              control={<Radio />}
              label="Einzelunternehmen"
            />
            <FormControlLabel value="GmbH" control={<Radio />} label="GmbH" />
            <FormControlLabel value="UG" control={<Radio />} label="UG" />
            <FormControlLabel value="oHG" control={<Radio />} label="oHG" />
            <FormControlLabel value="AG" control={<Radio />} label="AG" />
            <FormControlLabel value="KG" control={<Radio />} label="KG" />
          </RadioGroup>
        </Grid> */}

        {/* Buttons */}
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button variant="outlined" onClick={() =>  router.push("/real_estate/dashboard") }>
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

export default CompanyProfile;

// Styles
const styles = {
  sectionTitle: {
    fontWeight: 600,
  },
  sectionDescription: {
    mb: 1,
  },
  logoContainer: {
    width: "80px",
    height: "80px",
    border: "1px dashed gray",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
  },
};
