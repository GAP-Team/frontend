"use client";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { createTheme } from "@mui/material";
import { IconType } from "react-icons";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Image from "next/image";
import gapLogo from "../../../../public/icons/gap-logo.svg";
import gapLogoFull from "../../../../public/icons/gapfull-logo.svg";
import SidebarItemComponent from "./SidebarItemComponent";
import { SubSidebarItem } from "./SubSidebarItem";

export interface SubItem {
  id: number;
  text: string;
  url: string;
  component?: React.ReactElement;
}
export interface SidebarItem {
  id: number;
  icon: IconType;
  text: string;
  url?: string;
  component?: React.ReactElement;
  subItems?: SubItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  setSelected: (item: SidebarItem | SubItem) => void;
  selected: SidebarItem | SubItem;
}

const drawerWidth = 300;
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

const DrawerLogo = ({
  src,
  open,
}: {
  src: string;
  open: boolean;
}): JSX.Element => (
  <div
    style={{
      width: open ? "100%" : "2rem",
      height: open ? "3rem" : "2rem",
      position: "relative",
    }}
  >
    <Image src={src} fill alt="GAP logo" style={{ objectFit: "contain" }} />
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ items, setSelected, selected }) => {
  const [open, setOpen] = React.useState(false);
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
            <DrawerLogo src={gapLogoFull} open={open} />
          ) : (
            <DrawerLogo src={gapLogo} open={open} />
          )}
        </ListItem>
        {items?.map((item) => (
          <React.Fragment key={item?.id}>
            {item.subItems ? (
              <SubSidebarItem
                key={item?.id}
                item={item}
                open={open}
                selected={
                  selected?.id === item?.id ||
                  item.subItems.some((subItem) => subItem?.id === selected?.id)
                }
                setSelected={setSelected}
              />
            ) : (
              <SidebarItemComponent
                key={item?.id}
                item={item}
                open={open}
                selected={selected?.id === item?.id}
                setSelected={setSelected}
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </MyDrawer>
  );
};

export default Sidebar;
