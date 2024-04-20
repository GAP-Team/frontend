import React from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useRouter } from "next/navigation";
import GButton from '@/components/button/GButton';
import sucess_svg from "../../../public/icons/success.svg";

interface SuccessPageProps {
  title: string;
  description: string;
  buttonLabel: string;
  imageUrl?: string;
  redirectUrl: string;
}

const SuccessPage: NextPage<SuccessPageProps> = ({
  title,
  description,
  buttonLabel,
  imageUrl=sucess_svg,
  redirectUrl
}) => {
  const router = useRouter();

  const handleNavigation = () => {
    console.log(`Navigating to ${redirectUrl}`);
    router.push(redirectUrl);
  };

  return (
    <Grid item xs={12} md={12} lg={12} sx={styles}>
      <div style={{ marginBottom: "2rem" }}>
        <Image width={100} height={100} alt="Success" src={imageUrl} />
      </div>
      <Typography variant="h4sb">{title}</Typography>
      <Typography variant="bodymr" style={{ maxWidth: "22rem", textAlign: "center", color: "gray.500" }}>
        {description}
      </Typography>
      <GButton style={{ marginTop: "2rem" }} onClick={handleNavigation}>
        {buttonLabel}
      </GButton>
    </Grid>
  );
};

export default SuccessPage;

// Styles
const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
