import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GSearch from "@/components/search/GSearch";

export default function GAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  return (
      <Toolbar sx={styles.toolbar}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={styles.title}
        >
          Vierkant Wohnungs AG
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>  
          <GSearch />
        </Box>

        <Box sx={styles.userSection}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon sx={styles.notificationIcon} />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle sx={styles.accountIcon} />
          </IconButton>
          <Box sx={styles.userControls} >
            <Typography>Max Müller</Typography>
            <ArrowDropDownIcon />
          </Box>
        </Box>
      </Toolbar>
  );
}

// Styles
const styles = {
  toolbar: {
    display: "flex",
    justifyContent: "space-between", // Ensures the elements are spaced out as desired
  },
  title: {
    flexGrow: 0,  // Prevents the title from growing
    display: { xs: "none", sm: "block" },
    fontSize: "1.5rem",
    fontWeight: "700",
    lineHeight: "2rem"
  },
  userSection: {
    display: "flex",
    alignItems: "center",
  },
  userControls: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginLeft: "1rem",
  },
  notificationIcon: {
    fontSize: "2rem",
  },
  accountIcon: {
    fontSize: "3rem",
  },
};
