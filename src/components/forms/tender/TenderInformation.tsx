"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import { useFormikContext } from "formik";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import { TENDER_FORM } from "@/utils/enums";
import { AddTenderFormValues } from "./types";
import GTextInput from "@/components/ui/input/GTextInput";
import CustomSelect from "@/components/ui/drop_down/CustomSelect";
import LabelWithAsterisk from "@/components/ui/label/LabelWithAsterisk";
import { tenderTypesListHW, tenderTypesListSV } from "@/utils/Constants";

const TenderInformation = (): JSX.Element => {
  const formik = useFormikContext<AddTenderFormValues>();

  const handleTenderFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selectedForm = event.target.value;
    formik.setFieldValue("tenderForm", selectedForm);
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LabelWithAsterisk>NAME DES AUFTRAGGEBERS</LabelWithAsterisk>
          <GTextInput
            id="clientName"
            name="clientName"
            value={formik?.values?.clientName}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.clientName && Boolean(formik?.errors?.clientName)
            }
            helperText={
              formik?.touched?.clientName && formik?.errors?.clientName
            }
          />
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>AUSSCHREIBUNGSART</LabelWithAsterisk>
          <FormControl sx={{ display: "block", mt: 1 }}>
            <RadioGroup
              row
              id="tenderForm"
              name="tenderForm"
              value={formik?.values?.tenderForm}
              onChange={handleTenderFormChange}
              onBlur={formik?.handleBlur}
            >
              <FormControlLabel
                value={TENDER_FORM.CRAFTSMAN}
                control={<Radio />}
                label="Handwerker"
                sx={{ marginBottom: 0 }}
              />
              <FormControlLabel
                value={TENDER_FORM.EXPERT}
                control={<Radio />}
                label="Sachverständigen"
                sx={{ marginBottom: 0 }}
              />
            </RadioGroup>
            {formik?.touched?.tenderForm && formik?.errors?.tenderForm && (
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "0.75rem",
                  position: "absolute",
                }}
              >
                {formik.errors.tenderForm}
              </Box>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>AUSSCHREIBUNGSTYP</LabelWithAsterisk>
          <FormControl fullWidth>
            <CustomSelect
              name="tenderType"
              options={
                formik?.values?.tenderForm === TENDER_FORM.CRAFTSMAN
                  ? tenderTypesListHW
                  : tenderTypesListSV
              }
              onChange={formik?.handleChange}
              value={formik?.values?.tenderType}
            />
            {formik?.touched?.tenderType && (
              <p style={styles.errorTexts}>{formik?.errors?.tenderType}</p>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenderInformation;

const styles = {
  errorTexts: {
    color: "#d32f2f",
    fontWeight: 400,
    fontSize: "0.75rem",
  },
};
