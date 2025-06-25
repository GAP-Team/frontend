import { featuresDammy } from "@/utils/Constants";
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const FunctionsSection = (): JSX.Element => {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 3 }}>
      <Grid sx={{ mb: "4rem" }}>
        <Typography variant="h4" fontWeight="bold" color="#44AFAE" gutterBottom>
          Funktionen von immocloud
        </Typography>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Funktionen, die Deine Verwaltung vereinfachen und Dein Leben
          erleichtern
          <br />
          werden. Entdecke jetzt alle Module von immocloud.
        </Typography>
      </Grid>

      <Grid container spacing={4}>
        {featuresDammy.map((feature) => (
          <Grid item xs={12} md={6} key={feature.title}>
            <Card sx={styles.cardHolder}>
              <Grid container sx={styles.innerHolder}>
                <Grid item xs={1} md={1} lg={1} sx={{ pt: "1.3rem" }}>
                  {feature.icon && <feature.icon />}
                </Grid>
                <Grid item xs={11} md={11} lg={11}>
                  <CardContent>
                    <Typography variant="h6" color="#44AFAE" sx={{ ml: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ ml: 1 }}
                    >
                      {feature.subtitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      {feature.description}
                    </Typography>
                    <Button variant="contained" sx={styles.button}>
                      Mehr erfahren
                    </Button>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FunctionsSection;

const styles = {
  cardHolder: {
    p: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  innerHolder: {
    p: 2,
    flexDirection: "row",
    display: "inline-flex",
    justifyContent: "space-between",
  },
  button: {
    ml: 1,
    mt: 2,
    color: "#fff",
    fontSize: "12px",
    alignSelf: "start",
    borderRadius: "2rem",
    backgroundColor: "#44AFAE",
    "&:hover": {
      color: "#44AFAE",
      cursor: "pointer",
      backgroundColor: "#fff",
    },
  },
};
