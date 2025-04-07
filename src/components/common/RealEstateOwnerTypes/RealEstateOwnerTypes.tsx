"use client";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function RealEstateOwnerTypes(): JSX.Element {
  return (
    <Grid sx={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.heading}>
        Eine umfassende Plattform für alle Immobilienbesitzer
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={styles.subheading}>
        Effizientes Anlagenmanagement für jede Anforderung – alles in einer
        Cloud!
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        style={{ marginTop: 30 }}
      >
        {/* Vermieter Card */}
        <Grid item xs={12} sm={6} md={6}>
          <RoleCard
            sx={[styles.card, { border: "5px solid", borderColor: "#00A7A7" }]}
          >
            <HomeIcon sx={{ fontSize: 40, color: "#00A7A7" }} />
            <CardContent>
              <Typography variant="h6" style={styles.cardHeading}>
                Für Vermieter
              </Typography>
              <Typography variant="body2" style={styles.cardDescription}>
                Einfachere und sichere Verwaltung Deiner Immobilien.
              </Typography>
            </CardContent>
          </RoleCard>
        </Grid>

        {/* Investoren Card */}
        <Grid item xs={12} sm={6} md={6}>
          <RoleCard
            sx={[styles.card, { border: "5px solid", borderColor: "black" }]}
          >
            <AccountBalanceIcon sx={{ fontSize: 40, color: "black" }} />
            <CardContent>
              <Typography variant="h6" style={styles.cardHeading}>
                Für Immobelienbetriber
              </Typography>
              <Typography variant="body2" style={styles.cardDescription}>
                Smartes Finanzmanagement zur Rendite-Optimierung.
              </Typography>
            </CardContent>
          </RoleCard>
        </Grid>
      </Grid>
    </Grid>
  );
}

const RoleCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  borderRadius: 10,
  border: `2px solid transparent`,
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subheading: {
    fontSize: "1.2rem",
    marginBottom: "30px",
  },
  card: {
    minHeight: "20rem",
    textAlign: "center",
    paddingTop: "5rem",
    cursor: "pointer",
  },
  cardHeading: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "1.1rem",
  },
};
