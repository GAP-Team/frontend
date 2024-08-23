'use client';
import * as React from "react";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import { MdOutlineLogout } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import { UseDispatch, useSelector } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import authAPIs from "@/api/auth";
import GSearch from "@/components/search/GSearch";
import { 
  currentUser,
  currentUserName,
  currentUserCompany
} from "@/lib/features/userSlice";

export default function GAppBar() {

  const router = useRouter();
  const user = useSelector(currentUser);
  const userName = useSelector(currentUserName);
  const userCompany = useSelector(currentUserCompany);

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

  const handleLogout = async () => {
    let data = { userId: user?._id}
    const logoutStatus = await authAPIs.logout(data);
    if (logoutStatus?.data?.status?.acknowledged) {
      Cookies.remove('access_token');
      localStorage.removeItem("access_token");
      handleClose();
      router.push("/login");
    }
  }

  return (
    <Toolbar sx={styles.toolbar}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={styles.title}
      >
        {user?.company?.name}
      </Typography>

      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>  
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
        <IconButton
          edge="end"
          size="large"
          color="inherit"
          aria-haspopup="true"
          aria-controls={menuId}
          aria-label="account of current user"
        >
          <AccountCircle sx={styles.accountIcon} />
        </IconButton>
        <Box sx={styles.userControls} >
          <Typography>{`${user?.firstName} ${user?.lastName}`}</Typography>
          <IconButton
          edge="end"
          size="large"
          color="inherit"
          aria-haspopup="true"
          aria-controls={menuId}
          onClick={handleProfileMenuOpen}
          aria-label="account of current user"
        >
          <ArrowDropDownIcon />
        </IconButton>
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
        <MenuItem onClick={()=>{}} style={menuItemStyles.mainProfileMenu} >
          <ListItemIcon>
            <AccountCircle sx={menuItemStyles.mainProfileMenu} />
          </ListItemIcon>
          Mein Profil
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} style={menuItemStyles.logoutMenu} >
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

const menuItemStyles = {
  logoutMenu:{
    color: "#eb4444"
  },
  mainProfileMenu: {
    size: "1.25rem",
    color: "#A0ADB1"
  }
}
