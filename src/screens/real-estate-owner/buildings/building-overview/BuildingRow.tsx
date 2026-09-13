// BuildingRow.tsx
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { FaRegFlag } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { ROUTES } from "@/utils/routes";
import buildingAPI from "@/api/building";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ActionMenu from "@/components/navigation/ActionMenu";
import GButton from "@/components/inputs/button/GButton";
import {
  getUserBuildings,
  setUserBuilding,
} from "@/lib/features/buildingSlice";
import { getFacilitiesByBuilding } from "@/lib/features/facilitySlice";
import { Building } from "./types";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import FacilityRow from "@/screens/real-estate-owner/facilities/facility-overview/FacilityRow";
import BuildingDocuments from "./BuildingDocuments";

interface BuildingRowProps {
  building: Building;
}

const BuildingRow: React.FC<BuildingRowProps> = ({ building }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userBuildings = useAppSelector(getUserBuildings);
  const facilities = useAppSelector(getFacilitiesByBuilding(building.id));
  const tenderList: Tender[] = useAppSelector(
    (state) => state.tender.tenderList
  );

  const totalTenders = useMemo(
    (): number =>
      tenderList.filter(
        (tender: Tender) =>
          !!tender.facility?.id &&
          building.facilityIds?.includes(tender.facility.id)
      ).length,
    [tenderList, building.facilityIds]
  );

  const delMsg = `
    Beim Löschen dieses Gebäudes werden alle relevanten Objekte mitgelöscht.
    ${
      building.facilityIds?.length > 0
        ? `
        <br/>${`- ${building.facilityIds.length} Anlage(n)`}
        <br/>${`- ${totalTenders} Ausschreibunge(n)`}
      `
        : ``
    }
    <br/>Sind Sie sicher, dass Sie dieses Gebäude löschen möchten?
  `;

  const deleteBuilding = async (buildingId: string): Promise<void> => {
    const deleteStatus = await buildingAPI.delete(buildingId);
    if (deleteStatus?.data?.statusCode === 204) {
      const buildingsAfterDelete = userBuildings.filter(
        (item: Building) => item.id !== buildingId
      );
      dispatch(setUserBuilding(buildingsAfterDelete));
    }
  };

  return (
    <Accordion sx={styles.accordion} disableGutters elevation={2}>
      <AccordionSummary expandIcon={<MdExpandMore />} sx={styles.summary}>
        <Stack sx={styles.header}>
          <Box>
            <Typography variant="bodylsb">{building.buildingName}</Typography>
            <Typography variant="bodymr" color="#22A7F1">
              {building.buildingType}
            </Typography>
            <Stack direction="row" alignItems="center" gap={0.75} mt={0.5}>
              <FaRegFlag size="0.9rem" color="#A0ADB1" />
              <Typography variant="bodymr" color="#8D999C">
                {`${building.address.street} ${building.address.houseNumber}, ${building.address.zip} ${building.address.city}`}
              </Typography>
            </Stack>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            gap={2}
            onClick={(event) => event.stopPropagation()}
          >
            <Stack direction="row" alignItems="center" gap={0.75}>
              <IoExtensionPuzzleOutline size="1.2rem" color="#A0ADB1" />
              <Typography variant="bodymsb">{`${building.facilityIds?.length || 0} Anlagen`}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={0.75}>
              <CgNotes size="1.2rem" color="#A0ADB1" />
              <Typography variant="bodymsb">{`${totalTenders} Ausschreibungen`}</Typography>
            </Stack>
            <ActionMenu
              itemId={building.id}
              onEdit={(id) =>
                router.push(ROUTES.REAL_ESTATE.BUILDING.EDIT_BUILDING(id))
              }
              onDelete={deleteBuilding}
              messege={delMsg}
            />
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={styles.details}>
        {facilities.length > 0 ? (
          <Stack gap={1}>
            {facilities.map((facility) => (
              <FacilityRow key={facility.id} facility={facility} />
            ))}
          </Stack>
        ) : (
          <Stack sx={styles.emptyState}>
            <Typography variant="bodymr" color="#8D999C">
              Für dieses Gebäude gibt es noch keine Anlagen.
            </Typography>
            <GButton
              size="small"
              href={ROUTES.REAL_ESTATE.FACILITY.ADD_FACILITY}
            >
              Anlage hinzufügen
            </GButton>
          </Stack>
        )}
        <BuildingDocuments documents={building.documents} />
      </AccordionDetails>
    </Accordion>
  );
};

export default BuildingRow;

// Styles
const styles: {
  accordion: SxProps;
  summary: SxProps;
  header: SxProps;
  details: SxProps;
  emptyState: SxProps;
} = {
  accordion: {
    "&:before": { display: "none" },
    borderRadius: "0.5rem !important",
  },
  summary: {
    borderRadius: "0.5rem",
    py: "0.5rem",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    pr: "0.5rem",
  },
  details: {
    bgcolor: "#F8F9F9",
    borderRadius: "0 0 0.5rem 0.5rem",
    pl: "1.5rem",
  },
  emptyState: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    py: "0.5rem",
  },
};
