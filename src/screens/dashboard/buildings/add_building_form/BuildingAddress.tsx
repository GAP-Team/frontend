'use client';
import  { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import GSelector from "@/components/input/GSelector";
import { germanStates } from "@/utils/Constants";
import { useFormikContext } from 'formik';
import GoogleAutocomplete from "@/components/input/GoogleAutocomplete";
import { geocodeByAddress } from 'react-places-autocomplete';
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
        
        formik.setFieldValue('city', city);
        formik.setFieldValue('zip', postalCode);
        formik.setFieldValue('street', street || value);
        // Clear errors and touched status
        formik.setFieldError('city', '');
        formik.setFieldError('zip', '');
        formik.setFieldError('street', '');

        formik.setFieldTouched('city', false);
        formik.setFieldTouched('zip', false);
        formik.setFieldTouched('street', false);
  
      } catch (error) {
        console.error("Error geocoding address: ", error);
      }
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
        <Grid item xs={6}>
          <LabelWithAsterisk>STRAßE</LabelWithAsterisk>
          {/* <GTextInput
            placeholder="STRAßE"
            id="street"
            name="street"
            value={formik?.values?.street}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={formik?.touched?.street && Boolean(formik?.errors?.street)}
            helperText={formik?.touched?.street && formik?.errors?.street}
          /> */}
          <GoogleAutocomplete
            placeholder="Straße"
            id="street"
            name="street"
            value={formik?.values?.street}
            onSelect={handleAddressSelect}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={formik?.touched?.street && Boolean(formik?.errors?.street)}
            helperText={formik?.touched?.street && formik?.errors?.street}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelWithAsterisk>HAUSNUMMER</LabelWithAsterisk>
          <GTextInput
            placeholder="Hausnummer"
            id="houseNumber"
            name="houseNumber"
            value={formik?.values?.houseNumber}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={formik?.touched?.houseNumber && Boolean(formik?.errors?.houseNumber)}
            helperText={formik?.touched?.houseNumber && formik?.errors?.houseNumber}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LabelWithAsterisk>POSTLEITZAHL</LabelWithAsterisk>
          <GTextInput
            placeholder="Plz"
            id="zip"
            name="zip"
            value={formik?.values.zip}
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            error={formik?.touched?.zip && Boolean(formik?.errors?.zip)}
            helperText={formik?.touched?.zip && formik?.errors?.zip}
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