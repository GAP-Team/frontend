// SidebarItemComponent.tsx
import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { SidebarItem } from "@/components/navigation/GSidebar/SideBar";

interface SidebarItemComponentProps {
  item: SidebarItem;
  open: boolean;
  selected: string | null;
  setSelected: (text: string) => void;
}

export const SidebarItemComponent: React.FC<SidebarItemComponentProps> = ({
  item,
  open,
  selected,
  setSelected,
}) => {
  return (
    <ListItemButton
      selected={selected === item.text}
      onClick={() => setSelected(item.text)}
      sx={styles.listItemButton}
    >
      <ListItemIcon sx={{ ...styles.listItemIcon, mr: open ? 3 : "auto" }}>
        <item.icon />
      </ListItemIcon>
      <ListItemText
        primary={item.text}
        sx={{ ...styles.listItemText, opacity: open ? 1 : 0 }}
      />
    </ListItemButton>
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
    fontWeight: "600",
    fontSize: "0.75rem",
  },
};