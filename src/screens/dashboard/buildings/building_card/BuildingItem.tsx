// BuildingItem.tsx
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { CgNotes } from "react-icons/cg";
import { FaRegFlag } from "react-icons/fa6";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

import { Building } from "./types";
import BuildingMenu from "./BuildingMenu";
import DocumentList from "./DocumentList ";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";

interface BuildingItemProps {
  building: Building;
}

const BuildingItem: React.FC<BuildingItemProps> = ({ building }) => {
  return (
    <Paper sx={styles.card}>
      <Box sx={styles.header}>
        <Box sx={styles.title}>
          <Typography variant="bodylsb">{building.buildingName}</Typography>
          <Typography variant="bodymr" color="#22A7F1">
            {building.buildingType}
          </Typography>
        </Box>
        <BuildingMenu buildindId={building?._id} />
      </Box>
      <Box sx={styles.header} marginTop="1rem">
        <Stack direction="row" alignItems="center" gap={2}>
          <IoExtensionPuzzleOutline size="1.5rem" color="#A0ADB1" />
          <Typography
            variant="bodymsb"
            fontWeight={500}
            color="black"
          >{`0 Anlagen`}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <CgNotes size="1.5rem" color="#A0ADB1" />
          <Typography
            variant="bodymsb"
            color="black"
            fontWeight={500}
          >{`0 Ausschreibungen`}</Typography>
        </Stack>
      </Box>
      <Divider sx={styles.divider} orientation="horizontal" />
      <Stack direction="row" gap={2} alignItems="flex-start">
        <FaRegFlag size="1.5rem" color="#A0ADB1" />
        <Stack direction="column" gap={1}>
          <Typography variant="bodymr" color="black">
            {`${building.address.street} ${building.address.houseNumber} ${building.address.zip} ${building.address.city}`}
          </Typography>
          {building.totalArea != null && (
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
              documentType={"BAUUNTERLAGEN"}
              documents={building?.documents}
            />
            <DocumentList
              title={"Grundrisse"}
              documentType={"GRUNDRISSE"}
              documents={building?.documents}
            />
            <DocumentList
              title={"Sonstige Dokumente"}
              documentType={"SONSTIGE"}
              documents={building?.documents}
            />
          </>
        )}
      </List>
    </Paper>
  );
};

export default BuildingItem;

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
    ...scrollBarStyles,
  },
};
