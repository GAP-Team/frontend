import Box from "@mui/material/Box";
import TenderCard from "./TenderCard";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";
import { Urgency } from "@/utils/enums";
import { BuildingTenders } from "../../tenders/tender_card/types";
import { fetchTenders } from "@/lib/features/tenderSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const TenderCardList: React.FC = () => {
   const dispatch = useAppDispatch();
   const user = useAppSelector((state) => state.user);
  const tenders = useAppSelector((state) => state.tender.tenders);
  
   useEffect(() => {
     if (user?.id) {
       dispatch(fetchTenders(user.id));
     }
   }, [user?.id, dispatch]);


  const renderSortedTenders = (
    tendersInBuilding: BuildingTenders[]
  ): React.ReactNode => {
    if (
      !tendersInBuilding?.some(
        (building: BuildingTenders) => building.tenders?.length > 0
      )
    ) {
      return (
        <Box sx={styles.noDataContainer}>
          <Typography variant="subtitle2" style={{ fontSize: "1.50rem" }}>
            Keine Aufträge vorhanden
          </Typography>
        </Box>
      );
    }

    // Extract tenders and include building details
    const allTendersWithBuilding = tendersInBuilding.flatMap((building) =>
      (building.tenders || []).map((tender) => ({
        ...tender,
        buildingName: building.buildingName,
        buildingAddress: building.buildingAddress,
      }))
    );

    // Sort tenders by urgency and createdAt
    const sortedTenders = allTendersWithBuilding.sort(
      (firstTender, secondTender) => {
        // Sort by urgency: "URGENT" comes first
        if (
          firstTender.urgency === Urgency.URGENT &&
          secondTender.urgency !== Urgency.URGENT
        )
          return -1;
        if (
          firstTender.urgency !== Urgency.URGENT &&
          secondTender.urgency === Urgency.URGENT
        )
          return 1;

        // Sort by createdAt: most recent first
        return (
          new Date(secondTender.createdAt).getTime() -
          new Date(firstTender.createdAt).getTime()
        );
      }
    );

    // Render the sorted tenders
    return sortedTenders.map((tender, index) => (
      <TenderCard
        key={tender.id || index}
        tender={tender}
        buildingName={tender.buildingName}
        buildingAddress={tender.buildingAddress}
      />
    ));
  };

  return (
    <Box sx={styles.listContainer}>
      {renderSortedTenders(tenders)}
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
  noDataContainer: {
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    height: "20rem",
    width: "100%",
  },
};
