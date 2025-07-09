import React from "react";
import HeaderSection from "../HeaderSection";
import ApplicationList from "./ApplicationList";
import { applications, DashboardComponentsProps } from "@/utils/Constants";
import ScrollableLayout from "../../../../components/layout/ScrollableLayout";

const ApplicationsPanel: React.FC<
  DashboardComponentsProps
> = (): JSX.Element => {
  return (
    <>
      <ScrollableLayout>
        <HeaderSection
          titletext="NEUE BEWERBUNGEN"
          count={7}
          overviewText="Alle anzeigen"
        />
        <ApplicationList applications={applications} />
      </ScrollableLayout>
    </>
  );
};

export default ApplicationsPanel;
