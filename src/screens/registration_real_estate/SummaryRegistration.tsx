import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SummarySection from "@/components/summary/SummarySection";
import {grundinformation, adresse, gewerbeanmeldung} from '../../utils/Constants';
import { useFormikContext } from 'formik';
import { Detail } from "@/components/summary/SummarySection";

const SummaryRegistration = () => {
  const formik : any = useFormikContext();
  const formikValuesArray: string[] = Object.values(formik?.values || {});
  const updatedGrundinformation: Detail[] = grundinformation.map((info,index) => ({
    ...info,
    value: formikValuesArray[index] || info.value, // Update or keep original if no value is provided
  }));
  const updatedAdresse: Detail[] = adresse.map((info,index) => ({
    ...info,
    value: formikValuesArray[index+updatedGrundinformation.length+1] || info.value, // Update or keep original if no value is provided
  }));
  const updatedGewerk: Detail[] = gewerbeanmeldung.map((info,index) => ({
    ...info,
    value: formik?.values?.registrationnum || info.value, // Update or keep original if no value is provided
  }));

  return (
    <Box
      sx={{ flexGrow: 1, width: "auto", marginLeft: "1.5rem", mt: "0.5rem" }}
    >
      <Grid container spacing={2}>
      <Grid item xs={6}>
          <SummarySection title="GRUNDINFORMATION" details={updatedGrundinformation} />
        </Grid>
        <Grid item xs={12}>
          <SummarySection title="ADRESSE DER FIRMA" details={updatedAdresse} />
        </Grid>
        <Grid item xs={12}>
          <SummarySection title="GEWERBEANMELDUNG" details={updatedGewerk} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummaryRegistration;
