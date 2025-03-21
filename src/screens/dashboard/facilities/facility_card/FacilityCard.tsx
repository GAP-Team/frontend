import React from "react";
import { Facility } from "./types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import { ROUTES } from "@/utils/routes";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import { BsClockFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { DOCUMENT_TYPE } from "@/utils/enums";
import Typography from "@mui/material/Typography";
import ActionMenu from "@/components/common/ActionMenu";
import SectionTitle from "@/components/label/SectionTitle";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";
import DocumentList from "../../buildings/building_card/DocumentList ";
import { checkActiveTenderForFacility } from "@/lib/features/tenderSlice";
import { showSnackbar } from "@/components/root-snackbar";
import { deleteFacility } from "@/lib/features/facilitySlice";
import {
  getFacilityCheckTimeRemaining,
  getFacilityMaintenanceTimeRemaining,
} from "../utils";
import dayjs from "dayjs";
import DetailItem from "@/components/common/DetailItem";
import SummaryCard from "@/components/summary/SummaryCard";

interface FacilityCardProps {
  facility: Facility;
}
const statusStyles: { [key: string]: { bgcolor: string; color: string } } = {
  aktiv: { bgcolor: "#96E9CB", color: "#056643" },
  ausgeschrieben: { bgcolor: "#FDFCE0", color: "#EB9700" },
  Nachprüfung: { bgcolor: "#FFE1D7", color: "#EB4444" },
};

const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  const handleClick = (): void => {};
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isFacilityActive = useAppSelector(
    checkActiveTenderForFacility(facility?.id)
  );
  const noOfTenders = facility?.tenderIds?.length;
  const chipStyles = statusStyles[status] || statusStyles["aktiv"];

  const checkUrgency = (): string => {
    const monthsUntilCheck = getFacilityCheckTimeRemaining(facility, "months");
    const daysUntilMaintenance = getFacilityMaintenanceTimeRemaining(
      facility,
      "days"
    );

    // Check if either maintenance or check is overdue (negative values)
    if (monthsUntilCheck < 0 || daysUntilMaintenance < 0) {
      return "red";
    }
    // Warning for upcoming check or maintenance
    if (monthsUntilCheck > 0 && monthsUntilCheck < 6) {
      return "orange";
    }
    if (daysUntilMaintenance > 0 && daysUntilMaintenance < 30) {
      return "orange";
    }
    return "";
  };

  const handleDeleteFacility = async (facilityId: string): Promise<void> => {
    try {
      await dispatch(deleteFacility(facilityId)).unwrap();
      dispatch(
        showSnackbar({
          type: "success",
          message: "Die Anlage wurden erfolgreich gelöscht!",
        })
      );
    } catch {
      dispatch(
        showSnackbar({
          type: "error",
          message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        })
      );
    }
  };

  return (
    <Paper
      sx={styles.card}
      elevation={4}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Box sx={styles.header}>
        {isFacilityActive && <Chip label={"aktiv"} sx={{ ...chipStyles }} />}
        {checkUrgency() && (
          <Icon sx={{ color: checkUrgency() }}>
            <BsClockFill />
          </Icon>
        )}
      </Box>
      <Box sx={styles.actionMenu}>
        <ActionMenu
          itemId={facility?.id}
          onDelete={handleDeleteFacility}
          onEdit={(id) =>
            router.push(ROUTES.REAL_ESTATE.FACILITY.EDIT_FACILITY(id))
          }
          messege={`Sind Sie sicher, dass Sie dieses Element${noOfTenders ? ` und die zugehörigen ${noOfTenders} Ausschreibungen` : ""} löschen möchten?`}
        />
      </Box>
      <SectionTitle
        text={facility.name}
        sx={{ fontWeight: 400, py: "0.75rem" }}
      />
      <Typography variant="h6" sx={styles.title}>
        {facility.facilityType}
      </Typography>
      <Box sx={styles.tags} />
      <Divider sx={styles.divider} orientation="horizontal" />
      <SummaryCard>
        <DetailItem label="Unterkategorie" value={facility.subcategory} />
        {/* Check Information */}
        <Typography variant="subtitle2" sx={{ ...styles.sectionTitle, mt: 1 }}>
          Prüfung
        </Typography>
        <DetailItem
          label="Letzte Prüfung"
          value={
            dayjs(facility.check.lastCheckDate)?.format("DD.MM.YYYY") ||
            "Nicht verfügbar"
          }
        />
        <DetailItem
          label="Nächste Prüfung in"
          value={`${getFacilityCheckTimeRemaining(facility, "months")} Monate`}
        />
        <DetailItem
          label="Automatische Veröffentlichung"
          value={facility.check.isPublishAutomatically ? "Ja" : "Nein"}
        />
        <DetailItem
          label="Veröffentlichung in"
          value={`${facility.check.publishAutomaticallyInMonth} Monate`}
        />
        <DetailItem
          label="Erinnerung in"
          value={`${facility.check.reminderInMonth} Monate`}
        />
        <DetailItem
          label="E-Mail Benachrichtigung"
          value={facility.check.isEmailNotificationEnable ? "Ja" : "Nein"}
        />
        <DetailItem
          label="E-Mail Liste"
          value={facility.check.emailNotificationList.join(", ") || "Keine"}
        />

        {/* Maintenance Information */}
        <Typography variant="subtitle2" sx={{ ...styles.sectionTitle, mt: 1 }}>
          Wartung
        </Typography>
        <DetailItem
          label="Letzte Wartung"
          value={
            dayjs(facility.maintenance.lastMaintenanceDate)?.format(
              "DD.MM.YYYY"
            ) || "Nicht verfügbar"
          }
        />
        <DetailItem
          label="Nächste Wartung in"
          value={`${getFacilityMaintenanceTimeRemaining(facility, "days")} Tage`}
        />
        <DetailItem
          label="Automatische Veröffentlichung"
          value={facility.maintenance.isPublishAutomatically ? "Ja" : "Nein"}
        />
        <DetailItem
          label="Veröffentlichung in"
          value={`${facility.maintenance.publishAutomaticallyInMonth} Monate`}
        />
        <DetailItem
          label="Erinnerung in"
          value={`${facility.maintenance.reminderInMonth} Monate`}
        />
        <DetailItem
          label="E-Mail Benachrichtigung"
          value={facility.maintenance.isEmailNotificationEnable ? "Ja" : "Nein"}
        />
        <DetailItem
          label="E-Mail Liste"
          value={
            facility.maintenance.emailNotificationList.join(", ") || "Keine"
          }
        />
      </SummaryCard>

      {/* Document Section */}
      <List sx={{ ...styles.listContainer }}>
        {facility?.documents?.length > 0 && (
          <>
            <DocumentList
              title={"Berichte"}
              documentType={DOCUMENT_TYPE.CHECK_REPORTS}
              documents={facility?.documents}
            />
            <DocumentList
              title={"Grundrisse"}
              documentType={DOCUMENT_TYPE.FLOOR_PLANS}
              documents={facility?.documents}
            />
            <DocumentList
              title={"Sonstige Dokumente"}
              documentType={DOCUMENT_TYPE.OTHER}
              documents={facility?.documents}
            />
          </>
        )}
      </List>
    </Paper>
  );
};

export default FacilityCard;

// Styles
const styles = {
  card: {
    p: "1.25rem",
    borderRadius: "0.5rem",
    maxWidth: "20rem", // Adjust the width as needed
    height: "35rem",
    flexShrink: 0,
    overflow: "auto",
    mb: "0.35rem",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chip: {
    bgcolor: "purple",
    color: "white",
  },
  title: {
    fontWeight: "600",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    pb: "0.5rem",
  },
  tags: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tagChip: {
    mr: 0.5,
    mb: 0.5,
  },
  divider: {
    my: "0.75rem",
  },
  subText: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem",
    fontWeight: "600",
    lineHeight: "1rem",
    mt: 0.5,
    "& > svg": {
      mr: 0.5,
    },
  },
  actionMenu: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  listContainer: {
    flexGrow: 1,
    paddingTop: "0.5rem",
    overflow: "auto",
    paddingRight: "0.65rem",
    ...scrollBarStyles,
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: "0.875rem",
    color: "gprimary.main",
    mb: 0.5,
  },
};
