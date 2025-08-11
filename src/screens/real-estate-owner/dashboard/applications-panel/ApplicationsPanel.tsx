import React from "react";
import HeaderSection from "../HeaderSection";
import ApplicationList from "./ApplicationList";
import { applications, DashboardComponentsProps } from "@/utils/Constants";
import { Stack } from "@mui/material";

const ApplicationsPanel: React.FC<
  DashboardComponentsProps
> = (): JSX.Element => {
  return (
    <>
      <Stack
        height="100%"
      >
        <HeaderSection
          titletext="NEUE BEWERBUNGEN"
          count={7}
          overviewText="Alle anzeigen"
        />
        <ApplicationList applications={applications} />
      </Stack>
    </>
  );
};

export default ApplicationsPanel;
