// BuildingItem.tsx
import { Tender } from "./types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { FaRegFlag } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";
import TenderMenu from "./BuildingMenu";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";

interface BuildingItemProps {
  tender: Tender;
}

const BuildingItem: React.FC<BuildingItemProps> = ({ tender }) => {
  return (
    <Paper sx={styles.card}>
      <Box sx={styles.header}>
        <Box sx={styles.title}>
          <Typography variant="bodylsb">{tender.title}</Typography>
          <Typography variant="bodymr" color="#22A7F1">
            Gebäudetypbezeichnung
          </Typography>
        </Box>
        <TenderMenu />
      </Box>
      <Box sx={styles.header} marginTop="1rem">
        <Stack direction="row" alignItems="center" gap={2}>
          <IoExtensionPuzzleOutline size="1.5rem" color="#A0ADB1" />
          <Typography
            variant="bodymsb"
            fontWeight={500}
            color="black"
          >{`${tender.noOfTenders} Anlagen`}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <CgNotes size="1.5rem" color="#A0ADB1" />
          <Typography
            variant="bodymsb"
            color="black"
            fontWeight={500}
          >{`${tender.noOfInvestment} Ausschreibungen`}</Typography>
        </Stack>
      </Box>
      <Divider sx={styles.divider} orientation="horizontal" />
      <Stack direction="row" gap={2} alignItems="flex-start">
        <FaRegFlag size="1.5rem" color="#A0ADB1" />
        <Stack direction="column" gap={1}>
          <Typography
            variant="bodymr"
            color="black"
          >{`${tender.address}`}</Typography>
          <Typography
            variant="bodymr"
            color="black"
          >{`${tender.area} qm`}</Typography>
        </Stack>
      </Stack>
      <List sx={styles.listContainer}>
        {tender?.filesNames?.map((filename, index) => (
          <Stack
            direction="row"
            alignItems="center"
            py="0.55rem"
            gap={2}
            key={index}
          >
            <FiFileText size="1.5rem" color="#22A7F1" />
            <Typography
              variant="bodymr"
              color="#22A7F1"
            >{`${filename}`}</Typography>
          </Stack>
        ))}
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
    // maxHeight: "8rem",
    paddingRight: "0.65rem", // Add padding to the bottom for the scrollbar
    ...scrollBarStyles,
  },
};
