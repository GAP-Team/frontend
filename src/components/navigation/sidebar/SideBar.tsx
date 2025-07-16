"use client";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { createTheme } from "@mui/material";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Image from "next/image";
import gapLogo from "../../../../public/icons/gap-logo.svg";
import gapLogoFull from "../../../../public/icons/gapfull-logo.svg";
import { SubSidebarItem } from "./SubSidebarItem";
import { ROUTES } from "@/utils/routes";
import SidebarItem from "./SidebarItem";
import { SubItem, SidebarItemTypes } from "./types";

interface SidebarProps {
  items: SidebarItemTypes[];
  setSelected: (item: SidebarItemTypes | SubItem) => void;
  selected: SidebarItemTypes | SubItem;
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

// FIXME: refactor need here, it should belong to its own component file
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
      cursor: "pointer",
    }}
    onClick={handleClickRediret}
  >
    <Image src={src} fill alt="GAP logo" style={{ objectFit: "contain" }} />
  </div>
);

const handleClickRediret = (): void => {
  window.location.href = ROUTES.SERVICE_PROVIDER_HOME;
};

const SideBar: React.FC<SidebarProps> = ({ items, setSelected, selected }) => {
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
              <SidebarItem
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

export default SideBar;
