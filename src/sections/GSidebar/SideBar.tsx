"use client";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { createTheme } from "@mui/material";
import { IconType } from "react-icons";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Image from "next/image";
import gapLogo from "../../../public/gap-logo.svg";
import gapLogoFull from "../../../public/icons/gapfull-logo.svg";
import { SidebarItemComponent } from "@/components/common/SidebarItemComponent";

export interface SidebarItem {
  icon: IconType;
  text: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

const drawerWidth = 240;
const drawerClosedWidth = 72;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "white",
  color: theme.palette.text.primary,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `${drawerClosedWidth}px`,
  backgroundColor: "white",
  color: "#FFFFFF",
  "& .MuiListItemIcon-root": {
    justifyContent: "center",
  },
});

const MyDrawer = styled(Drawer)(
  ({ theme, open }: { theme: Theme; open: boolean }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>("Dashboard");

  // React.useEffect(() => {
  //     // Automatically select 'Dashboard' if no other selection is made
  //     const dashboardItem = items.find((item) => item.text === 'Dashboard');
  //     if (dashboardItem && !selected) {
  //       setSelected(dashboardItem.text);
  //     }
  // }, [items, selected]);

  const theme = createTheme();

  return (
    <MyDrawer
      theme={theme}
      variant="permanent"
      open={open}
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <List>
        <ListItem key={"gaplogo"} sx={{ minWidth: "auto", mb: "1rem" }}>
          {open ? (
            <div
              style={{
                width: "100%",
                height: "3rem",
                position: "relative",
              }}
            >
              <Image
                src={gapLogoFull}
                fill
                style={{ objectFit: "contain" }}
                alt="GAP logo"
              />
            </div>
          ) : (
            <div
              style={{
                width: "2rem",
                height: "2rem",
                position: "relative",
              }}
            >
              <Image
                src={gapLogo}
                fill
                alt="GAP logo"
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </ListItem>
        {items.map((item, index) => (
          <SidebarItemComponent
            key={item.text}
            item={item}
            open={open}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </List>
    </MyDrawer>
  );
};

export default Sidebar;
