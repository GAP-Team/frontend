"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormikContext } from "formik";
import { StepComponentProps } from "./types";
import SummarySection, { Detail } from "@/components/summary/SummarySection";
import { TENDER_FORM } from "@/utils/enums";

const TenderSummary = ({
  setActiveStep,
  steps,
}: StepComponentProps): JSX.Element => {
  const { values } = useFormikContext<any>();

  const updatedTenderInformation: Detail[] = [
    values.clientName && {
      label: "Name des Auftraggebers",
      value: values.clientName,
    },
    values.tenderName && {
      label: "Name der Ausschreibung",
      value: values.tenderName,
    },
    values.tenderForm && {
      label: "Ausschreibungsart",
      value:
        values.tenderForm === TENDER_FORM.CRAFTSMAN
          ? "Handwerker"
          : "Sachverständigen",
    },
    values.tenderType && {
      label: "Ausschreibungstyp",
      value: values.tenderType,
    },
  ].filter(Boolean); // Filter out undefined values

  const objektInformation: Detail[] = [
    values.buildingName && { label: "Objekt", value: values.buildingName },
    values.facilityId && { label: "Anlage", value: values.facilityName },
  ].filter(Boolean); // Filter out undefined values

  const updatedDetails: Detail[] = [
    values.detailDescription && {
      label: "Detailbeschreibung",
      value: values.detailDescription,
    },
    values.safetyWorkRequired && { label: "Sicherheit arbeit", value: "Ja" },
    values.freeParkingAvailable && {
      label: "Kostenlose Parlplätze verfügbar",
      value: "Ja",
    },
  ].filter(Boolean); // Filter out undefined values

  const updatedClassification: Detail[] = [
    values.urgency && { label: "Dringlichkeit", value: values.urgency },
    values.fromDate &&
      values.toDate && {
        label: "Zeifenster available",
        value: `${new Date(values.fromDate).toLocaleDateString()} - ${new Date(values.toDate).toLocaleDateString()}`,
      },
  ].filter(Boolean); // Filter out undefined values

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
    ...(values.equipmentDocs?.length
      ? values.equipmentDocs.map((doc: any) => ({
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
            title="Ausschreibungstyp"
            details={updatedTenderInformation}
            setActiveStep={() => setActiveStep(steps[0])}
          />
        </Grid>
        <Grid item xs={12}>
          <SummarySection
            title="Objekt / Anlage"
            details={objektInformation}
            setActiveStep={() => setActiveStep(steps[1])}
          />
        </Grid>
        {updatedDetails.length > 0 && (
          <Grid item xs={6}>
            <SummarySection
              title="Beschreibung"
              details={updatedDetails}
              setActiveStep={() => setActiveStep(steps[2])}
            />
          </Grid>
        )}
        {updatedClassification.length > 0 && (
          <Grid item xs={6}>
            <SummarySection
              title="Einstufung"
              details={updatedClassification}
              setActiveStep={() => setActiveStep(steps[3])}
            />
          </Grid>
        )}
        {updatedDocList.length > 0 && (
          <Grid item xs={12}>
            <SummarySection
              title="Dokumente"
              details={updatedDocList}
              setActiveStep={() => setActiveStep(steps[4])}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TenderSummary;
