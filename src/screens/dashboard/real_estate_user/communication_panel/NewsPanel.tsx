import React from "react";
import HeaderSection from "../HeaderSection";
import NewsList from "./NewsList";
import { news } from "@/utils/Constants";
import ScrollableSection from "../../../../components/common/ScrollableSection";

const NewsPanel = (): JSX.Element => {
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
