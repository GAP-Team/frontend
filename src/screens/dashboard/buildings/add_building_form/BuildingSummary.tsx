'use client';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { buildingInformation, buildingContactPersonList,buildingAddress,buildingDocs } from "@/utils/Constants";
import SummarySection from "@/components/summary/SummarySection";
import { Detail } from "@/components/summary/SummarySection";
import { useFormikContext } from 'formik';

const BuildingSummary = () => {
  const formik = useFormikContext();
  const formikValuesArray: string[] = Object.values(formik?.values || {});
  const updatedBuildingInformation: Detail[] = buildingInformation.map((info,index) => ({
    ...info,
    value: formikValuesArray[index] || info.value, // Update or keep original if no value is provided
  }));
  const updatedAdresse: Detail[] = buildingAddress.map((info,index) => ({
    ...info,
    value: formikValuesArray[index+updatedBuildingInformation.length+1] || info.value, // Update or keep original if no value is provided
  }));
  const updatedContactPersonList: Detail[] = buildingContactPersonList.map((info,index) => ({
    ...info,
    value: formikValuesArray[index+updatedAdresse.length+updatedBuildingInformation.length+1] || info.value, // Update or keep original if no value is provided
  }));

  const updatedDocList: Detail[] = buildingDocs.map((info,index) => ({
    ...info,
    value: formikValuesArray[index+updatedContactPersonList.length+updatedAdresse.length+updatedBuildingInformation.length+1] || info.value, // Update or keep original if no value is provided
  }));

  return (
    <Box
    component="form"
    noValidate
    sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
  >
    <Grid container spacing={2}>
      <Grid item xs={12}>
          <SummarySection title="Objektinformationen" details={updatedBuildingInformation} />
        </Grid>
        <Grid item xs={12}>
          <SummarySection title="Objektanschrift" details={updatedAdresse} />
        </Grid>
        <Grid item xs={6}>
          <SummarySection title="Ansprechpartner" details={updatedContactPersonList} />
        </Grid>
        <Grid item xs={6}>
          <SummarySection title="Bauunterlagen" details={updatedDocList} />
        </Grid>
    </Grid>
  </Box>
  )
}

export default BuildingSummary;