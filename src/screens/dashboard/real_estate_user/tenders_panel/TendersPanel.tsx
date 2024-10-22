import JobCardList from "./TenderCardList";
import HeaderSection from "../HeaderSection";

const TendersPanel = (): JSX.Element => {
  return (
    <>
      <HeaderSection
        titletext="Aufträge"
        count={20}
        overviewText="zur Übersicht"
      />
      <JobCardList />
    </>
  );
};

export default TendersPanel;
