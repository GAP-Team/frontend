'use client';
import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import {MdArrowBackIos}  from "react-icons/md";
import GStepper from "@/screens/RegistrationRealState/GStepper";
import GProgressStepper from "@/screens/RegistrationRealState/GProgressStepper";
import GTab from "@/screens/RegistrationRealState/GTab";
import { useRouter } from 'next/navigation';
import Divider from '@mui/material/Divider';
import AddresseFirma from "./AddresseFirma";
import GenericForm from "./GenericForm";

function getSteps() {
  return ['Grundinformation', 'Adresse der Firma', 'Ansprechpartner', 'Gewerbeanmeldung', 'Zusammenfassung'];
}
const basictabs = [
  { label: 'Immobilienbetreiber', content: <GenericForm value={0}  /> },
  { label: 'Dienstleister', content: <GenericForm value={1}  /> },
];
const registertabs = [
  { label: 'Gewerbeperson', content: <GenericForm value={2}  /> },
  { label: 'Privatperson', content: <GenericForm value={3}  /> },
];

const RegistrationRealState = () => {

  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep:number) => {
      return prevActiveStep <= 3 ? prevActiveStep + 1 : prevActiveStep;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh'}}>
      <Grid
        item
        xs={false}
        md={4}
        lg={4}
        sx={{
          backgroundImage: `url(/registration-bg.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
          height: '100%', 
        }}
      >
        {/* Make this Box a flex container to use Flexbox properties */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%', // Take full height of parent Grid
          }}
        >
          {/* Title Typography */}
          <Typography variant="h2" color="white" sx={{
            ml: '4rem',
            mt: '6.8rem',
            fontWeight: 'bold',
            fontSize: { xs: '3rem', md: '4.5rem' }, // Responsive font size
            lineHeight: { xs: '3.3rem', md: '4.8rem' }, // Responsive line height
            maxWidth: '80%',
          }}>
            Where skills are developed
          </Typography>

          {/* Subtitle Typography */}
          <Typography variant="subtitle1" color="white" sx={{
            ml: '4rem',
            mt: '2rem',
            fontSize: '1.5rem',
            lineHeight: '2.2rem',
          }}>
            Gesetzliche Anlagenprüfung
          </Typography>

          {/* Spacer to push the copyright notice to the bottom */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Copyright Typography - sticks to the bottom */}
          <Typography variant="subtitle1" color="white" sx={{
            ml: '4rem',
            mb: '2rem', // Add bottom margin if needed
          }}>
            ©2023 GAP GmbH
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={8} lg={8} sx={{backgroundColor:'#F9FAFA'}} >
      <Button
          variant="text"
          sx={{ display: 'flex',fontSize:'0.875rem',fontWeight:'600', alignItems: 'center', marginLeft:'3.75rem', color:'#8D999C', marginTop:'2.5rem' }}
          onClick={activeStep === 0 ? () => router.back(): handleBack}
        >
          <MdArrowBackIos />
          Back
        </Button>
        <Typography variant="h3" sx={{fontSize:'2rem', lineHeight:'2.5rem', fontWeight:'700', marginLeft:'3.75rem', my:'2rem' }}>
          Registrierung
        </Typography>
      <Grid 
        sx={{
          // my: '2rem',
          marginLeft:'3.75rem',
          marginRight:'3.5rem',
          display: 'flex',
          flexDirection:'row',
          backgroundColor: 'white',
          height: '37.375rem;',
          padding: '1.5rem',
          borderRadius: '0.5rem', 
          boxShadow: '0px 8px 24px 0px rgba(30, 49, 55, 0.08)',
          }}
          >
          <Grid item xs={3} >
            <Link
              underline="hover"
              sx={{ display: 'flex', fontSize: '0.75rem', fontWeight: '600', alignItems: 'center', color: '#A0ADB1' }}
              color="inherit"
              href="/"
            >

              STEP  1/ 5
            </Link>
            
            <GStepper activeStep={activeStep} steps={steps}/>
          </Grid>

          <Divider orientation="vertical" variant="middle" flexItem />
          
          <Grid item xs={9}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',height: '100%', }}
          >
            <div className="flex flex-col">
              <Typography variant="subtitle2" sx={{ display: 'flex', fontSize: '0.75rem', marginLeft: '1.5rem', fontWeight: '600' }}>{ steps[activeStep]}</Typography>
              <GProgressStepper sx={{ maxWidth: 'none', width: 'auto', flexGrow: 1, marginLeft:'1rem', color:'gprimary' }} activeStep={activeStep}/>
              {activeStep == 0 && (<GTab tabs={basictabs} />)}
              {activeStep == 1 && (<AddresseFirma />)}
              {activeStep == 2 && (<GenericForm type='contact' />)}
              {activeStep == 3 && (<GTab tabs={registertabs} />)}
              
            </div>
            <Button
              variant="contained"
              color="gprimary"
              size="large"
              sx={{
                borderRadius: '0.5rem',
                py:'0.5rem',
                fontWeight: 600,
                alignSelf: 'flex-end', // Aligns the button to the right
                mt: 'auto', // Pushes the button to the bottom
              }}
              onClick={handleNext}
            >Weiter
            </Button>
          </Grid>
      </Grid>
          <Typography sx={{color:'#475A60', fontSize:'1rem', marginTop:'3rem', marginLeft:'3.75rem', }} >
            Hilfe? <Link href="#" color='#1E3137' fontWeight="bold">Contact Support</Link>
          </Typography>
      </Grid>
    </Grid>
  );
};

export default RegistrationRealState;