import JobCardList from './JobCardList';
import HeaderSection from '../HeaderSection';
import ScrollableSection from '../ScrollableSection';

const AssignmentsPanel = () => {
  return (
    <ScrollableSection>
     <HeaderSection titletext='Aufträge' count={20} overviewText='zur Übersicht' />
     <JobCardList/>
    </ScrollableSection>
  );
}

export default AssignmentsPanel;
