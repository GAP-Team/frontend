'use client';
import React from "react";
import { GapLogo } from "@/components/common/GapLogo/GapLogo";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FaRegEnvelope } from "react-icons/fa";
import { PiLockBold } from "react-icons/pi";
declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    gprimary: true;
  }
}

const LoginPage = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh'}}>
      <Grid
        item
        xs={false}
        md={6}
        lg={6}
        sx={{
          backgroundImage: `url(/login-bg.png)`,
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
      <Grid item xs={12} md={6} lg={6} component={Paper} >
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor:'white'
          }}
          >
          <GapLogo color="#0D1F4E" size="sm" />
          <Box component="form" noValidate sx={{ mt: 2, padding:5, borderRadius: '1rem', boxShadow: 3 }}>
            <Grid container sx={{mb:'2rem',color:'#1E3137'}} >
              <Grid item xs >
                <Link href="#" variant="h6" sx={{fontSize:'1.5rem', color:'black', fontWeight:'bold', textDecoration:'none'}}>
                  Anmelden 
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" sx={{fontSize:'1rem',fontWeight:'bold', color:'black',}}>
                  Passwort vergessen
                </Link>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              required
              label="Email"
              InputProps={{
                startAdornment: <InputAdornment position="start"><FaRegEnvelope /></InputAdornment>,
              }}
              sx={{ mb: 4 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              InputProps={{
                startAdornment: <InputAdornment position="start"><PiLockBold /></InputAdornment>,
              }}
            />
            <Grid container sx={{mt:10}}>
              <Grid item xs sx={{display:'flex', flexDirection:'column'}}>
                
                <Typography  variant="body2" style={{ color: '#475A60', fontSize:'0.875rem', lineHeight:'1.25rem' }}>
                Noch keinen account? 
                </Typography>
                <Link href="#" variant="body2" style={{ color: '#22a7f1', fontSize:'1rem', textDecoration: 'none', cursor: 'pointer' }}>Registrieren</Link>
                
              </Grid>
              <Grid item>
                <Button variant="contained" color="gprimary" size="large" sx={{borderRadius:'0.5rem'}}>Login</Button>
              </Grid>
            </Grid>
          </Box>
          <Typography sx={{color:'#475A60', fontSize:'1rem', marginTop:'3rem',marginRight:'auto', marginLeft:18.5, }} >
            Hilfe? <Link href="#" color='#1E3137' fontWeight="bold">Contact Support</Link>
          </Typography>
      </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;