import JobCardList from "./JobCardList";
import HeaderSection from "../HeaderSection";

const AssignmentsPanel = (): JSX.Element => {
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

export default AssignmentsPanel;
