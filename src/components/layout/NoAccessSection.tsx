import Image from "next/image";
import Box from "@mui/material/Box";
import { ROUTES } from "@/utils/routes";
import Typography from "@mui/material/Typography";
import GButton from "@/components/ui/button/GButton";
import NoAccessImage from "../../../public/images/no_access.png";

interface NoAccessSectionProps {
  description?: string;
}

const NoAccessSection: React.FC<NoAccessSectionProps> = ({ description }) => {
  return (
    <Box sx={styles.container}>
      <Image
        width={400}
        height={400}
        alt={"No Access"}
        style={{ marginBottom: "1.5rem" }}
        src={NoAccessImage}
      />
      <Typography variant="h4sb">Zugriff verweigert</Typography>
      <Typography
        variant="bodymr"
        style={{ maxWidth: "22rem", textAlign: "center", color: "#8D999C" }}
      >
        {description}
      </Typography>
      <GButton style={{ marginTop: "1rem" }} href={ROUTES?.LOGIN}>
        Login
      </GButton>
    </Box>
  );
};

export default NoAccessSection;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    height: "calc(100vh - 9.125rem)",
    px: "1.5rem",
    pt: "1.5rem",
    pb: 0,
  },
};
