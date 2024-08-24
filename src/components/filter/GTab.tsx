import React, { ReactNode } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number | undefined;
}

interface GTabProps {
  tabs: { label: string; content: ReactNode }[];
  tabProps?: object; // Additional props for Tabs component
  panelProps?: object; // Additional props for each TabPanel
  tabvalue?: number;
  handleChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const GTab: React.FC<GTabProps> = ({
  tabs,
  tabProps,
  panelProps,
  tabvalue,
  handleChange,
}) => {
  return (
    <>
      <Box sx={styles.tabsContainer}>
        <Tabs
          value={tabvalue}
          onChange={handleChange}
          variant="fullWidth"
          textColor="primary"
          aria-label="two tabs"
          TabIndicatorProps={{ style: { background: "transparent" } }}
          sx={styles.tab}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, index) => (
        <TabPanel key={index} value={tabvalue} index={index} {...panelProps}>
          {tab.content}
        </TabPanel>
      ))}
    </>
  );
};

export default GTab;

// Styles
const styles = {
  tabsContainer: {
    bgcolor: "#F1F3F4",
    width: "auto",
    borderRadius: "0.5rem",
    padding: "0.30rem",
    marginLeft: "1.5rem",
  },
  tab: {
    ".Mui-selected": {
      color: "#1E3137 !important",
      backgroundColor: "#FFFFFF",
      borderRadius: "0.4rem",
      fontWeight: "600",
      fontSize: "0.875rem",
    },
  },
};
