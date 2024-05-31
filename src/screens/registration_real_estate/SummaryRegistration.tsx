import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SummarySection from "@/components/summary/SummarySection";
import {grundinformation, adresse} from '../../utils/Constants';
import { useFormikContext } from 'formik';
import { Detail } from "@/components/summary/SummarySection";


interface SummaryRegistrationProps{
  setActiveStep: (num: number) => void;
}

const SummaryRegistration = ({setActiveStep}:SummaryRegistrationProps) => {

  const getBusinessRegistrationData = (formik: any) => {
    const businessInfo = [];
    const documents = [
      { label: "Gewerbeanmeldung", value: formik?.values?.bsndoc },
      { label: "Grundbucheintrag", value: formik?.values?.landdoc },
      { label: "Genehmigungsunterlagen", value: formik?.values?.approvdoc },
    ];
  
    documents.forEach(doc => {
      if (doc.value) {
        businessInfo.push(doc);
      }
    });
  
    if (formik?.values?.registrationnum) {
      businessInfo.unshift({
        label: "Handerlregister Nummer",
        value: formik.values.registrationnum,
      });
    }
    return businessInfo;
  };


  const formik : any = useFormikContext();
  const formikValuesArray: string[] = Object.values(formik?.values || {});
  const updatedBasicInformation: Detail[] = grundinformation.map((info,index) => ({
    ...info,
    value: formikValuesArray[index] || info.value, // Update or keep original if no value is provided
  }));
  const updatedAdresse: Detail[] = adresse.map((info,index) => ({
    ...info,
    value: formikValuesArray[index+updatedBasicInformation.length+1] || info.value, // Update or keep original if no value is provided
  }));

  const updatedBusinessRegistration: Detail[] = getBusinessRegistrationData(formik);

  return (
    <Box
      sx={{ flexGrow: 1, width: "auto", marginLeft: "1.5rem", mt: "0.5rem" }}
    >
      <Grid container spacing={2}>
      <Grid item xs={6}>
          <SummarySection title="GRUNDINFORMATION" details={updatedBasicInformation} setActiveStep={()=>setActiveStep(0)} />
        </Grid>
        <Grid item xs={12}>
          <SummarySection title="ADRESSE DER FIRMA" details={updatedAdresse} setActiveStep={()=>setActiveStep(1)}/>
        </Grid>
        <Grid item xs={12}>
          <SummarySection title="GEWERBEANMELDUNG" details={updatedBusinessRegistration} setActiveStep={()=>setActiveStep(2)} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummaryRegistration;
