"use client";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { ActiveStepItem } from "../../types";
import { getUserBuildings } from "@/lib/features/buildingSlice";
import SummarySection, {
  Detail,
} from "@/components/common/summary/SummarySection";
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
  const allBuildings = useSelector(getUserBuildings);
  const [selectedBuildingDetails, setSelectedBuildingDetails] =
    useState<SelectedBuildingData>();

  useEffect(() => {
    const building = allBuildings.filter(
      (building: any) => building.id === values.selectedBuilding
    );
    setSelectedBuildingDetails(building[0]);
  }, []);

  const facilityInformation: Detail[] = [
    values.name && {
      label: "Name der Anlage/Bezeichnung",
      value: values.name,
    },
    values.facilityType && {
      label: "Anlagenart",
      value: values.facilityType,
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
    values.isPublishCheckAutomatically && {
      label: "Automatisch Veröffentlichen",
      value: values.isPublishCheckAutomatically ? "Ja" : "Nein",
    },
    values.isPublishCheckAutomatically &&
      values.publishAutomaticallyInMonth && {
        label: "Automatisch veröffentlichen in",
        value: `${values.publishAutomaticallyInMonth} Monat(e)`,
      },
    values.reminderInMonth !== 0
      ? {
          label: "Reminder Einstellen in",
          value: `${values.reminderInMonth} Monat(e)`,
        }
      : {
          label: "Reminder Einstellen in",
          value: `Keine`,
        },
    values.isEmailNotificationEnable && {
      label: "Automatische E-Mail Erhalten",
      value: values.isEmailNotificationEnable ? "Ja" : "Nein",
    },
    values.isEmailNotificationEnable &&
      values.emailNotificationList?.length > 0 && {
        label: "Automatische Erinnerungs-E-Mails",
        value: values.emailNotificationList.map(
          (email: any, index: number) =>
            `${email}${values.emailNotificationList.length !== index + 1 ? `, ` : ""}`
        ),
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
    values.isPublishMaintenanceAutomatically &&
      values.publishMaintenanceAutomaticallyInMonth && {
        label: "Automatisch veröffentlichen in",
        value: `${values.publishMaintenanceAutomaticallyInMonth} Monat(e)`,
      },
    values.maintenanceReminderInMonth !== 0
      ? {
          label: "Reminder Einstellen in",
          value: `${values.maintenanceReminderInMonth} Monat(e)`,
        }
      : {
          label: "Reminder Einstellen in",
          value: `Keine`,
        },
    values.isMaintenanceEmailNotificationEnable && {
      label: "Automatische E-Mail Erhalten",
      value: values.isMaintenanceEmailNotificationEnable ? "Ja" : "Nein",
    },
    values.isMaintenanceEmailNotificationEnable &&
      values.maintenanceEmailNotificationList?.length > 0 && {
        label: "Automatische Erinnerungs-E-Mails",
        value: values.maintenanceEmailNotificationList.map(
          (email: any, index: number) =>
            `${email}${values.maintenanceEmailNotificationList.length !== index + 1 ? `, ` : ""}`
        ),
      },
  ].filter(Boolean);

  const updatedDocList: Detail[] = [
    ...(values.checkReports?.length
      ? values.checkReports.map((doc: any) => ({
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
