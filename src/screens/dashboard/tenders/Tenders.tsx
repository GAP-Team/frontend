"use client";
import React, 
{ 
  useState, 
  useEffect
} from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { jobCardsData } from "@/utils/Constants";
import TenderList from "./tender_card/TenderList";
import { TenderProps } from "./tender_card/types";
import addTenderSrc from "@/../public/icons/add_tender.svg";
import NoContentPage from "@/components/common/NoContentPage";
import { currentUserBuildings } from "@/lib/features/userSlice";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";

const Tenders: React.FC = () => {

  const userBuildings = useSelector(currentUserBuildings);
  const [tenders, setTenders] = useState<TenderProps[]>([]);

  useEffect(() => {
    getAllTendersBasedOnBuildings();
    setTenders(jobCardsData);
  }, []);
  
  const getAllTendersBasedOnBuildings = () => {
    console.log("User Buildings: => ", userBuildings);
  }

  const tenderContent =
    tenders.length > 0 ? (
      <TenderList tenders={tenders} />
    ) : (
      <NoContentPage
        alt="No Tenders"
        image={addTenderSrc}
        title="Erstelle eine neue Ausschreibung."
        buttonLabel="Ausschreibung erstellen"
        buttonLink="/dashboard/tenders/add_tender"
      />
    );
  return (
    <Box sx={styles.mainContainer}>
      <PropertyFilterPanel
        handleOnChange={() => {}}
        title="Alle Ausschreibungen"
      />
      {tenderContent}
    </Box>
  );
};

export default Tenders;

// Styles
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
};
