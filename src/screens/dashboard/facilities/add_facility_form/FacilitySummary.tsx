"use client";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
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
      (building: any) => building._id === values.selectedBuilding
    );
    setSelectedBuildingDetails(building[0]);
  }, []);

  const facilityInformation: Detail[] = [
    values.name && {
      label: "Name der Anlage/Bezeichnung",
      value: values.name,
    },
    values.genericTerm && {
      label: "Anlagenart",
      value: values.genericTerm,
    },
    values.subcategory && { label: "Anlagentyp", value: values.subcategory },
    values.selectedBuilding && {
      label: "Objekt Zuordnen",
      value: selectedBuildingDetails?.buildingName,
    },
  ].filter(Boolean);

  const facilityCheckInformation: Detail[] = [
    values.lastCheckDate && {
      label: "Letzte Prüfung",
      value: dayjs(values.lastCheckDate).format("DD.MM.YYYY"),
    },
    values.nextCheckInYearNumber && {
      label: "Nächste Prüfung in",
      value: `${values.nextCheckInYearNumber} Jahr(e)`,
    },
    values.isPublishAutomatically && {
      label: "Automatisch Veröffentlichen",
      value: values.isPublishAutomatically ? "Ja" : "Nein",
    },
    values.publishAutomaticallyInMonths && {
      label: "Automatisch veröffentlichen in",
      value: `${values.publishAutomaticallyInMonths} Monat(e)`,
    },
    values.reminderInMonth && {
      label: "Reminder Einstellen in",
      value: `${values.reminderInMonth} Monat(e)`,
    },
    values.isEmailNotificationEnable && {
      label: "Automatische E-Mail Erhalten",
      value: values.isEmailNotificationEnable ? "Ja" : "Nein",
    },
    values.emailNotificationList?.length > 0 && {
      label: "Automatische Erinnerungs-E-Mails",
      value: values.emailNotificationList.map((email: any) => `${email}, `),
    },
  ].filter(Boolean);

  const facilityMaintenanceInformation: Detail[] = [
    values.lastMaintenanceDate && {
      label: "Letzte Prüfung",
      value: dayjs(values.lastMaintenanceDate).format("DD.MM.YYYY"),
    },
    values.nextMaintenanceInMonth && {
      label: "Nächste Wartung in",
      value: `${values.nextMaintenanceInMonth} Monat(e)`,
    },
    values.isPublishMaintenanceAutomatically && {
      label: "Automatisch Veröffentlichen",
      value: values.isPublishMaintenanceAutomatically ? "Ja" : "Nein",
    },
    values.publishMaintenanceAutomaticallyInMonth && {
      label: "Automatisch veröffentlichen in",
      value: `${values.publishMaintenanceAutomaticallyInMonth} Monat(e)`,
    },
    values.maintenanceReminderInMonth && {
      label: "Reminder Einstellen in",
      value: `${values.maintenanceReminderInMonth} Monat(e)`,
    },
    values.isMaintenanceEmailNotificationEnable && {
      label: "Automatische E-Mail Erhalten",
      value: values.isMaintenanceEmailNotificationEnable ? "Ja" : "Nein",
    },
    ...(values.maintenanceEmailNotificationList?.length
      ? values.maintenanceEmailNotificationList.map(
          (email: any, index: number) => ({
            label: `Automatische Erinnerungs-E-Mails ${index + 1}`,
            value: email,
          })
        )
      : []),
  ].filter(Boolean);

  const updatedDocList: Detail[] = [
    ...(values.constructionDocs?.length
      ? values.constructionDocs.map((doc: any) => ({
          label: "Berichte (Prüf- und Wartungsberichte)",
          value: doc.name,
        }))
      : []),
    ...(values.floorplanDocs?.length
      ? values.floorplanDocs.map((doc: any) => ({
          label: "Grundrisse & Schema",
          value: doc.name,
        }))
      : []),
    ...(values.otherDocs?.length
      ? values.otherDocs.map((doc: any) => ({
          label: "Sonstige Dokumente",
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
            title="Anlageninformationen"
            details={facilityInformation}
            setActiveStep={() => setActiveStep(steps[0])}
          />
        </Grid>
        <Grid item xs={6}>
          <SummarySection
            title="Prüfungsinformationen"
            details={facilityCheckInformation}
            setActiveStep={() => setActiveStep(steps[1])}
          />
        </Grid>
        <Grid item xs={6}>
          <SummarySection
            title="Wartungsinformationen"
            details={facilityMaintenanceInformation}
            setActiveStep={() => setActiveStep(steps[2])}
          />
        </Grid>
        {updatedDocList.length > 0 && (
          <Grid item xs={12}>
            <SummarySection
              title="Bauunterlagen"
              details={updatedDocList}
              setActiveStep={() => setActiveStep(steps[3])}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default FacilitySummary;
