import { NextPage } from 'next'
import Image from 'next/image'
import React from "react";
import GButton from '@/components/common/GButton/GButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import sucess_svg from "../../../public/success.svg";
interface SucessPageProps {}

const SucessPage: NextPage<SucessPageProps> = ({}) => {
    return (
        <Grid item xs={12} md={12} lg={12} sx={{display:'flex', flexDirection:'column', justifyContent:'center' ,alignItems:'center'}}>
        <Image
            width={100}
            height={100}
            alt="Sucess"
            src={sucess_svg}
            style={{marginBottom:'2rem'}}
            />
            <Typography variant='h4sb'>
            Registrierung abgeschlossen!
            </Typography>
            
            <Typography variant='bodymr' maxWidth={'22rem'} textAlign="center" color="gray.500">
                You have been added to the project team and permitted to receive any project news and updates
            </Typography>

            <GButton sx={{marginTop:'2rem'}} >
                Go to Dashboard
            </GButton>
            
        </Grid>
  )
}

export default SucessPage