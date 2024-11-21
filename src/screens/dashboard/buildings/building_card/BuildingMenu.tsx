"use client";
import * as React from "react";
import userAPIs from "@/api/user";
import Menu from "@mui/material/Menu";
import buildingAPIs from "@/api/building";
import Dialog from "@mui/material/Dialog";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import GButton from "@/components/button/GButton";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import { currentUser, setAllBuildingDetails, currentUserBuildings } from "@/lib/features/userSlice";

interface BuildingMenuProps {
  buildingId: string;
  totalTenders?: number;
  totalFacilities: number;
}

const BuildingMenu: React.FC<BuildingMenuProps> = ({
  buildingId,
  totalTenders,
  totalFacilities,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const userBuildings = useSelector(currentUserBuildings);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  console.log("User Buildings: => ", userBuildings);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (): void => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (): void => {
    setOpenDialog(true);
    handleCloseMenu(); // Close the menu when dialog opens
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    const deleteStatus = await buildingAPIs.delete(buildingId);
    if (deleteStatus?.data?.statusCode === 204) {
      const allBuildings = await userAPIs.getBuildings(user?.id, "", "", "");
      const userBuildings = allBuildings.data;
      dispatch(setAllBuildingDetails(userBuildings));
      setOpenDialog(false);
    }
  };

  const handleEditClick = (): void => {
    router.push(`/real_estate/buildings/edit/${buildingId}`);
    handleCloseMenu();
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
        <MenuItem onClick={handleEditClick}>
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
            Beim Löschen dieses Gebäudes werden alle relevanten Objekte
            mitgelöscht:
            {totalFacilities > 0 && (
              <>
                <br /> {`- ${totalFacilities} Anlage(n)`}
              </>
            )}
            {totalTenders !== undefined && totalTenders > 0 && (
              <>
                <br />
                {`- ${totalTenders} Ausschreibunge(n)`}
              </>
            )}
            <br /> Sind Sie sicher, dass Sie dieses Gebäude löschen möchten?
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
