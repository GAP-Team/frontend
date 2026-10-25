"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormikContext } from "formik";
import React from "react";
import { ActiveStepItem, StepComponentProps } from "./types";
import SummarySection, {
  Detail,
} from "@/components/common/summary/SummarySection";
import { ObjectFacilityMode, TENDER_FORM } from "@/utils/enums";
import TenderInformation from "./TenderInformation";
import TenderBuilding from "./TenderBuilding";
import TenderDescription from "./TenderDescription";
import TenderClassification from "./TenderClassification";

const TenderSummary = ({
  setActiveStep,
  steps,
}: StepComponentProps): JSX.Element => {
  const { values } = useFormikContext<any>();
  // The object / facility step is left out when the form was opened for a
  // facility, so steps are looked up by their component, not by position.
  const stepOf = (component: React.ComponentType<any>): ActiveStepItem =>
    steps.find((step) => step.component === component) as ActiveStepItem;
  const hasObjectStep = steps.some((step) => step.component === TenderBuilding);

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

  const isNewObject = values.objectFacilityMode === ObjectFacilityMode.NEW;
  const isNewFacility =
    isNewObject ||
    values.objectFacilityMode === ObjectFacilityMode.NEW_FACILITY;

  const objektInformation: Detail[] = [
    isNewObject
      ? values.newBuilding?.name && {
          label: "Objekt (neu anzulegen)",
          value: values.newBuilding.name,
        }
      : values.buildingName && { label: "Objekt", value: values.buildingName },
    isNewFacility
      ? values.newFacility?.name && {
          label: "Anlage (neu anzulegen)",
          value: values.newFacility.name,
        }
      : values.facilityName && { label: "Anlage", value: values.facilityName },
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
            setActiveStep={() => setActiveStep(stepOf(TenderInformation))}
          />
        </Grid>
        <Grid item xs={12}>
          <SummarySection
            title="Objekt / Anlage"
            details={objektInformation}
            disableEdit={!hasObjectStep}
            setActiveStep={() => setActiveStep(stepOf(TenderBuilding))}
          />
        </Grid>
        {updatedDetails.length > 0 && (
          <Grid item xs={6}>
            <SummarySection
              title="Beschreibung"
              details={updatedDetails}
              setActiveStep={() => setActiveStep(stepOf(TenderDescription))}
            />
          </Grid>
        )}
        {updatedClassification.length > 0 && (
          <Grid item xs={6}>
            <SummarySection
              title="Einstufung"
              details={updatedClassification}
              setActiveStep={() => setActiveStep(stepOf(TenderClassification))}
            />
          </Grid>
        )}
        {/* FIX ME: Why we have a doc list in tender summary? Tender have no documents to show */}
        {updatedDocList.length > 0 && (
          <Grid item xs={12}>
            <SummarySection
              title="Dokumente"
              details={updatedDocList}
              setActiveStep={() => setActiveStep(steps[steps.length - 1])}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TenderSummary;
