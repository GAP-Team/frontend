import { useSelector } from "react-redux";
import TenderCardList from "./TenderCardList";
import { DashboardComponentsProps } from "@/utils/Constants";
import { currentTenderNumbers } from "@/lib/features/tenderSlice";
import HeaderSection from "@/components/layout/header/HeaderSection";

const TendersPanel: React.FC<DashboardComponentsProps> = (): JSX.Element => {
  const tenderNumbers = useSelector(currentTenderNumbers);

  return (
    <>
      <HeaderSection
        titletext="Aufträge"
        count={tenderNumbers}
        overviewText="zur Übersicht"
      />
      <TenderCardList />
    </>
  );
};

export default TendersPanel;
