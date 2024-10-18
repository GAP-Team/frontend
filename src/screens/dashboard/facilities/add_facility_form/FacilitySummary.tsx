"use client";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useFormikContext } from "formik";
import { ActiveStepItem } from "../../types";
import SummarySection, { Detail } from "@/components/summary/SummarySection";

interface FacilitySummaryProps {
  setActiveStep: React.Dispatch<React.SetStateAction<ActiveStepItem>>;
  steps: ActiveStepItem[];
}
const FacilitySummary = ({
  setActiveStep,
  steps,
}: FacilitySummaryProps): JSX.Element => {
  const { values } = useFormikContext<any>();
  console.log("Facility Data: ===---> ", values);
  
  const updatedFacilityInformation: Detail[] = [
    values.name != "" && { label: "Name des Gebäudes", value: values.buildingName },
    values.totalArea && {
      label: "Gesamtfläche (in qm) ",
      value: values.totalArea,
    },
    values.buildingType && { label: "Gebäudetyp", value: values.buildingType },
    values.buildingAbbreviation && {
      label: "Objektkürzel",
      value: values.buildingAbbreviation,
    },
  ].filter(Boolean); // Filter out undefined values

  const updatedAddress: Detail[] = [
    values.street && { label: "Straße", value: values.street },
    values.houseNumber && { label: "Hausnummer", value: values.houseNumber },
    values.zip && { label: "Postleitzahl", value: values.zip },
    values.city && { label: "Stadt", value: values.city },
    values.state && { label: "Bundesland", value: values.state },
  ].filter(Boolean); // Filter out undefined values

  const updatedContactPersonList: Detail[] = values?.contactPerson?.length
    ? values.contactPerson.map((person: any) => ({
        label: "Name",
        value: `${person.firstName} ${person.lastName}`,
      }))
    : [];

  const updatedDocList: Detail[] = [
    ...(values.constructionDocs?.length
      ? values.constructionDocs.map((doc: any) => ({
          label: "Baudokument",
          value: doc.name,
        }))
      : []),
    ...(values.floorplanDocs?.length
      ? values.floorplanDocs.map((doc: any) => ({
          label: "Grundrissdokument",
          value: doc.name,
        }))
      : []),
    ...(values.otherDocs?.length
      ? values.otherDocs.map((doc: any) => ({
          label: "Weiteres Dokument",
          value: doc.name,
        }))
      : []),
    ...(values.serverLink?.length
      ? [{ label: "Server Link", value: values.serverLink }]
      : []),
  ];

  return (
    <Box sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SummarySection
            title="Objektinformationen"
            details={updatedFacilityInformation}
            setActiveStep={() => setActiveStep(steps[0])}
          />
        </Grid>
        <Grid item xs={12}>
          <SummarySection
            title="Objektanschrift"
            details={updatedAddress}
            setActiveStep={() => setActiveStep(steps[1])}
          />
        </Grid>
        {updatedContactPersonList.length > 0 && (
          <Grid item xs={6}>
            <SummarySection
              title="Ansprechpartner"
              details={updatedContactPersonList}
              setActiveStep={() => setActiveStep(steps[0])}
            />
          </Grid>
        )}
        {updatedDocList.length > 0 && (
          <Grid item xs={6}>
            <SummarySection
              title="Bauunterlagen"
              details={updatedDocList}
              setActiveStep={() => setActiveStep(steps[2])}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default FacilitySummary;