"use client";
import { NextPage } from "next";
import Image from "next/image";
import GButton from "@/components/button/GButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";

import sucess_svg from "../../../public/icons/success.svg";
interface SucessPageProps {}

const SucessPage: NextPage<SucessPageProps> = ({}) => {
  const router = useRouter();

  const forward = () => {
    console.log("Go to Dashboard");
    router.push("/dashboard");
  };

  return (
    <Grid
      item
      xs={12}
      md={12}
      lg={12}
      sx={styles}
    >
      <div style={{ marginBottom: "2rem" }}>
        <Image width={100} height={100} alt="Success" src={sucess_svg} />
      </div>
      <Typography variant="h4sb">Registrierung abgeschlossen!</Typography>

      <Typography
        variant="bodymr"
        maxWidth={"22rem"}
        textAlign="center"
        color="gray.500"
      >
        You have been added to the project team and permitted to receive any
        project news and updates
      </Typography>

      <GButton sx={{ marginTop: "2rem" }} onClick={forward}>
        Go to Dashboard
      </GButton>
    </Grid>
  );
};

export default SucessPage;

//Styles
const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}