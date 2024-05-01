import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";

export default function TenderMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    };
    
  return (
    <>
      <Tooltip title="Objekt edit menu">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <IoEllipsisHorizontal size="1.5rem" />
        </IconButton>
      </Tooltip>
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FaRegEdit color="#A0ADB1" size={"1.25rem"} />
          </ListItemIcon>
          Edit card
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} sx={{color:'red'}} >
          <ListItemIcon>
            <RiDeleteBin6Line color="red" size={"1.25rem"} />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

// Styles placed at the bottom
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