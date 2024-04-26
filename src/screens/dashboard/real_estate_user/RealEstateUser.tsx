import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import OverviewPanel from './overview_panel/OverviewPanel';
import AssignmentsPanel from './assignments_panel/AssignmentsPanel';

export default function RealEstateUser() {
  return (
    <Grid container spacing={2} sx={styles.mainContainer}>
      <Grid item xs={3}>
        <Paper sx={styles.coloredPaper} >
          <OverviewPanel />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={styles.topPaper} >
            <AssignmentsPanel/>
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper sx={styles.bottomLeftPaper} />
          </Grid>
          <Grid item xs={5}>
            <Paper sx={styles.bottomRightPaper} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

// Styles defined at the bottom of the component
const styles = {
  mainContainer: {
    height: 'calc(100% - 24px)',
    p: '1rem',
    boxSizing: 'border-box'
  },
  coloredPaper: {
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#2356FF',
    p: '1rem',
  },
  topPaper: {
    height: 'calc(50vh - 24px)',
    width: '100%',
    boxSizing: 'border-box',
    p:'1.25rem'
  },
  bottomLeftPaper: {
    height: 'calc(40vh - 12px)',
    width: '100%',
    boxSizing: 'border-box'
  },
  bottomRightPaper: {
    height: 'calc(40vh - 12px)',
    width: '100%',
    boxSizing: 'border-box'
  }
};