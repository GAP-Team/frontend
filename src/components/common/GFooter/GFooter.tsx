import { GapLogo } from "@/components/logo/GapLogo";
import { Box, Typography, Grid, Link } from "@mui/material";

function GFooter(): JSX.Element {
  return (
    <>
      <Box component="footer" sx={styles.footer}>
        <Grid container spacing={2} justifyContent="center">
          <div className="w-full mt-10">
            <div className="grid w-full justify-evenly sm:flex sm:justify-evenly md:flex md:grid-cols-1">
              <GapLogo />
              <div className="grid grid-cols-2 gap-8 sm:mt-5 sm:grid-cols-5 sm:gap-6">
                <div>
                  <Typography style={styles.footerMenuLabel} variant="h6">
                    Über GAP
                  </Typography>
                  <Link
                    href="/blogs"
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Blogs
                  </Link>{" "}
                  <br />
                  <Link
                    href="/about-us"
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Über uns
                  </Link>
                </div>
                <div>
                  <Typography style={styles.footerMenuLabel} variant="h6">
                    Unser Service
                  </Typography>
                  <Link
                    href="/our-service"
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    So funktioniert es
                  </Link>{" "}
                  <br />
                  <Link
                    href="/support"
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Support-Center
                  </Link>
                </div>
                <div>
                  <Typography style={styles.footerMenuLabel} variant="h6">
                    Als Dienstleister
                  </Typography>
                  <Link
                    href="/"
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Aufträge finden
                  </Link>
                  <br />
                  <Link
                    href="/still-employed-become-a-service-provider"
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Noch angestellt, Dienstleister werden
                  </Link>
                </div>
                <div>
                  <Typography style={styles.footerMenuLabel} variant="h6">
                    Als Immobilienbesitzer
                  </Typography>
                  <Link
                    href=" /real-estate "
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Kostenlose Angebote einholen
                  </Link>
                </div>
                <div>
                  <Typography style={styles.footerMenuLabel} variant="h6">
                    Rechtliches
                  </Typography>
                  <Link
                    href="/agb"
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    AGB
                  </Link>
                  <br />
                  <Link
                    href="/data-security"
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Datenschutz
                  </Link>
                  <br />
                  <Link
                    href="/impressum"
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Impressum
                  </Link>
                </div>
              </div>
            </div>
            <hr className="w-4/5 h-px mx-auto my-2 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-100" />
            <div className="w-full flex items-center justify-around">
              <Grid
                item
                xs={12}
                textAlign="center"
                mb={2}
                style={styles.copyrightHolder}
              >
                <Typography variant="body2">
                  © {new Date().getFullYear()} GAP™
                </Typography>
              </Grid>
            </div>
          </div>
        </Grid>
      </Box>
    </>
  );
}

export default GFooter;

const styles = {
  footer: {
    py: 2,
    bottom: 0,
    width: "100%",
    color: "white",
    bgcolor: "#37383F",
  },
  footerMenuLabel: {
    color: "#FFF",
    fontSize: "16px",
  },
  footerMenuText: {
    color: "#8D999C",
    fontSize: "15px",
    marginTop: "4px",
    marginBottom: "4px",
  },
  copyrightHolder: {
    color: "#8D999C",
  },
};
