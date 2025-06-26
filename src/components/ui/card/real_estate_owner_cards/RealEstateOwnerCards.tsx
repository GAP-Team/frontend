"use client";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

export default function RealEstateOwnerCards(): JSX.Element {
  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        py: { xs: 4, md: 5 },
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
            }}
          >
            Eine umfassende Plattform für alle Immobilienbesitzer
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              mb: 3,
              textAlign: "center",
            }}
          >
            Effizientes Anlagenmanagement für jede Anforderung – alles in einer
            Cloud!
          </Typography>
        </Grid>

        <Grid container item spacing={3} justifyContent="center">
          {/* Real Estate Card */}
          <Grid item xs={12} sm={10} md={6}>
            <RoleCard
              sx={[
                {
                  border: "5px solid",
                  borderColor: "black",
                  minHeight: { xs: "15rem", md: "18rem", lg: "20rem" },
                  padding: { xs: 2, sm: 3, md: 4 },
                },
              ]}
            >
              <AccountBalanceIcon
                sx={{ fontSize: { xs: 30, md: 40 }, color: "black" }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                  }}
                >
                  Für Immobilienbetreiber
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" } }}
                >
                  Smartes Finanzmanagement zur Rendite-Optimierung.
                </Typography>
              </CardContent>
            </RoleCard>
          </Grid>

          {/* Property owner Card */}
          <Grid item xs={12} sm={10} md={6}>
            <RoleCard
              sx={[
                {
                  border: "5px solid",
                  borderColor: "#00A7A7",
                  minHeight: { xs: "15rem", md: "18rem", lg: "20rem" },
                  padding: { xs: 2, sm: 3, md: 4 },
                },
              ]}
            >
              <HomeIcon
                sx={{ fontSize: { xs: 30, md: 40 }, color: "#00A7A7" }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                  }}
                >
                  Für Vermieter
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" } }}
                >
                  Einfache und sichere Verwaltung Ihrer Anlagen in Immobilien.
                </Typography>
              </CardContent>
            </RoleCard>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const RoleCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  borderRadius: 10,
  border: `2px solid transparent`,
  transition: "0.3s",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: theme.spacing(5),
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));
