import React from "react";
import Box from "@mui/material/Box";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";
import { useState, useEffect } from "react";
import tenderAPIs from "@/api/tender";
import { Tender } from "./types";
import { useSelector } from "react-redux";
import { currentUser } from "@/lib/features/userSlice";
import { useDispatch } from "react-redux";
import TenderCard from "./TenderCard";

const TenderCardList: React.FC = () => {
  const dispatch = useDispatch();
  const [tenders, setTenders] = useState<Tender[]>([]);
  const user = useSelector(currentUser);

  useEffect(() => {
    getTenders();
  }, [user?._id]);

  const getTenders = async (): Promise<void> => {
    const tenders = await tenderAPIs.getTenders(user?._id);
    console.log(tenders);
    setTenders(tenders.data.tenders);
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
