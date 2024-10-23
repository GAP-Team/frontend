import Box from "@mui/material/Box";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";
import { useState, useEffect } from "react";
import tenderAPIs from "@/api/tender";
import { Tender } from "./types";
import { useSelector } from "react-redux";
import { currentUser } from "@/lib/features/userSlice";
import TenderCard from "./TenderCard";

const TenderCardList: React.FC = () => {
  const [tenders, setTenders] = useState<Tender[]>([]);

  const user = useSelector(currentUser);

  useEffect(() => {
    getTenders();
  }, [user?._id]);

  const getTenders = async (): Promise<void> => {
    const buildings = await tenderAPIs.getTenders(user?._id);
    console.log(buildings);
    const allTenders = buildings.data.reduce((acc: any, building: any) => {
      return acc.concat(building.tenders);
    }, []);
    setTenders(allTenders);
  };

  return (
    <Box sx={styles.listContainer}>
      {tenders.map((tender, index) => (
        <TenderCard key={index} tender={tender} />
      ))}
    </Box>
  );
};

export default TenderCardList;
// Styles
const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1.25rem",
    paddingBottom: "0.65rem",
    paddingTop: "1rem",
    px: "0.2rem",
    overflowX: "auto",
    ...scrollBarStyles,
  },
};
