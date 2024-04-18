"use client";
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import GSelector from "@/components/input/GSelector";
import { germanStates } from "@/utils/Constants";

interface Item {
  label: string;
  value: string;
}

const CompanyAddress = ({formik}:any) => {
  const [selectedState, setSelectedState] = React.useState<Item | null>(null);
  const handleStateSelect = (selectedItem: Item):void => {
    const state = selectedItem || '';
    setSelectedState(selectedItem);
    formik.setFieldValue('state', state?.value );
  };
  
  useEffect(() => {
    setSelectedState({ label: formik.values?.state || '', value: formik.values?.state || '' });
  },[])

  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LabelWithAsterisk>Land</LabelWithAsterisk>
          <GTextInput value="Deutschland" />
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>BUNDESLAND</LabelWithAsterisk>
          <GSelector name="state" options={germanStates}  error={formik?.touched?.state && Boolean(formik?.errors?.state)}
            helperText={formik?.touched?.state && formik?.errors?.state} onSelect={handleStateSelect} selectedState={selectedState} />
        </Grid>
        <Grid item xs={12} sm={9}>
          <LabelWithAsterisk>STRAßE</LabelWithAsterisk>
          <GTextInput
            placeholder="Straße"
            id="street"
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.street && Boolean(formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LabelWithAsterisk>HAUSNR</LabelWithAsterisk>
          <GTextInput
            placeholder="Hausnr"
            id="hausnr"
            name="hausnr"
            value={formik.values.hausnr}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.hausnr && Boolean(formik.errors.hausnr)}
            helperText={formik.touched.hausnr && formik.errors.hausnr}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LabelWithAsterisk>PLZ</LabelWithAsterisk>
          <GTextInput
            placeholder="PLZ"
            id="plz"
            name="plz"
            value={formik.values.plz}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.plz && Boolean(formik.errors.plz)}
            helperText={formik.touched.plz && formik.errors.plz}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <LabelWithAsterisk>STADT</LabelWithAsterisk>
          <GTextInput
            placeholder="Stadt"
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyAddress;
