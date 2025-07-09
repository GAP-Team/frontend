// BuildingItem.tsx
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { CgNotes } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegFlag } from "react-icons/fa6";
import Divider from "@mui/material/Divider";
import { useAppDispatch } from "@/lib/hooks";
import Typography from "@mui/material/Typography";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

import { Building } from "./types";
import facilityAPIs from "@/api/facility";
import buildingAPIs from "@/api/building";
import DocumentList from "./DocumentList ";
import { DOCUMENT_TYPE } from "@/utils/enums";
import ActionMenu from "@/components/common/ActionMenu";
import { ROUTES, REAL_ESTATE_BASE } from "@/utils/routes";
import { styles } from "@/components/common/scrollbar/styles";
import {
  getUserBuildings,
  setUserBuildingDetails,
} from "@/lib/features/buildingSlice";

interface BuildingCardProps {
  building: Building;
}

const BuildingCard: React.FC<BuildingCardProps> = ({ building }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userBuildings = useSelector(getUserBuildings);
  const [totalTenders, setTotalTenders] = useState<number>();

  useEffect(() => {
    getFacilityTendersCount();
  }, []);

  const getFacilityTendersCount = async (): Promise<void> => {
    var count = 0;
    if (building?.facilityIds?.length > 0) {
      await Promise.all(
        building?.facilityIds?.map(async (facilityId: string) => {
          const tender = await facilityAPIs.getFacilityTenders(facilityId);
          count = count + tender?.data?.length;
        })
      );
    }
    setTotalTenders(count);
  };

  const delMsg = `
    Beim Löschen dieses Gebäudes werden alle relevanten Objekte mitgelöscht.
    ${
      building.facilityIds?.length > 0
        ? `
        <br/>${`- ${building.facilityIds?.length} Anlage(n)`}
        <br/>${`- ${totalTenders} Ausschreibunge(n)`}
      `
        : ``
    }
    <br/>Sind Sie sicher, dass Sie dieses Gebäude löschen möchten?
  `;

  const deleteBuilding = async (buildingId: string): Promise<void> => {
    const deleteStatus = await buildingAPIs.delete(buildingId);
    if (deleteStatus?.data?.statusCode === 204) {
      const buildingsAfterDelete = userBuildings.filter(
        (building: Building) => building.id !== buildingId
      );
      dispatch(setUserBuildingDetails(buildingsAfterDelete));
    }
  };

  const handleRedirect = (redirect: string): void => {
    router.push(`${REAL_ESTATE_BASE}/${redirect}`);
  };

  return (
    <Paper sx={styles.card}>
      <Box sx={styles.header}>
        <Box sx={styles.title}>
          <Typography variant="bodylsb">{building.buildingName}</Typography>
          <Typography variant="bodymr" color="#22A7F1">
            {building.buildingType}
          </Typography>
        </Box>
        <ActionMenu
          itemId={building?.id}
          onEdit={(id) =>
            router.push(ROUTES.REAL_ESTATE.BUILDING.EDIT_BUILDING(id))
          }
          onDelete={(id) => deleteBuilding(id)}
          messege={delMsg}
        />
      </Box>
      <Box sx={styles.header} marginTop="1rem">
        <Stack direction="row" alignItems="center" gap={2}>
          <IoExtensionPuzzleOutline size="1.5rem" color="#A0ADB1" />
          <Typography
            style={styles.items}
            onClick={() => handleRedirect("facilities")}
          >{`${building?.facilityIds?.length} Anlagen`}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <CgNotes size="1.5rem" color="#A0ADB1" />
          <Typography
            style={styles.items}
            onClick={() => handleRedirect("tenders")}
          >{`${totalTenders} Ausschreibungen`}</Typography>
        </Stack>
      </Box>
      <Divider sx={styles.divider} orientation="horizontal" />
      <Stack direction="row" gap={2} alignItems="flex-start">
        <FaRegFlag size="1.5rem" color="#A0ADB1" />
        <Stack direction="column" gap={1}>
          <Typography variant="bodymr" color="black">
            {`${building.address.street} ${building.address.houseNumber} ${building.address.zip} ${building.address.city}`}
          </Typography>
          {building.totalArea !== null && (
            <Typography
              variant="bodymr"
              color="black"
            >{`${building.totalArea} qm`}</Typography>
          )}
        </Stack>
      </Stack>
      <List sx={{ ...styles.listContainer }}>
        {building?.documents?.length > 0 && (
          <>
            <DocumentList
              title={"Bauunterlagen"}
              documentType={DOCUMENT_TYPE.CONSTRUCTION_DOCUMENTS}
              documents={building?.documents}
            />
            <DocumentList
              title={"Grundrisse"}
              documentType={DOCUMENT_TYPE.FLOOR_PLANS}
              documents={building?.documents}
            />
            <DocumentList
              title={"Sonstige Dokumente"}
              documentType={DOCUMENT_TYPE.OTHER}
              documents={building?.documents}
            />
          </>
        )}
      </List>
    </Paper>
  );
};

export default BuildingCard;

// Styles
const styles = {
  card: {
    p: "1.25rem",
    borderRadius: "0.5rem",
    maxHeight: "21rem",
    minHeight: "21rem",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { display: "flex", flexDirection: "column", color: "gprimary" },
  divider: {
    my: "0.75rem",
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
  },
  listContainer: {
    flexGrow: 1,
    paddingTop: "0.5rem",
    overflow: "auto",
    paddingRight: "0.65rem",
    ...styles,
  },
  items: {
    variant: "bodymsb",
    fontWeight: 500,
    color: "#22A7F1",
    cursor: "pointer",
  },
};
