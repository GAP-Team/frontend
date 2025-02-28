import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";

import { TabsTypes } from "@/utils/Constants";

interface CustomTabPanelProps {
  tabs: TabsTypes[];
  handleTabSelection: (tabIndex: string) => void;
}

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({
  tabs,
  handleTabSelection,
}): JSX.Element => {
  const [tab, setTab] = useState<string>("0");

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setTab(newValue.toString());
    handleTabSelection(newValue.toString());
  };

  function a11yProps(index: string): { id: string; "aria-controls": string } {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={styles.mainDiv}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              "& .MuiTab-root": styles.tab,
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                value={tab?.index}
                {...a11yProps(tab?.index)}
                sx={{
                  "&.Mui-selected": styles.selectedTab,
                }}
              />
            ))}
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
};

export default CustomTabPanel;

const styles = {
  mainDiv: {
    width: "100%",
    marginTop: "2rem",
    display: "inline-block",
  },
  tab: {
    width: "80%",
    color: "black",
    display: "flex",
    flexWrap: "wrap",
    fontWeight: "600",
    fontSize: "1.25rem",
    textTransform: "none",
    justifyContent: "space-evenly",
  },
  selectedTab: {
    color: "black",
    borderBottom: "5px solid #17ABA9",
  },
};
