import Divider from "@mui/material/Divider";
import { GapLogo } from "@/components/logo/GapLogo";
import { ROUTES, REAL_ESTATE_BASE } from "@/utils/routes";
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
                    href={ROUTES.BLOGS.BLOGS}
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Blogs
                  </Link>{" "}
                  <br />
                  <Link
                    href={ROUTES.ABOUT_US}
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Über uns
                  </Link>
                  <br />
                  <Link
                    href={ROUTES.CONTACT_US}
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Kontaktieren Sie uns
                  </Link>
                </div>
                <div>
                  <Typography style={styles.footerMenuLabel} variant="h6">
                    Unser Service
                  </Typography>
                  <Link
                    href={ROUTES.OUR_SERVICE}
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    So funktioniert es
                  </Link>{" "}
                  <br />
                  <Link
                    href={ROUTES.SUPPORT}
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
                    href={ROUTES.SERVICE_PROVIDER_HOME}
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Aufträge finden
                  </Link>
                  <br />
                  <Link
                    href={ROUTES.SERVICE_PROVIDER_JOURNEY}
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
                    href={REAL_ESTATE_BASE}
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
                    href={ROUTES.AGB}
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    AGB
                  </Link>
                  <br />
                  <Link
                    href={ROUTES.DATA_SECURITY}
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Datenschutz
                  </Link>
                  <br />
                  <Link
                    href={ROUTES.IMPRESSUM}
                    style={styles.footerMenuText}
                    underline="hover"
                  >
                    Impressum
                  </Link>
                </div>
              </div>
            </div>
            <Divider sx={styles.divider} />
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
  divider: {
    width: "auto",
    marginRight: "5rem",
    marginLeft: "5rem",
    textAlign: "center",
    marginTop: "6px",
    marginBottom: "15px",
    height: "1px",
    bgcolor: "#475a60",
  },
};
