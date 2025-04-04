"use client";

import { Card, CardContent, CardActions, Button, Typography, Grid } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GroupsIcon from "@mui/icons-material/Groups";
import { styled } from "@mui/material/styles";

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

const SelectedButton = styled(Button)({
  marginTop: 10,
  padding: "10px 20px",
  borderRadius: 20,
  fontWeight: "bold",
});

export default function RealEstateOwnerTypes() {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <Typography variant="h4" gutterBottom>
        Eine umfassende Plattform für alle Immobilienbesitzer
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Effizientes Immobilienmanagement für jede Anforderung – alles in einer Cloud!
      </Typography>

      <Grid container spacing={3} justifyContent="center" style={{ marginTop: 30 }}>
        {/* Vermieter Card */}
        <Grid item xs={12} sm={6} md={4}>
          <RoleCard sx={{ borderColor: "#00A7A7" }}>
            <HomeIcon sx={{ fontSize: 40, color: "#00A7A7" }} />
            <CardContent>
              <Typography variant="h6">Für Vermieter</Typography>
              <Typography variant="body2">
                Einfachere und sichere Verwaltung Deiner Immobilien.
              </Typography>
            </CardContent>
            <CardActions>
              <SelectedButton variant="contained" style={{ backgroundColor: "#00A7A7" }}>
                Ich bin Vermieter
              </SelectedButton>
            </CardActions>
          </RoleCard>
        </Grid>

        {/* Investoren Card */}
        <Grid item xs={12} sm={6} md={4}>
          <RoleCard>
            <AccountBalanceIcon sx={{ fontSize: 40, color: "black" }} />
            <CardContent>
              <Typography variant="h6">Für Investoren</Typography>
              <Typography variant="body2">
                Smartes Finanzmanagement zur Rendite-Optimierung.
              </Typography>
            </CardContent>
            <CardActions>
              <SelectedButton variant="contained" style={{ backgroundColor: "black" }}>
                Ich bin Investor
              </SelectedButton>
            </CardActions>
          </RoleCard>
        </Grid>

        {/* Hausverwalter Card (with red cross effect) */}
        <Grid item xs={12} sm={6} md={4}>
          <RoleCard sx={{ borderColor: "#75327E", position: "relative" }}>
            <GroupsIcon sx={{ fontSize: 40, color: "#75327E" }} />
            <CardContent>
              <Typography variant="h6">Für Hausverwalter</Typography>
              <Typography variant="body2">
                Professionelle Software für die gewerbliche Verwaltung.
              </Typography>
            </CardContent>
            <CardActions>
              <SelectedButton variant="contained" style={{ backgroundColor: "#75327E" }}>
                Ich bin Hausverwalter
              </SelectedButton>
            </CardActions>
            {/* Red Cross Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                style={{ position: "absolute", pointerEvents: "none" }}
              >
                <line x1="10" y1="10" x2="90" y2="90" stroke="red" strokeWidth="4" />
                <line x1="90" y1="10" x2="10" y2="90" stroke="red" strokeWidth="4" />
              </svg>
            </div>
          </RoleCard>
        </Grid>
      </Grid>
    </div>
  );
}
