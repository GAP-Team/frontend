'use client';
import React from "react";
import {FormControl} from '@mui/material';
import { GapLogo } from "@/components/common/GapLogo/GapLogo";
import { Box, Button, TextField, InputAdornment, Typography, useMediaQuery,Link, useTheme,Paper, Grid, CssBaseline, Container } from '@mui/material';


export const LoginPage = () => {
  return (
    // <Box sx={{ bgcolor: '#f9fafa', flexGrow: 1 }}>
    //   <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //     <Grid container spacing={2}>
    //       <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //         {/* Background Image Section */}
    //         <Box sx={{ maxWidth: '100%', overflow: 'hidden', position: 'relative' }}>
    //           <img src="https://c.animaapp.com/t6wtCY7x/img/image.png" alt="Background" style={{ width: '100%', height: 'auto' }} />
    //           <Typography variant="body2" sx={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
    //             ©2023 GAP GmbH
    //           </Typography>
    //           <Typography variant="h2" sx={{ position: 'absolute', top: '10%',  color: 'white' }}>
    //             Where skills are developed
    //           </Typography>
    //           <Typography variant="h5" sx={{ position: 'absolute', top: '30%', color: 'white' }}>
    //             Gesetzliche Anlagenprüfung
    //           </Typography>
    //         </Box>
    //       </Grid>

    //       <Grid item xs={12} md={6}>
    //         <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
    //           {/* Dynamic Logo Component */}
    //           <GapLogo color="#0D1F4E" size="sm" />

    //           {/* Login Card */}
    //           <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
    //             {/* Login Header */}
    //             <Typography variant="h6">Anmelden</Typography>
    //             <Typography variant="body2" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
    //               Passwort vergessen
    //             </Typography>

    //             {/* Form Fields */}
    //             <Box sx={{ mt: 2 }}>
    //               <TextField
    //                 fullWidth
    //                 label="Username"
    //                 InputProps={{
    //                   startAdornment: <InputAdornment position="start">@</InputAdornment>,
    //                 }}
    //                 sx={{ mb: 2 }}
    //               />
    //               <TextField
    //                 fullWidth
    //                 label="Password"
    //                 type="password"
    //               />
    //             </Box>

    //             {/* Registration Prompt and Login Button */}
    //             <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //               <Typography variant="body2">
    //                 Noch keinen account? <span style={{ color: '#22a7f1', textDecoration: 'underline', cursor: 'pointer' }}>Registrieren</span>
    //               </Typography>
    //               <Button variant="contained">Login</Button>
    //             </Box>
    //           </Box>

    //           {/* Help Link */}
    //           <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
    //             <Typography variant="body2">Hilfe?</Typography>
    //             <Typography variant="body2" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>Contact Support</Typography>
    //           </Box>
    //         </Box>
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </Box>
    <Grid container component="main" sx={{ height: '100vh'}}>
      <CssBaseline />
      <Grid
          item
          xs={false}
          md={6}
          sx={{
            backgroundImage: 'url(https://c.animaapp.com/t6wtCY7x/img/image.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
      >
        <Grid>
          <Typography variant="h2" color={'white'}>
             Where skills are developed
          </Typography>
          
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} component={Paper} >
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
          <Box component="form" noValidate sx={{ mt: 1, padding:3, borderRadius: 2, boxShadow: 3 }}>
            <Grid container sx={{mb:2}}>
              <Grid item xs>
                <Link href="#" variant="h6">
                  Anmelden
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Passwort vergessen
                </Link>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Username"
              InputProps={{
                startAdornment: <InputAdornment position="start">@</InputAdornment>,
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
            />
            <Grid container sx={{mt:10}}>
              <Grid item xs>
                <Link href="#" variant="body2">
                Noch keinen account? <span style={{ color: '#22a7f1', textDecoration: 'underline', cursor: 'pointer' }}>Registrieren</span>
                </Link>
              </Grid>
              <Grid item>
                <Button variant="contained">Login</Button>
              </Grid>
            </Grid>
          </Box>
      </Box>
      </Grid>
    </Grid>
  );
};



