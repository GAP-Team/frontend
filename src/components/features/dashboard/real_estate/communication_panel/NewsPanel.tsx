import React from "react";
import NewsList from "../../components/features/communication_panel/NewsList";
import HeaderSection from "../../../../layout/HeaderSection";
import { news, DashboardComponentsProps } from "@/utils/Constants";
import ScrollableSection from "../../../../layout/ScrollableSection";

const NewsPanel: React.FC<DashboardComponentsProps> = (): JSX.Element => {
  return (
    <ScrollableSection>
      <HeaderSection
        titletext="NEUE NACHRICHTEN"
        count={3}
        overviewText="Alle anzeigen"
      />
      <NewsList news={news} />
    </ScrollableSection>
  );
};

export default NewsPanel;
