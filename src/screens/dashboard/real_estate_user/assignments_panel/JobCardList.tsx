import React from "react";
import JobCard from "./JobCard";
import { jobCardsData } from "@/utils/Constants";
import Box from "@mui/material/Box";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";
import { useState, useEffect } from "react";
import tenderAPIs from "@/api/tender";
import { Tender } from "./types";
import { useSelector } from "react-redux";
import { currentUser } from "@/lib/features/userSlice";
import { useDispatch } from "react-redux";


const JobCardList: React.FC = () => {
  const dispatch = useDispatch();
  const [tenders, setTenders] = useState<Tender[]>([]);
  const user = useSelector(currentUser);

  useEffect(() => {
    getTenders();
  }, [user?._id]);

  const getTenders = async (): Promise<void> => {
    const tenders = await tenderAPIs.getTenders(user?._id);
    console.log(tenders);
    setTenders(tenders.data);
  };


  return (
    <Box sx={styles.listContainer}>
      {jobCardsData.map((data, index) => (
        <JobCard key={index} {...data} />
      ))}
    </Box>
  );
};

export default JobCardList;
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
