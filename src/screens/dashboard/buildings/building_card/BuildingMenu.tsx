"use client";
import * as React from "react";
import Menu from "@mui/material/Menu";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IoEllipsisHorizontal } from "react-icons/io5";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";

import GButton from "@/components/button/GButton";

interface BuildingMenuProps {
  buildingId: string;
}

const BuildingMenu: React.FC<BuildingMenuProps> = ({ buildingId }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    router.push(`/real_estate/buildings/edit/${buildingId}`);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setOpenDialog(true);
    handleCloseMenu(); // Close the menu when dialog opens
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    // Add delete logic here
    setOpenDialog(false);
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
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: menuStyles,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <FaRegEdit color="#A0ADB1" size={"1.25rem"} />
          </ListItemIcon>
          Bearbeiten
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteClick} sx={{ color: "red" }}>
          <ListItemIcon>
            <RiDeleteBin6Line color="red" size={"1.25rem"} />
          </ListItemIcon>
          Löschen
        </MenuItem>
      </Menu>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Bestätigung</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sind Sie sicher, dass Sie dieses Element löschen möchten?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <GButton onClick={handleCloseDialog} color="primary">
            Abbrechen
          </GButton>
          <GButton onClick={handleConfirmDelete} color="error" autoFocus>
            Löschen
          </GButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BuildingMenu;

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
