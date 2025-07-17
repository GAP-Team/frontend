import { Grid, Paper, Typography } from "@mui/material";

interface StatisticsCardProps {
  stat: {
    label: string;
    value: string;
  };
  index: number;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  stat,
  index,
}): JSX.Element => {
  return (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Paper elevation={3} sx={styles.statsContatier}>
        <Typography variant="h5" color="primary" style={styles.statCount}>
          {stat.value}
        </Typography>
        <Typography variant="body1" style={styles.statLable}>
          {stat.label}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default StatisticsCard;

const styles = {
  statsContatier: {
    p: 3,
    borderRadius: 2,
    paddingTop: "4rem",
    minHeight: "12rem",
    textAlign: "center",
    alignItems: "center",
    paddingBottom: "3rem",
    backgroundColor: "##FCFDFD",
  },
  statCount: {
    fontWeight: 600,
    fontSize: "2rem",
    color: "#47b6b5",
  },
  statLable: {
    color: "#333",
    fontWeight: 600,
    fontSize: "1.1rem",
  },
};
