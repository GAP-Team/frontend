// NoBuildingPage.tsx
import  Box  from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import GButton from "@/components/button/GButton";
import addObjSrc from "@/../public/icons/add_objekt.svg";

const NoBuildingPage: React.FC = () => {
  return (
    <Box sx={styles.container}>
        <Image
          width={400}
          height={400}
          alt="No Building/Objekt"
          style={{marginBottom:'1.5rem'}}
          src={addObjSrc}
        />
      <Typography variant="h4sb" >
        Erstelle ein neues Objekt.
      </Typography>
      <GButton style={{ marginTop: "1rem" }} href="/dashboard/buildings/add_building">
        Objekt anlegen
      </GButton>
    </Box>
  );
};

export default NoBuildingPage;

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
