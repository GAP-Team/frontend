import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import { MdOutlineLogout } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import GSearch from "@/components/search/GSearch";

export default function GAppBar() {

  const menuId = "primary-search-account-menu";
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const open = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose()
  }

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
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: menuStyles
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <MdOutlineLogout color="#A0ADB1" size={"1.25rem"} />
          </ListItemIcon>
          Logout
        </MenuItem>
        <Divider />
      </Menu>
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

const menuStyles = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};
