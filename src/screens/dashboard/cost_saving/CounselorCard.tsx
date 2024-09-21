import SectionTitle from "@/components/label/SectionTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"; // For navigation arrows
import { FaRegSmile } from "react-icons/fa"; // Placeholder for the assistant icon
import DividerDecorator from "@/components/divider/DividerDecorator";
import { RiRobot2Line } from "react-icons/ri";

const CounselorCard = (): JSX.Element => {
  return (
    <Box sx={styles.container}>
      {/* Navigation Arrows */}
      <Box sx={styles.navContainer}>
        <IconButton size="medium" sx={{ color: "white" }}>
          <AiOutlineArrowLeft />
        </IconButton>
        <IconButton size="medium" sx={{ color: "white" }}>
          <AiOutlineArrowRight />
        </IconButton>
      </Box>

      <SectionTitle
        text="RATGEBER"
        sx={{ color: "white", lineHeight: "1rem" }}
      />
      <DividerDecorator sx={{ bgcolor: "white" }} />

      {/* Project Information */}
      <Typography variant="bodylr" color={"white"} mt={1}>
        Project:
      </Typography>
      <Typography variant="h4" fontWeight={700}>
        Unsere Tips zur Angebotsauswahl
      </Typography>

      <Divider sx={styles.divider} />

      {/* Assistant Section */}
      <Box sx={styles.assistantContainer}>
        <RiRobot2Line size={65} color="white" />
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{ color: "white" }}
          >
            ASSITENT
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "white", maxWidth: "14rem", marginTop: "0.25rem" }}
          >
            Erstelle eine neue Ausschreibung.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CounselorCard;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#22A7F1",
    borderRadius: "16px",
    color: "white",
    height: "100%",
    position: "relative",
  },
  navContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
    display: "flex",
    gap: "0.5rem",
  },
  projectTitle: {
    fontWeight: 700,
    color: "white",
    fontSize: "1.25rem",
    marginTop: "0.5rem",
  },
  divider: {
    backgroundColor: "white",
    opacity: 0.5,
    marginY: "1rem",
  },
  assistantContainer: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    marginTop: "0.5rem",
  },
};
