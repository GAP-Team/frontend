import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <Box sx={{ 
      width: "100%", 
      marginTop: { xs: "1rem", md: "2rem" }, 
      display: "inline-block" 
    }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}>
          <TabList
            onChange={handleChange}
            aria-label="feature tabs"
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            sx={{
              "& .MuiTab-root": {
                width: { xs: "auto", sm: "80%" },
                color: "black",
                display: "flex",
                flexWrap: "wrap",
                fontWeight: "600",
                fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.25rem" },
                textTransform: "none",
                justifyContent: { xs: "flex-start", sm: "space-evenly" },
                minWidth: { xs: "100px", sm: "auto" },
                padding: { xs: "6px 10px", sm: "12px 16px" },
              },
              "& .Mui-selected": {
                color: "black",
                borderBottom: "5px solid #17ABA9",
              }
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                value={tab?.index}
                {...a11yProps(tab?.index)}
              />
            ))}
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
};

export default CustomTabPanel;
