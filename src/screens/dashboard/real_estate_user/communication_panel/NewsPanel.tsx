import React from "react";
import NewsList from "./NewsList";
import HeaderSection from "../HeaderSection";
import { news, DashboardComponentsProps } from "@/utils/Constants";
import ScrollableSection from "../../../../components/common/ScrollableSection";

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
