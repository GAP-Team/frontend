import React from "react";
import NewsList from "./NewsList";
import HeaderSection from "../HeaderSection";
import { news, DashboardComponentsProps } from "@/utils/Constants";
import ScrollableLayout from "../../../../components/layout/ScrollableLayout";

const NewsPanel: React.FC<DashboardComponentsProps> = (): JSX.Element => {
  return (
    <ScrollableLayout>
      <HeaderSection
        titletext="NEUE NACHRICHTEN"
        count={3}
        overviewText="Alle anzeigen"
      />
      <NewsList news={news} />
    </ScrollableLayout>
  );
};

export default NewsPanel;
