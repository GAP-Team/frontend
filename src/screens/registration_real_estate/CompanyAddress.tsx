"use client";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import GSelector from "@/components/input/GSelector";
import { germanStates } from "@/utils/Constants";
import GoogleAutocomplete from "@/components/input/GoogleAutocomplete";
import { geocodeByAddress } from 'react-places-autocomplete';

interface Item {
  label: string;
  value: string;
}

const CompanyAddress = ({formik}:any) => {
  const [selectedState, setSelectedState] = useState<Item | null>(null);
  
  const handleStateSelect = (selectedItem: Item): void => {
    setSelectedState(selectedItem);
    formik.setFieldValue('state', selectedItem?.value);
  };
  
  const handleAddressSelect = async (value: string) => {
    try {
      const results = await geocodeByAddress(value);
      const addressComponents = results[0].address_components;
      
      let street = "";
      let city = "";
      let postalCode = "";
      
      addressComponents.forEach(component => {
        if (component.types.includes("route")) {
          street = component.long_name;
        }
        if (component.types.includes("locality") || component.types.includes("sublocality")) {
          city = component.long_name;
        }
        if (component.types.includes("postal_code")) {
          postalCode = component.long_name;
        }
      });
      
      formik.setFieldValue('street', street || value);
      formik.setFieldValue('city', city);
      formik.setFieldValue('plz', postalCode);
    } catch (error) {
      console.error("Error geocoding address: ", error);
    }
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
          <GoogleAutocomplete
            placeholder="Straße"
            name="street"
            id="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onSelect={handleAddressSelect}
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
