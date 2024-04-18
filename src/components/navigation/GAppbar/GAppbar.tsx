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
    <Container>
      <Toolbar sx={{ display: "flex" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Vierkant Wohungs AG
        </Typography>

        <GSearch />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon sx={{ fontSize: "2rem" }} />
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
            <AccountCircle sx={{ fontSize: "3rem" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            {" "}
            <Typography>Max Müller</Typography>
            <ArrowDropDownIcon />
          </Box>
        </Box>
      </Toolbar>
    </Container>
  );
}
