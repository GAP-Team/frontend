import TenderCardList from "./TenderCardList";
import HeaderSection from "../HeaderSection";
import { currentTenderNumbers } from "@/lib/features/tenderSlice";
import { useSelector } from "react-redux";

const TendersPanel = (): JSX.Element => {
  const tenderNumbers = useSelector(currentTenderNumbers);
  console.log("tender number: ", tenderNumbers);

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
