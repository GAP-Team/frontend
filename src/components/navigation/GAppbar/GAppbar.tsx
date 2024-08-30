"use client";
import * as React from "react";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import { UseDispatch, useSelector } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import authAPIs from "@/api/auth";
import GSearch from "@/components/search/GSearch";
import { MdOutlineLogout } from "react-icons/md";
import { Business, CreditCard, Email, Lock } from "@mui/icons-material";

import {
  currentUser,
  currentUserName,
  currentUserCompany,
} from "@/lib/features/userSlice";

export default function GAppBar() {
  const router = useRouter();
  const user = useSelector(currentUser);
  const userName = useSelector(currentUserName);
  const userCompany = useSelector(currentUserCompany);

  const menuId = "primary-search-account-menu";

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeMenuItem, setActiveMenuItem] =
    React.useState<string>("Mein Profil"); // Default active menu item

  const open = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    let data = { userId: user?._id };
    const logoutStatus = await authAPIs.logout(data);
    if (logoutStatus?.data?.status?.acknowledged) {
      Cookies.remove("access_token");
      Cookies.remove("isVerified");
      localStorage.removeItem("access_token");
      handleClose();
      router.push("/login");
    }
  };

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
    handleClose();
  };

  return (
    <Toolbar sx={styles.toolbar}>
      <Typography variant="h6" noWrap component="div" sx={styles.title}>
        {user?.company?.name || ""}
      </Typography>

      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <GSearch />
      </Box>

      <Box sx={styles.userSection}>
        <IconButton
          size="large"
          aria-label="show 0 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon sx={styles.notificationIcon} />
          </Badge>
        </IconButton>
        <Box sx={styles.userControls} onClick={handleProfileMenuOpen}>
          <AccountCircle sx={styles.accountIcon} />
          <Typography sx={styles.userName}>
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
          <ArrowDropDownIcon sx={styles.dropDownIcon} />
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: { ...menuStyles, borderRadius: "6px", width: "260px" },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => handleMenuItemClick("Mein Profil")}
          sx={{
            ...menuItemStyles.menuItem,
            ...(activeMenuItem === "Mein Profil" &&
              menuItemStyles.activeMenuItem),
          }}
        >
          <ListItemIcon>
            <AccountCircle
              sx={{
                ...menuItemStyles.iconStyle,
                ...(activeMenuItem === "Mein Profil" &&
                  menuItemStyles.activeIconStyle),
              }}
            />
          </ListItemIcon>
          Mein Profil
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("Unternehmens Profil")}
          sx={{
            ...menuItemStyles.menuItem,
            ...(activeMenuItem === "Unternehmens Profil" &&
              menuItemStyles.activeMenuItem),
          }}
        >
          <ListItemIcon>
            <Business
              sx={{
                ...menuItemStyles.iconStyle,
                ...(activeMenuItem === "Unternehmens Profil" &&
                  menuItemStyles.activeIconStyle),
              }}
            />
          </ListItemIcon>
          Unternehmens Profil
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => handleMenuItemClick("E-Mail ändern")}
          sx={{
            ...menuItemStyles.menuItem,
            ...(activeMenuItem === "E-Mail ändern" &&
              menuItemStyles.activeMenuItem),
          }}
        >
          <ListItemIcon>
            <Email
              sx={{
                ...menuItemStyles.iconStyle,
                ...(activeMenuItem === "E-Mail ändern" &&
                  menuItemStyles.activeIconStyle),
              }}
            />
          </ListItemIcon>
          E-Mail ändern
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("Passwort ändern")}
          sx={{
            ...menuItemStyles.menuItem,
            ...(activeMenuItem === "Passwort ändern" &&
              menuItemStyles.activeMenuItem),
          }}
        >
          <ListItemIcon>
            <Lock
              sx={{
                ...menuItemStyles.iconStyle,
                ...(activeMenuItem === "Passwort ändern" &&
                  menuItemStyles.activeIconStyle),
              }}
            />
          </ListItemIcon>
          Passwort ändern
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={menuItemStyles.logoutMenu}>
          <ListItemIcon>
            <MdOutlineLogout color="#eb4444" size={"1.25rem"} />
          </ListItemIcon>
          Abmelden
        </MenuItem>
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
    flexGrow: 0, // Prevents the title from growing
    display: { xs: "none", sm: "block" },
    fontSize: "1.5rem",
    fontWeight: "700",
    lineHeight: "2rem",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
  },
  userControls: {
    display: "flex",
    alignItems: "center",
    marginLeft: "1rem",
    cursor: "pointer", // Ensures that the whole area is clickable
  },
  userName: {
    marginLeft: "0.5rem",
    fontSize: "1rem",
  },
  notificationIcon: {
    fontSize: "2rem",
  },
  accountIcon: {
    fontSize: "3rem",
  },
  dropDownIcon: {
    marginLeft: "0.5rem",
  },
};

const menuStyles = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  bgcolor: "background.paper",
  padding: "10px",
  py: "0",
};

const menuItemStyles = {
  menuItem: {
    padding: "10px 20px",
    color: "#6B7280",
    fontSize: "0.875rem",
    borderRadius: "0.5rem",
    "&:hover": {
      backgroundColor: "#E5F5FA",
      color: "#22A7F1",
      fontWeight: 600,
      "& .MuiSvgIcon-root": {
        color: "#22A7F1",
      },
    },
  },
  activeMenuItem: {
    color: "#22A7F1",
    backgroundColor: "#E5F5FA !important",
    fontWeight: 600,
  },
  iconStyle: {
    color: "#9CA3AF",
    fontSize: "1.5rem",
  },
  activeIconStyle: {
    color: "#22A7F1",
    fontSize: "1.5rem",
  },
  logoutMenu: {
    padding: "10px 20px",
    color: "#eb4444",
    fontSize: "0.875rem",
    borderRadius: "0.5rem",
    "&:hover": {
      backgroundColor: "#FFE1D7",
    },
  },
};
