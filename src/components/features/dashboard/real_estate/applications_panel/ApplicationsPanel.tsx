import React from "react";
import HeaderSection from "../HeaderSection";
import ApplicationList from "./ApplicationList";
import { applications, DashboardComponentsProps } from "@/utils/Constants";
import ScrollableSection from "../../../../components/common/ScrollableSection";

const ApplicationsPanel: React.FC<
  DashboardComponentsProps
> = (): JSX.Element => {
  return (
    <>
      <ScrollableSection>
        <HeaderSection
          titletext="NEUE BEWERBUNGEN"
          count={7}
          overviewText="Alle anzeigen"
        />
        <ApplicationList applications={applications} />
      </ScrollableSection>
    </>
  );
};

export default ApplicationsPanel;