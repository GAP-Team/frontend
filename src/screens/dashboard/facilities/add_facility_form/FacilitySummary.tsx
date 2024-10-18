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
      (building: any) => building._id === values.buildingName
    );
    setSelectedBuildingDetails(building[0]);
  }, []);

  const facilityInformation: Detail[] = [
    values.name && {
      label: "Name des Anlagenname-/Bezeichnung",
      value: values.name,
    },
    values.genericTerm && {
      label: "Anlagenart",
      value: values.genericTerm,
    },
    values.subcategory && { label: "Anlagentyp", value: values.subcategory },
    values.buildingName && {
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
      label: "Nächste Prüfung",
      value: values.nextCheckInYearNumber,
    },
    values.isPublishAutomatically && {
      label: "Automatisch Veröffentlichen",
      value: values.isPublishAutomatically,
    },
    values.publishAutomaticallyInMonths && {
      label: "Automatisch in monaten veröffentlichen",
      value: values.publishAutomaticallyInMonths,
    },
    values.reminderInMonth && {
      label: "Reminder Einstellen",
      value: values.reminderInMonth,
    },
    values.isEmailNotificationEnable && {
      label: "Automatische E-Mail Erhalten",
      value: values.isEmailNotificationEnable ? "true" : "false",
    },
    ...(values.emailNotificationList?.length
      ? values.emailNotificationList.map((email: any) => ({
          label: "Automatische Erinnerungs-E-Mails",
          value: email,
        }))
      : []),
  ].filter(Boolean);

  const facilityMaintenanceInformation: Detail[] = [
    values.lastMaintenanceDate && {
      label: "Letzte Prüfung",
      value: dayjs(values.lastMaintenanceDate).format("DD.MM.YYYY"),
    },
    values.nextMaintenanceInMonth && {
      label: "Nächste Wartung auswählen",
      value: values.nextMaintenanceInMonth,
    },
    values.isPublishMaintenanceAutomatically && {
      label: "Automatisch Veröffentlichen",
      value: values.isPublishMaintenanceAutomatically,
    },
    values.publishMaintenanceAutomaticallyInMonth && {
      label: "Automatisch in monaten veröffentlichen",
      value: values.publishMaintenanceAutomaticallyInMonth,
    },
    values.maintenanceReminderInMonth && {
      label: "Reminder Einstellen",
      value: values.maintenanceReminderInMonth,
    },
    values.isMaintenanceEmailNotificationEnable && {
      label: "Automatische E-Mail Erhalten",
      value: values.isMaintenanceEmailNotificationEnable ? "true" : "false",
    },
    ...(values.maintenanceEmailNotificationList?.length
      ? values.maintenanceEmailNotificationList.map((email: any) => ({
          label: "Automatische Erinnerungs-E-Mails",
          value: email,
        }))
      : []),
  ].filter(Boolean);

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
            title="Anlagen Informationen"
            details={facilityInformation}
            setActiveStep={() => setActiveStep(steps[0])}
          />
        </Grid>
        <Grid item xs={6}>
          <SummarySection
            title="Prüfung Informationen"
            details={facilityCheckInformation}
            setActiveStep={() => setActiveStep(steps[1])}
          />
        </Grid>
        <Grid item xs={6}>
          <SummarySection
            title="Prüfung Informationen"
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
