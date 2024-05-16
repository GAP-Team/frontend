import React, { useState, useEffect } from "react";
import { SidebarItem, SubItem } from "@/components/navigation/GSidebar/SideBar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

interface SubSidebarItemProps {
  item: SidebarItem;
  open: boolean;
  selected?: boolean;
  setSelected?: (item:SubItem) => void;
}

export const SubSidebarItem: React.FC<SubSidebarItemProps> = ({
  item,
  open,
  selected,
  setSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsOpen(false); // Automatically close the accordion if open prop is false
    }
  }, [open]);

  const handleToggle = () => {
    
    if (open) {
      setIsOpen(!isOpen);
    }
  };

  return (
      <>
      <ListItemButton selected={selected}  onClick={handleToggle} sx={{ ...styles.listItemButton, ...(isOpen && styles.noMarginBottom) }}>
        <ListItemIcon sx={{ ...styles.listItemIcon, mr: open ? 3 : "auto" }}>
          <item.icon />
        </ListItemIcon>
        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }}/>
        { isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.subItems && item.subItems.map((subItem) => (
            <ListItemButton  sx={styles.subItemButton} onClick={()=>setSelected?.(subItem)} >
              <ListItemText primary={subItem.text} sx={{...styles.listItemText}} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

    </>
  );
};

//styles
const styles = {
    listItemButton: {
      "&.Mui-selected": {
        backgroundColor: "#E5F5FA",
        color: "#22A7F1",
        "& .MuiListItemIcon-root": {
          color: "#22A7F1",
        },
        "&:hover": {
          backgroundColor: "#E5F5FA",
        },
      },
      "&:hover": {
        backgroundColor: "#E5F5FA",
        color: "#22A7F1",
        "& .MuiListItemIcon-root": {
          color: "#22A7F1",
        },
      },
      marginBottom: "1.5rem", // Distance between items
      ".MuiListItemIcon-root": { fontSize: "1.5rem" }, // Icon size
    },
    listItemIcon: {
      minWidth: "auto",
    },
    listItemText: {
      fontWeight: "500",
      fontSize: "0.95rem",
      lineHeight:'1rem',
    },
    noMarginBottom: {
        marginBottom: 0, // Removes the margin when the item is open
    },
  subItemButton: {
    "&.Mui-selected": {
      backgroundColor: "#E5F5FA",
      color: "#22A7F1",
      "& .MuiListItemIcon-root": {
        color: "#22A7F1",
      },
      "&:hover": {
        backgroundColor: "#E5F5FA",
      },
    },
    "&:hover": {
      backgroundColor: "#E5F5FA",
      color: "#22A7F1",
      "& .MuiListItemIcon-root": {
        color: "#22A7F1",
      },
    },
      pl: 8, // Padding left for sub-items
    },
  };
