'use client';
import  { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import GSelector from "@/components/input/GSelector";
import { germanStates } from "@/utils/Constants";
import { useFormikContext } from 'formik';

interface Item {
  label: string;
  value: string;
}

const BuildingAddress = ({formik}:{formik?:any}) => {

    const [selectedState, setSelectedState] = useState<Item | null>(null);
    const handleStateSelect = (selectedItem: Item | null): void => {
      setSelectedState(selectedItem);
      formik?.setFieldValue('state', selectedItem ? selectedItem.value : '' );
    };
    

    useEffect(() => {
      setSelectedState({ label: formik?.values?.state || '', value: formik?.values?.state || '' });
    }, [])
    
  return (
    <Box
    component="form"
    noValidate
    sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
  >
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <LabelWithAsterisk>ANSCHRIFT</LabelWithAsterisk>
        <GTextInput
          placeholder="Anschrift"
          id="address"
          name="address"
          value={formik?.values?.address}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={formik?.touched?.address && Boolean(formik?.errors?.address)}
          helperText={formik?.touched?.address && formik?.errors?.address}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <LabelWithAsterisk>POSTLEITZAHL</LabelWithAsterisk>
        <GTextInput
          placeholder="PLZ"
          id="pin"
          name="pin"
          value={formik?.values.pin}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={formik?.touched?.pin && Boolean(formik?.errors?.pin)}
          helperText={formik?.touched?.pin && formik?.errors?.pin}
        />
      </Grid>
      <Grid item xs={12} sm={9}>
        <LabelWithAsterisk>STADT</LabelWithAsterisk>
        <GTextInput
          placeholder="Stadt"
          id="city"
          name="city"
          value={formik?.values.city}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={formik?.touched?.city && Boolean(formik?.errors?.city)}
          helperText={formik?.touched?.city && formik?.errors?.city}
        />
      </Grid>
      <Grid item xs={12}>
        <LabelWithAsterisk>BUNDESLAND</LabelWithAsterisk>
        <GSelector name="state" options={germanStates}  error={formik?.touched?.state && Boolean(formik?.errors?.state)}
          helperText={formik?.touched?.state && formik?.errors?.state} onSelect={handleStateSelect} selectedState={selectedState} />
      </Grid>
    </Grid>
  </Box>
  )
}

export default BuildingAddress

//Styles
const formStyles = {
  marginLeft: "3.75rem",
  marginRight: "3.5rem",
  display: "flex",
  flexDirection: "row",
  backgroundColor: "white",
  height: "41.75rem",
  padding: "1.5rem",
  borderRadius: "0.5rem",
  boxShadow: "0px 8px 24px 0px rgba(30, 49, 55, 0.08)",
};