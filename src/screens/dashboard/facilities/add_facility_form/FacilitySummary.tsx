"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ActiveStepItem } from "../../types";
import { allBuildingDetails } from "@/lib/features/userSlice";
import SummarySection, { Detail } from "@/components/summary/SummarySection";
import { SelectedBuildingData } from "../../buildings/add_building_form/types";

interface FacilitySummaryProps {
  setActiveStep: React.Dispatch<React.SetStateAction<ActiveStepItem>>;
  steps: ActiveStepItem[];
}
const FacilitySummary = ({
  setActiveStep,
  steps,
}: FacilitySummaryProps): JSX.Element => {
  const { values } = useFormikContext<any>();
  const allBuildings = useSelector(allBuildingDetails);

  const [selectedBuildingDetails, setSelectedBuildingDetails] =
    useState<SelectedBuildingData>();

  useEffect(() => {
    const building = allBuildings.filter(
      (building: any) => building._id === values.buildingName
    );
    setSelectedBuildingDetails(building[0]);
  }, []);

  const updatedFacilityInformation: Detail[] = [
    values.buildingName !== "" && {
      label: "Name des Gebäudes",
      value: selectedBuildingDetails?.buildingName,
    },
    selectedBuildingDetails?.buildingAbbreviation && {
      label: "Gesamtfläche (in qm) ",
      value: selectedBuildingDetails?.buildingAbbreviation
        ? selectedBuildingDetails?.buildingAbbreviation
        : 1000, //1000 is dummy data, afetr get real data will updated it
    },
    values.genericTerm && { label: "Gebäudetyp", value: values.genericTerm },
    values.subcategory && {
      label: "Objektkürzel",
      value: values.subcategory,
    },
  ].filter(Boolean); // Filter out undefined values

  const updatedAddress: any[] = [
    selectedBuildingDetails?.address?.street && {
      label: "Straße",
      value: selectedBuildingDetails?.address?.street,
    },
    selectedBuildingDetails?.address?.houseNumber && {
      label: "Hausnummer",
      value: selectedBuildingDetails?.address?.houseNumber,
    },
    selectedBuildingDetails?.address?.zip && {
      label: "Postleitzahl",
      value: selectedBuildingDetails?.address?.zip,
    },
    selectedBuildingDetails?.address?.city && {
      label: "Stadt",
      value: selectedBuildingDetails?.address?.city,
    },
    selectedBuildingDetails?.address?.state && {
      label: "Bundesland",
      value: selectedBuildingDetails?.address?.state,
    },
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
